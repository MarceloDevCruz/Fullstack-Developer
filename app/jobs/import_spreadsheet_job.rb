class ImportSpreadsheetJob < ApplicationJob
  queue_as :default

  def perform(file_path:, channel_token:, user_id:)
    ImportSpreadsheet.call(
      file_path:,
      created_by_id: user_id,
      channel_token:
    )
  end
end