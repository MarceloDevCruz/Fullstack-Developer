class DashboardController < ApplicationController
  layout 'react', only: :index

  def index; end

  def import_spreadsheet
    @token = params[:token].presence || SecureRandom.uuid
  end

  def upload_spreadsheet
    token = params[:token].presence || SecureRandom.uuid
    file  = params[:csv_file]
    headers = ActiveModel::Type::Boolean.new.cast(params[:headers])

    unless file&.respond_to?(:tempfile)
      redirect_to import_spreadsheet_path(token: token), alert: "Selecione um arquivo válido." and return
    end

    tmp_path = Rails.root.join("tmp", "upload_#{token}_#{Time.now.to_i}_#{file.original_filename}")
    FileUtils.cp(file.tempfile.path, tmp_path)

    ImportSpreadsheetJob.perform_later(
      file_path: tmp_path.to_s,
      has_headers: headers,
      channel_token: token,
      user_id: current_user.id
    )

    redirect_to import_spreadsheet_path(token: token), notice: "Upload iniciado. Acompanhe o progresso."
  rescue => e
    redirect_to import_spreadsheet_path, alert: "Falha ao iniciar: #{e.message}"
  end
end