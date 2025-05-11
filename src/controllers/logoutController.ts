import LogoutApi, { LogoutRequest, LogoutResponse } from '../api/logoutApi';
import Router from '../framework/router/router';
import Store from '../framework/store';

class LogoutController {
    private logoutApi;

    private router;

    private store;

    constructor() {
        this.logoutApi = new LogoutApi();
        this.router = new Router();
        this.store = new Store();
    }

    public logout(credentials: LogoutRequest) {
        this.logoutApi.request(credentials)
            .then(() => {
                this.store.set('user.login', undefined);
                this.router.go('/');
            })
            .catch((response: LogoutResponse) => {
                alert(response.reason);
            });
    }
}

export default new LogoutController();
