import Block, { PropsRecord } from '../block';
import Logger, { Level } from '../../utils/logger';

export default class Route<T extends Block> {
    protected _pathname: string;

    protected _blockClass:new (props: PropsRecord) => T;

    protected _blockProps: PropsRecord;

    protected _block: T;

    protected _rootQuery: string;

    private logger: Logger;

    constructor(
        pathname: string,
        blockClass: new (props: PropsRecord) => T,
        blockProps: PropsRecord,
        rootQuery: string,
    ) {
        this._pathname = pathname;
        this._blockClass = blockClass;
        this._blockProps = blockProps;
        this._rootQuery = rootQuery;
        this.logger = new Logger(Level.debug);
        this.logger.log('New route:', pathname, blockClass, blockProps, rootQuery, this);
    }

    navigate(pathname: string) {
        this.logger.log('Route navigate', pathname, this);
        if (pathname === this._pathname) {
            this.render();
        }
    }

    leave() {
        this.logger.log('Route leave', this);
        if (this._block) {
            this._block.hide();
        } else {
            this.logger.warning(`Tried to hide ${this._pathname} block that does not yet exist.`);
        }
    }

    render() {
        this.logger.log('Route render', this);
        if (!this._block) {
            this._block = new this._blockClass(this._blockProps);
        }
        const appElement = document.querySelector(this._rootQuery);
        if (!appElement) {
            this.logger.error(`App element ${this._rootQuery} not found`);
            return;
        }
        appElement.replaceWith(this._block.getContent() as Node);
        this._block.dispatchComponentDidMount();
        this._block.show();
    }
}
