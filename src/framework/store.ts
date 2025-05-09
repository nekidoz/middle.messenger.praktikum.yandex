/* eslint max-classes-per-file: 0 */

import Indexed from '../types/indexed';
import EventBus from './eventBus';
import set from '../utils/indexed/set';
import { Level } from '../utils/logger';
import Block, { PropsRecord } from './block';

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    // eslint-disable-next-line no-use-before-define
    private static __instance: Store;

    private state: Indexed = {};

    constructor() {
        // Singleton
        if (Store.__instance) {
            Store.__instance.logger.log('Store: returning singleton');
            // eslint-disable-next-line no-constructor-return
            return Store.__instance;
        }

        super();
        Store.__instance = this;
        this.logger.level = Level.debug;
        this.logger.log('Store: creating singleton');
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

export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
    return class extends Component {
        constructor(args: PropsRecord) {
            const store = new Store();
            super({ ...args, ...mapStateToProps(store.getState()) });

            // sign up for updates
            // this.logger.level = Level.debug;
            // this.logger.log(`${Component.name}: connecting store update event`);
            // this.logger.log(mapStateToProps(store.getState()));
            // this.logger.log({ ...args, ...mapStateToProps(store.getState()) });
            // this.logger.level = Level.info;
            store.on(StoreEvents.Updated, () => {
                // this.logger.level = Level.debug;
                // this.logger.log('Store updated - setting props', store.getState());
                this.setProps({ ...mapStateToProps(store.getState()) });
                // this.logger.level = Level.info;
            });
        }
    };
}

export default Store;
