import Indexed from '../types/indexed';
import EventBus from './eventBus';

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        // set(this.state, path, value);

        this.emit(StoreEvents.Updated);
    }
}

// Singleton
export default new Store();
