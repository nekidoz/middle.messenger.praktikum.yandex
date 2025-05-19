/* eslint max-classes-per-file: 0 */

import ProfileApi, { ProfileRequest, ProfileResponse } from '../api/profileApi';
import ProfilePasswordApi, { ProfilePasswordRequest } from '../api/profilePasswordApi';
import Router from '../framework/router/router';
import Store from '../framework/store';

export class ProfileUpdateRequest extends ProfileRequest {
    oldPassword: string;

    newPassword: string;

    avatar: string;

    public setOldPassword(password: string): ProfileUpdateRequest {
        this.oldPassword = password;
        return this;
    }

    public setNewPassword(password: string): ProfileUpdateRequest {
        this.newPassword = password;
        return this;
    }

    public setAvatar(avatar: string): ProfileUpdateRequest {
        this.avatar = avatar;
        return this;
    }
}

class ProfileController {
    private profileApi;

    private profilePasswordApi;

    private router;

    private store;

    constructor() {
        this.profileApi = new ProfileApi();
        this.profilePasswordApi = new ProfilePasswordApi();
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
            this.profileApi.request()
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

    public update(credentials: ProfileUpdateRequest) {
        // console.log('Profile update request received', credentials);
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
                if (credentials.newPassword) {
                    // console.log('Password update requested');
                    this.profilePasswordApi.update(
                        new ProfilePasswordRequest()
                            .setOldPassword(credentials.oldPassword)
                            .setNewPassword(credentials.newPassword),
                    )
                        .then(() => {
                            // console.log('Password updated successfully');
                        })
                        .catch((pResponse: ProfileResponse) => {
                            alert(`Ошибка изменения пароля: ${pResponse.reason}`);
                            this.router.go('/settings');
                        });
                }
                if (credentials.avatar) {
                    // console.log('Avatar update requested');
                    alert('Need to set avatar');
                }
                this.router.go('/messenger');
            })
            .catch((response: ProfileResponse) => {
                alert(`Ошибка изменения данных профиля: ${response.reason}`);
            });
    }
}

export default new ProfileController();
