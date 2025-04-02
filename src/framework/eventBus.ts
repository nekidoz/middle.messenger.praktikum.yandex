class EventBus {
    listners: Record<string, Function[]>;

    constructor() {
        this.listners = {};
    }

    on(event: string, callback: Function) {
        if (!this.listners[event]) {
            this.listners[event] = [];
        }
        this.listners[event].push(callback);
    }

    off(event: string, callback: Function) {
        if (!this.listners[event]) {
            this.listners[event] = [];
        }
        this.listners[event] = this.listners[event].filter((listner) => listner !== callback);
    }

    emit(event: string, ...args: unknown[]) {
        if (!this.listners[event]) {
            throw new Error(`Событие не зарегистрировано: ${event}`);
        }
        this.listners[event].forEach((listner) => { listner(...args); });
    }
}

export default EventBus;
