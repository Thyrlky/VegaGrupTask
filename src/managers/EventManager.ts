import mitt, { Emitter, EventType } from 'mitt'

class EventManager {
  private static instance: EventManager

  public emitter: Emitter<Record<EventType, unknown>>
  private constructor() {
    this.emitter = mitt()
  }

  public static getInstance(): EventManager {
    if (!this.instance) {
      this.instance = new EventManager()
    }

    return this.instance
  }
}

const instance = EventManager.getInstance()
export { instance as EventManager }
