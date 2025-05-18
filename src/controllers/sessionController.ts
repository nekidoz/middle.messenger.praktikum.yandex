import SessionApi, { SessionRequest, SessionResponse } from '../api/sessionApi';
import Router from '../framework/router/router';
import Store from '../framework/store';

class SessionController {
    private sessionApi;

    private router;

    private store;

    constructor() {
        this.sessionApi = new SessionApi();
        this.router = new Router();
        this.store = new Store();
    }

    public login(credentials: SessionRequest) {
        this.sessionApi.create(credentials)
            .then(() => {
                this.store.set('user.login', credentials.login);
                this.router.go('/messenger');
            })
            .catch((response: SessionResponse) => {
                alert(response.reason);
            });
    }

    public logout() {
        this.sessionApi.delete()
            .then(() => {
                this.store.set('user', undefined);
                this.router.go('/');
            })
            .catch((response: SessionResponse) => {
                alert(response.reason);
                this.store.set('user', undefined);
                this.router.go('/');
            });
    }
}

export default new SessionController();
