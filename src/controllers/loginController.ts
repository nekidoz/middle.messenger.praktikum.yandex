import LoginApi, { LoginRequest, LoginResponse } from '../api/loginApi';
import Router from '../framework/router/router';
import Store from '../framework/store';

class LoginController {
    private loginApi;

    private router;

    private store;

    constructor() {
        this.loginApi = new LoginApi();
        this.router = new Router();
        this.store = new Store();
    }

    public login(credentials: LoginRequest) {
        this.loginApi.request(credentials)
            .then(() => {
                this.store.set('user.login', credentials.login);
                this.router.go('/messenger');
            })
            .catch((response: LoginResponse) => {
                alert(response.reason);
            });
    }
}

export default new LoginController();
