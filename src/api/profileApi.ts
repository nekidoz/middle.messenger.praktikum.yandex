import { RejectResponse } from '../framework/httpTransport';
import Indexed from '../types/indexed';
import Logger, { Level } from '../framework/logger';
import BaseApi from './baseApi';
import ProfileRequest from './payload/profileRequest';
import ProfileResponse from './payload/profileResponse';

export default class ProfileApi extends BaseApi {
    // eslint-disable-next-line no-use-before-define
    private static __instance :ProfileApi;

    private logger: Logger;

    constructor() {
        // Singleton
        if (ProfileApi.__instance) {
            ProfileApi.__instance.logger.log('ProfileApi: returning singleton');
            // eslint-disable-next-line no-constructor-return
            return ProfileApi.__instance;
        }

        super('https://ya-praktikum.tech/api/v2');
        ProfileApi.__instance = this;
        this.logger = new Logger(Level.debug);
        this.logger.log('ProfileApi: creating singleton');
    }

    /**
     * Create profile (sign up)
     * @param credentials profile data;
     * required fields: first_name, second_name, login, email, password, phone
     * @returns profile id if created
     */
    public create(credentials: ProfileRequest): Promise<ProfileResponse> {
        return new Promise((resolve, reject) => {
            this.logger.log('ProfileApi.create()', credentials);
            this.httpApi.post('/auth/signup', { data: credentials })
                .then((response: Indexed) => {
                    this.logger.log('Create profile promise resolved');
                    resolve(new ProfileResponse().setSuccess(true).setId(response.id as number));
                })
                .catch((response: RejectResponse) => {
                    this.logger.log(`Error creating ptofile (${response.status}): ${response.reason}.`);
                    reject(new ProfileResponse().setSuccess(false).setReason(response.reason));
                });
        });
    }

    /**
     * Get currently logged profile info
     * @param credentials no parameters requires
     * @returns profile info
     */
    public request(): Promise<ProfileResponse> {
        return new Promise((resolve, reject) => {
            this.logger.log('ProfileApi.request()');
            this.httpApi.get('/auth/user')
                .then((response: Indexed) => {
                    this.logger.log('Request profile promise resolved');
                    resolve(new ProfileResponse()
                        .setSuccess(true)
                        .setId(response.id as number)
                        .setFirstName(response.first_name as string)
                        .setSecondName(response.second_name as string)
                        .setDisplayName(response.display_name as string)
                        .setPhone(response.phone as string)
                        .setLogin(response.login as string)
                        .setAvatar(response.avatar as string)
                        .setEmail(response.email as string));
                })
                .catch((response: RejectResponse) => {
                    this.logger.log(`Error getting profile data (${response.status}): ${response.reason}.`);
                    reject(new ProfileResponse().setSuccess(false).setReason(response.reason));
                });
        });
    }

    public update(credentials: ProfileRequest): Promise<ProfileResponse> {
        return new Promise((resolve, reject) => {
            this.logger.log('ProfileApi.update()', credentials);
            this.httpApi.put('/user/profile', { data: credentials })
                .then((response: Indexed) => {
                    this.logger.log('Update profile promise resolved');
                    resolve(new ProfileResponse()
                        .setSuccess(true)
                        .setId(response.id as number)
                        .setFirstName(response.first_name as string)
                        .setSecondName(response.second_name as string)
                        .setDisplayName(response.display_name as string)
                        .setPhone(response.phone as string)
                        .setLogin(response.login as string)
                        .setAvatar(response.avatar as string)
                        .setEmail(response.email as string));
                })
                .catch((response: RejectResponse) => {
                    this.logger.log(`Error updating profile data (${response.status}): ${response.reason}.`);
                    reject(new ProfileResponse().setSuccess(false).setReason(response.reason));
                });
        });
    }
}
