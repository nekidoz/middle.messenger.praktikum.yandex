import LoginApi, { LoginRequest, LoginResponse } from '../api/loginApi';
import Router from '../framework/router/router';
import store from '../framework/store';

class LoginController {
    private loginApi;

    private router;

    constructor() {
        this.loginApi = new LoginApi();
        this.router = new Router();
    }

    public login(credentials: LoginRequest) {
        this.loginApi.request(credentials)
            .then(() => {
                store.set('user.login', credentials.login);
                this.router.go('/messenger');
            })
            .catch((response: LoginResponse) => {
                alert(response.reason);
            });
    }
}

export default new LoginController();
