import ProfileApi, { ProfileRequest, ProfileResponse } from '../api/profileApi';
import Router from '../framework/router/router';
import Store from '../framework/store';

class ProfileController {
    private profileApi;

    private router;

    private store;

    constructor() {
        this.profileApi = new ProfileApi();
        this.router = new Router();
        this.store = new Store();
    }

    public create(credentials: ProfileRequest) {
        this.profileApi.create(credentials)
            .then((response: ProfileResponse) => {
                alert(`Registered with id ${response.id}`);
                this.store.set('user', {
                    id: response.id,
                    first_name: credentials.first_name,
                    second_name: credentials.second_name,
                    login: credentials.login,
                    email: credentials.email,
                    phone: credentials.phone,
                });
                this.router.go('/');
            })
            .catch((response: ProfileResponse) => {
                alert(response.reason);
            });
    }

    public get() {
        return new Promise<ProfileResponse>((resolve, reject) => {
            this.profileApi.request(new ProfileRequest())
                .then((response: ProfileResponse) => {
                    this.store.set('user', {
                        id: response.id,
                        first_name: response.first_name,
                        second_name: response.second_name,
                        display_name: response.display_name,
                        phone: response.phone,
                        login: response.login,
                        avatar: response.avatar,
                        email: response.email,
                    });
                    resolve(response);
                })
                .catch((response: ProfileResponse) => {
                    alert(`Ошибка получения данных профиля: ${response.reason}`);
                    reject(response);
                });
        });
    }

    public edit() {
        this.get()
            .then(() => {
                this.router.go('/settings');
            })
            .catch(() => {
            });
    }

    public update(credentials: ProfileRequest) {
        this.profileApi.update(credentials)
            .then((response: ProfileResponse) => {
                this.store.set('user', {
                    id: response.id,
                    first_name: response.first_name,
                    second_name: response.second_name,
                    display_name: response.display_name,
                    phone: response.phone,
                    login: response.login,
                    avatar: response.avatar,
                    email: response.email,
                });
                this.router.go('/messenger');
            })
            .catch((response: ProfileResponse) => {
                alert(`Ошибка изменения данных профиля: ${response.reason}`);
            });
    }
}

export default new ProfileController();
