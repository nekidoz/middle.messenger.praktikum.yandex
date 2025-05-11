import SignupApi, { SignupRequest, SignupResponse } from '../api/signupApi';
import Router from '../framework/router/router';
import Store from '../framework/store';

class SignupController {
    private signupApi;

    private router;

    private store;

    constructor() {
        this.signupApi = new SignupApi();
        this.router = new Router();
        this.store = new Store();
    }

    public signup(credentials: SignupRequest) {
        this.signupApi.request(credentials)
            .then((response: SignupResponse) => {
                alert(`Registered with id ${response.id}`);
                this.store.set('user', {
                    first_name: credentials.first_name,
                    second_name: credentials.second_name,
                    login: credentials.login,
                    email: credentials.email,
                    phone: credentials.phone,
                });
                this.router.go('/');
            })
            .catch((response: SignupResponse) => {
                alert(response.reason);
            });
    }
}

export default new SignupController();
