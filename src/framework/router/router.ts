import Route from './route';
import Block, { PropsRecord } from '../block';
import Logger, { Level } from '../../utils/logger';

export const PATHNAME_ROUTE_404 = '/notfound';

export const DEFAULT_ROOT_QUERY = '#app';

export default class Router {
    // eslint-disable-next-line no-use-before-define
    private static __instance :Router;

    protected _routes: Record<string, Route<any>>;

    protected _history: History;

    protected _currentRoute: Route<any> | null;

    protected _rootQuery: string;

    private logger: Logger;

    constructor(rootQuery: string = DEFAULT_ROOT_QUERY) {
        // Singleton
        if (Router.__instance) {
            Router.__instance.logger.log('Router: returning singleton');
            return Router.__instance;
        }

        this.logger = new Logger(Level.debug);
        this.logger.log('Router: creating singleton');

        this._routes = {};
        this._history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use<T extends Block>(pathname: string, block: new (props: PropsRecord) => T, props: PropsRecord) {
        const route = new Route(pathname, block, props, this._rootQuery);
        this._routes[pathname] = route;
        return this;
    }

    useAs404<T extends Block>(block: new (props: PropsRecord) => T, props: PropsRecord) {
        return this.use(PATHNAME_ROUTE_404, block, props);
    }

    start() {
        window.onpopstate = (event) => {
            this._onRoute((event.currentTarget as Window)?.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        let route = this.getRoute(pathname);
        if (!route) {
            route = this.getRoute(PATHNAME_ROUTE_404);
            if (!route) {
                return;
            }
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.logger.log('Router.go', pathname);
        this._history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    go404() {
        this._history.pushState({}, '', PATHNAME_ROUTE_404);
        this._onRoute(PATHNAME_ROUTE_404);
    }

    back() {
        // triggers onpopstate event
        this._history.back();
    }

    forward() {
        // triggers onpopstate event
        this._history.forward();
    }

    getRoute(pathname: string) {
        return this._routes[pathname];
    }
}
