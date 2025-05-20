import { RejectResponse } from '../framework/httpTransport';
import Logger, { Level } from '../framework/logger';
import BaseApi from './baseApi';
import ProfileAvatarRequest from './payload/profileAvatarRequest';
import ProfileAvatarResponse from './payload/profileAvatarResponse';

export default class ProfileAvatarApi extends BaseApi {
    // eslint-disable-next-line no-use-before-define
    private static __instance :ProfileAvatarApi;

    private logger: Logger;

    constructor() {
        // Singleton
        if (ProfileAvatarApi.__instance) {
            ProfileAvatarApi.__instance.logger.log('ProfileAvatarApi: returning singleton');
            // eslint-disable-next-line no-constructor-return
            return ProfileAvatarApi.__instance;
        }

        super('https://ya-praktikum.tech/api/v2');
        ProfileAvatarApi.__instance = this;
        this.logger = new Logger(Level.debug);
        this.logger.log('ProfileAvatarApi: creating singleton');
    }

    request(credentials: ProfileAvatarRequest): Promise<ProfileAvatarResponse> {
        return new Promise((resolve, reject) => {
            this.logger.log('ProfileAvatarApi.request()');
            this.httpApi.get(`/resources${credentials.avatar}`, { responseType: 'blob' })
                .then((response: Blob) => {
                    this.logger.log('Request profile avatar promise resolved', response);
                    resolve(new ProfileAvatarResponse()
                        .setAvatarBlob(response));
                })
                .catch((response: RejectResponse) => {
                    this.logger.log(`Error getting profile data (${response.status}): ${response.reason}.`);
                    reject(new ProfileAvatarResponse().setSuccess(false).setReason(response.reason));
                });
        });
    }

    public update(credentials: ProfileAvatarRequest): Promise<ProfileAvatarResponse> {
        return new Promise((resolve, reject) => {
            this.logger.log('ProfileAvatarApi.update()', credentials);
            // prepare file for uploading
            const data = new FormData();
            data.append('avatar', credentials.avatarFile);
            this.httpApi.put('/user/profile/avatar', { data })
                .then((response: ProfileAvatarResponse) => {
                    this.logger.log('Update profile avatar promise resolved');
                    resolve((new ProfileAvatarResponse()
                        .setSuccess(true) as ProfileAvatarResponse)
                        .setId(response.id as number)
                        .setFirstName(response.first_name as string)
                        .setSecondName(response.second_name as string)
                        .setDisplayName(response.display_name as string)
                        .setPhone(response.phone as string)
                        .setLogin(response.login as string)
                        .setAvatar(response.avatar as string)
                        .setEmail(response.email as string) as ProfileAvatarResponse);
                })
                .catch((response: RejectResponse) => {
                    this.logger.log(`Error updating profile avatar (${response.status}): ${response.reason}.`);
                    reject(new ProfileAvatarResponse().setSuccess(false).setReason(response.reason));
                });
        });
    }
}
