require "roo"

class Imports::RowReader
  UserRow = Struct.new(:full_name, :email, :role, keyword_init: true)
  
  def initialize(file_path:)
    @file_path = file_path
  end

  def total_rows
    sheet = first_sheet
    last = sheet.last_row.to_i
    [last - 1, 0].max
  end

  def each
    return enum_for(:each) unless block_given?
    sheet = first_sheet
    last = sheet.last_row.to_i
    header_map = build_header_map(sheet)

    (2..last).each do |row_idx|
      row = sheet.row(row_idx)
      attrs = extract_attrs(row, header_map)
      yield UserRow.new(attrs)
    end
  end

  private

  def first_sheet
    @book ||= Roo::Spreadsheet.open(@file_path)
    @book.sheet(0)
  end

  def build_header_map(sheet)
    headers = sheet.row(1).map { |h| h.to_s.strip.downcase }
    {
      full_name: headers.index { |h| %w[full_name].include?(h) },
      email:     headers.index { |h| %w[email].include?(h) },
      role:      headers.index { |h| %w[role].include?(h) },
    }
  end

  def extract_attrs(row, map)
    {
      full_name: safe_cell(row, map[:full_name]),
      email: safe_cell(row, map[:email]).to_s.downcase.strip,
      role: safe_cell(row, map[:role]).to_s
    }
  end

  def safe_cell(row, idx)
    idx.nil? ? nil : row[idx]
  end
end
