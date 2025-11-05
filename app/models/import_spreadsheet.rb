class ImportSpreadsheet
  Result = Struct.new(:total, :imported, :failed, :errors, keyword_init: true)

  def self.call(file_path:, created_by_id:, channel_token:)
    new(file_path:, created_by_id:, channel_token:).call
  end

  def initialize(file_path:, created_by_id:, channel_token:)
    @file_path = file_path
    @created_by_id = created_by_id
    @channel_token = channel_token
    @errors = []
    @imported = 0
    @failed = 0
    @total = 0
  end

  def call
    reader = Imports::RowReader.new(file_path: @file_path)
    upserter = Users::UpsertUser.new
    broadcaster = Imports::Broadcaster.new(@channel_token)

    @total = reader.total_rows
    broadcaster.start(total: @total)

    i = 0
    reader.each do |user_row|
      i += 1
      result = upserter.call(full_name: user_row.full_name, email: user_row.email, role: user_row.role)
      if result.ok
        @imported += 1
      else
        @failed += 1
        @errors << result.message
      end
      broadcaster.progress(current: i, total: @total, ok: result.ok, message: result.message)
    end

    broadcaster.finished(imported: @imported, failed: @failed, total: @total, errors: @errors)
    Result.new(total: @total, imported: @imported, failed: @failed, errors: @errors)
  ensure
    File.delete(@file_path) if @file_path && File.exist?(@file_path)
  end

end