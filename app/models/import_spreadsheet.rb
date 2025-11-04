require "roo"

class ImportSpreadsheet
  Result = Struct.new(:total, :imported, :failed, :errors, keyword_init: true)

  def self.call(file_path:, has_headers:, created_by_id:, channel_token:)
    new(file_path:, has_headers:, created_by_id:, channel_token:).call
  end

  def initialize(file_path:, has_headers:, created_by_id:, channel_token:)
    @file_path = file_path
    @has_headers = has_headers
    @created_by_id = created_by_id
    @channel_token = channel_token
    @errors = []
    @imported = 0
    @failed = 0
    @total = 0
  end

  def call
    book = Roo::Spreadsheet.open(@file_path)
    sheet = book.sheet(0)

    last = sheet.last_row.to_i
    start_row = @has_headers ? 2 : 1
    @total = [last - (start_row - 1), 0].max

    broadcast(type: "start", total: @total)

    header_map = build_header_map(sheet) if @has_headers

    (start_row..last).each_with_index do |row_idx, i|
      row = sheet.row(row_idx)
      attrs = extract_attrs(row, header_map)
      ok, message = upsert_user(attrs)

      if ok
        @imported += 1
      else
        @failed += 1
        @errors << message
      end

      broadcast(type: "progress", current: i + 1, total: @total, ok:, message:)
    end

    broadcast(type: "finished", imported: @imported, failed: @failed, total: @total, errors: @errors.take(20))
    Result.new(total: @total, imported: @imported, failed: @failed, errors: @errors)
  ensure
    File.delete(@file_path) if @file_path && File.exist?(@file_path)
  end

  private

  def build_header_map(sheet)
    headers = sheet.row(1).map { |h| h.to_s.strip.downcase }
    {
      full_name: headers.index { |h| %w[full_name nome name].include?(h) },
      email:     headers.index { |h| %w[email e-mail].include?(h) },
      role:      headers.index { |h| %w[role perfil].include?(h) },
    }
  end

  def extract_attrs(row, map = nil)
    if @has_headers && map
      {
        full_name: safe_cell(row, map[:full_name]),
        email: safe_cell(row, map[:email]).to_s.downcase.strip,
        role: safe_cell(row, map[:role]).to_s
      }
    else
      { full_name: row[0], email: row[1].to_s.downcase.strip, role: row[2].to_s }
    end
  end

  def safe_cell(row, idx)
    idx.nil? ? nil : row[idx]
  end

  def upsert_user(attrs)
    full_name = attrs[:full_name].to_s.strip
    email = attrs[:email].to_s.strip.downcase
    role = normalize_role(attrs[:role])

    return [false, "Nome e email são obrigatórios"] if full_name.blank? || email.blank?
    return [false, "Email inválido: #{email}"] unless email.match?(Devise.email_regexp)

    user = User.find_or_initialize_by(email:)
    user.full_name = full_name
    user.role = role
    user.password ||= SecureRandom.base58(12)
    user.password_confirmation ||= user.password

    if user.save
      [true, "OK: #{email} (#{role})"]
    else
      [false, "Erro #{email}: #{user.errors.full_messages.to_sentence}"]
    end
  rescue => e
    [false, "Exceção #{email.presence || 'sem email'}: #{e.message}"]
  end

  def normalize_role(raw)
    v = raw.to_s.downcase.strip
    return "admin" if %w[admin administrador adm].include?(v)
    "user"
  end

  def broadcast(payload)
    ActionCable.server.broadcast("imports:#{@channel_token}", payload)
  end
end