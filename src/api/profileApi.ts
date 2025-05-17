/* eslint max-classes-per-file: 0 */

import { RejectResponse } from '../framework/httpTransport';
import Indexed from '../types/indexed';
import Logger, { Level } from '../utils/logger';
import BaseApi, { BaseApiRequest, BaseApiResponse } from './baseApi';

export class ProfileRequest extends BaseApiRequest {
    first_name: string;

    second_name: string | undefined;

    display_name: string | undefined;

    login: string;

    email: string;

    password: string;

    phone: string | undefined;

    public setFirstName(firstName: string): ProfileRequest {
        this.first_name = firstName;
        return this;
    }

    public setSecondName(secondName: string): ProfileRequest {
        this.second_name = secondName;
        return this;
    }

    public setDisplayName(displayName: string): ProfileRequest {
        this.display_name = displayName;
        return this;
    }

    public setLogin(login: string): ProfileRequest {
        this.login = login;
        return this;
    }

    public setEmail(email: string): ProfileRequest {
        this.email = email;
        return this;
    }

    public setPassword(password: string): ProfileRequest {
        this.password = password;
        return this;
    }

    public setPhone(phone: string): ProfileRequest {
        this.phone = phone;
        return this;
    }
}

export class ProfileResponse extends BaseApiResponse {
    id: number;

    first_name: string;

    second_name: string;

    display_name: string;

    login: string;

    email: string;

    phone: string;

    avatar: string;

    public setSuccess(success: boolean): ProfileResponse {
        super.setSuccess(success);
        return this;
    }

    public setReason(reason: string): ProfileResponse {
        super.setReason(reason);
        return this;
    }

    public setId(id: number): ProfileResponse {
        this.id = id;
        return this;
    }

    public setFirstName(firstName: string): ProfileResponse {
        this.first_name = firstName;
        return this;
    }

    public setSecondName(secondName: string): ProfileResponse {
        this.second_name = secondName;
        return this;
    }

    public setDisplayName(displayName: string): ProfileResponse {
        this.display_name = displayName;
        return this;
    }

    public setLogin(login: string): ProfileResponse {
        this.login = login;
        return this;
    }

    public setEmail(email: string): ProfileResponse {
        this.email = email;
        return this;
    }

    public setPhone(phone: string): ProfileResponse {
        this.phone = phone;
        return this;
    }

    public setAvatar(avatar: string): ProfileResponse {
        this.avatar = avatar;
        return this;
    }
}

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
    public request(credentials: ProfileRequest): Promise<ProfileResponse> {
        return new Promise((resolve, reject) => {
            this.logger.log('ProfileApi.request()', credentials);
            this.httpApi.get('/auth/user', { data: credentials })
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
