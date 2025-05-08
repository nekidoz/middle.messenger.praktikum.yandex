import Logger, { Level } from '../utils/logger';

class EventBus {
    listeners: Record<string, Function[]>;

    logger: Logger;

    constructor() {
        this.logger = new Logger(Level.info);
        this.listeners = {};
    }

    on(event: string, callback: Function) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: Function) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }

    emit(event: string, ...args: unknown[]) {
        this.logger.log(`EventBus: ${event} emitted`);
        if (this.listeners[event]) {
            this.listeners[event].forEach((listener) => { listener(...args); });
        } else {
            this.logger.log(`Не зарегистрированы обработчики события: ${event}`);
        }
    }
}

export default EventBus;
