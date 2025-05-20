/* eslint max-classes-per-file: 0 */

import ProfileAvatarRequest from '../api/payload/profileAvatarRequest';
import ProfileAvatarResponse from '../api/payload/profileAvatarResponse';
import ProfilePasswordRequest from '../api/payload/profilePasswordRequest';
import ProfileRequest from '../api/payload/profileRequest';
import ProfileResponse from '../api/payload/profileResponse';
import ProfileApi from '../api/profileApi';
import ProfileAvatarApi from '../api/profileAvatarApi';
import ProfilePasswordApi from '../api/profilePasswordApi';
import Router from '../framework/router/router';
import Store from '../framework/store';

export class ProfileUpdateRequest extends ProfileRequest {
    oldPassword: string;

    newPassword: string;

    avatar: string;

    avatarFile: File;

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

    public setAvatarFile(file: File): ProfileUpdateRequest {
        this.avatarFile = file;
        return this;
    }
}

class ProfileController {
    private profileApi;

    private profilePasswordApi;

    private profileAvatarApi;

    private router;

    private store;

    constructor() {
        this.profileApi = new ProfileApi();
        this.profilePasswordApi = new ProfilePasswordApi();
        this.profileAvatarApi = new ProfileAvatarApi();
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

    private loadAvatar(avatar: string) {
        this.profileAvatarApi.request(new ProfileAvatarRequest().setAvatar(avatar))
            .then((response: ProfileAvatarResponse) => {
                this.store.set('user.avatar_blob', response.avatarBlob);
            })
            .catch((response: ProfileAvatarResponse) => {
                alert(`Ошибка загрузки аватара: ${response.reason}`);
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
                    if (response.avatar) {
                        this.loadAvatar(response.avatar);
                    }
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

    private updatePassword(oldPassword: string, newPassword: string) {
        // console.log('Password update requested');
        this.profilePasswordApi.update(
            new ProfilePasswordRequest()
                .setOldPassword(oldPassword)
                .setNewPassword(newPassword),
        )
            .then(() => {
                // console.log('Password updated successfully');
            })
            .catch((pResponse: ProfileResponse) => {
                alert(`Ошибка изменения пароля: ${pResponse.reason}`);
                this.router.go('/settings');
            });
    }

    private updateAvatar(avatarFile: File) {
        this.profileAvatarApi.update(new ProfileAvatarRequest().setAvatarFile(avatarFile))
            .then((response: ProfileResponse) => {
                this.store.set('user.avatar', response.avatar);
                this.loadAvatar(response.avatar);
            })
            .catch((response: ProfileResponse) => {
                alert(`Ошибка изменения аватара: ${response.reason}`);
                this.router.go('/settings');
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
                // Update password if specified
                if (credentials.newPassword) {
                    this.updatePassword(credentials.oldPassword, credentials.newPassword);
                }
                // Update avatar if specified
                if (credentials.avatar) {
                    this.updateAvatar(credentials.avatarFile);
                }
                this.router.go('/messenger');
            })
            .catch((response: ProfileResponse) => {
                alert(`Ошибка изменения данных профиля: ${response.reason}`);
            });
    }
}

export default new ProfileController();
