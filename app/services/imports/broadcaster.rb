class Imports::Broadcaster
  def initialize(token)
    @token = token.to_s
  end

  def start(total:)
    broadcast(type: "start", total: total)
  end

  def progress(current:, total:, ok:, message:)
    broadcast(type: "progress", current: current, total: total, ok: ok, message: message)
  end

  def finished(imported:, failed:, total:, errors: [])
    broadcast(type: "finished", imported: imported, failed: failed, total: total, errors: errors.to_a.take(20))
  end

  private

  def broadcast(payload)
    ActionCable.server.broadcast("imports:#{@token}", payload)
  end
end
