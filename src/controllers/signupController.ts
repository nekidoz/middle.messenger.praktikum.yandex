import SignupApi, { SignupRequest, SignupResponse } from '../api/signupApi';
import Router from '../framework/router/router';
import store from '../framework/store';

class SignupController {
    private signupApi;

    private router;

    constructor() {
        this.signupApi = new SignupApi();
        this.router = new Router();
    }

    public signup(credentials: SignupRequest) {
        this.signupApi.request(credentials)
            .then((response: SignupResponse) => {
                alert(`Registered with id ${response.id}`);
                store.set('user.login', credentials.login);
                this.router.go('/');
            })
            .catch((response: SignupResponse) => {
                alert(response.reason);
            });
    }
}

export default new SignupController();
