import { RejectResponse } from '../framework/httpTransport';
import Logger, { Level } from '../framework/logger';
import BaseApi from './baseApi';
import ProfilePasswordRequest from './payload/profilePasswordRequest';
import ProfilePasswordResponse from './payload/profilePasswordResponse';

export default class ProfilePasswordApi extends BaseApi {
    // eslint-disable-next-line no-use-before-define
    private static __instance :ProfilePasswordApi;

    private logger: Logger;

    constructor() {
        // Singleton
        if (ProfilePasswordApi.__instance) {
            ProfilePasswordApi.__instance.logger.log('ProfilePasswordApi: returning singleton');
            // eslint-disable-next-line no-constructor-return
            return ProfilePasswordApi.__instance;
        }

        super('https://ya-praktikum.tech/api/v2/user');
        ProfilePasswordApi.__instance = this;
        this.logger = new Logger(Level.debug);
        this.logger.log('ProfilePasswordApi: creating singleton');
    }

    public update(credentials: ProfilePasswordRequest): Promise<ProfilePasswordResponse> {
        return new Promise((resolve, reject) => {
            this.logger.log('ProfilePasswordApi.update()', credentials);
            this.httpApi.put('/password', { data: credentials })
                .then(() => {
                    this.logger.log('Update profile password promise resolved');
                    resolve(new ProfilePasswordResponse()
                        .setSuccess(true));
                })
                .catch((response: RejectResponse) => {
                    this.logger.log(`Error updating profile password (${response.status}): ${response.reason}.`);
                    reject(new ProfilePasswordResponse().setSuccess(false).setReason(response.reason));
                });
        });
    }
}
