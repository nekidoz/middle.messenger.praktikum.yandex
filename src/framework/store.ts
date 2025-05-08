import Indexed from '../types/indexed';
import EventBus from './eventBus';
import set from '../utils/indexed/set';
import { Level } from '../utils/logger';

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    private state: Indexed = {};

    constructor() {
        super();
        this.logger.level = Level.debug;
    }

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.logger.log('Store state:', this.state);

        this.emit(StoreEvents.Updated);
    }
}

// Singleton
export default new Store();
