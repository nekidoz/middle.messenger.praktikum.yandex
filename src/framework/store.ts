/* eslint max-classes-per-file: 0 */

import Indexed from '../types/indexed';
import EventBus from './eventBus';
import set from '../utils/indexed/set';
import { Level } from './logger';
import Block, { PropsRecord } from './block';
import isEqual from '../utils/indexed/isEqual';

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
        this.logger.log('Store set request:', this.state, path, value);
        set(this.state, path, value);
        this.logger.log('Store state:', this.state);

        this.emit(StoreEvents.Updated);
    }
}

export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
    return class extends Component {
        constructor(args: PropsRecord) {
            const store = new Store();

            // save current Store state
            let state = mapStateToProps(store.getState());
            super({ ...args, ...state });

            // sign up for updates
            // console.log(`${Component.name}: connecting store update event`);
            // console.log(mapStateToProps(store.getState()));
            // console.log({ ...args, ...mapStateToProps(store.getState()) });
            store.on(StoreEvents.Updated, () => {
                // console.log('Store updated - setting props', store.getState());
                // get new Store state, of different - update
                const newState = mapStateToProps(store.getState());
                // console.log(Component.name, state, newState);
                if (!isEqual(state, newState)) {
                    this.setProps({ ...newState });
                    state = newState;
                }
            });
        }
    };
}

export default Store;
