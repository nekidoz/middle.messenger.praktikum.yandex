/* eslint max-classes-per-file: 0 */

import { RejectResponse } from '../framework/httpTransport';
import Indexed from '../types/indexed';
import Logger, { Level } from '../utils/logger';
import BaseApi, { BaseApiRequest, BaseApiResponse } from './baseApi';

export class SignupRequest extends BaseApiRequest {
    first_name: string;

    second_name: string | undefined;

    login: string;

    email: string;

    password: string;

    phone: string | undefined;

    public setFirstName(firstName: string): SignupRequest {
        this.first_name = firstName;
        return this;
    }

    public setSecondName(secondName: string): SignupRequest {
        this.second_name = secondName;
        return this;
    }

    public setLogin(login: string): SignupRequest {
        this.login = login;
        return this;
    }

    public setEmail(email: string): SignupRequest {
        this.email = email;
        return this;
    }

    public setPassword(password: string): SignupRequest {
        this.password = password;
        return this;
    }

    public setPhone(phone: string): SignupRequest {
        this.phone = phone;
        return this;
    }
}

export class SignupResponse extends BaseApiResponse {
    id: string;

    public setSuccess(success: boolean) {
        super.setSuccess(success);
        return this;
    }

    public setReason(reason: string) {
        super.setReason(reason);
        return this;
    }

    public setId(id: string) {
        this.id = id;
        return this;
    }
}

export default class SignupApi extends BaseApi {
    // eslint-disable-next-line no-use-before-define
    private static __instance :SignupApi;

    private logger: Logger;

    constructor() {
        // Singleton
        if (SignupApi.__instance) {
            SignupApi.__instance.logger.log('SignupApi: returning singleton');
            // eslint-disable-next-line no-constructor-return
            return SignupApi.__instance;
        }

        super('https://ya-praktikum.tech/api/v2/auth');
        SignupApi.__instance = this;
        this.logger = new Logger(Level.debug);
        this.logger.log('SignupApi: creating singleton');
    }

    public request(credentials: SignupRequest): Promise<SignupResponse> {
        return new Promise((resolve, reject) => {
            this.logger.log('SignupApi.request()', credentials);
            this.httpApi.post('/signup', { data: credentials })
                .then((response: Indexed) => {
                    this.logger.log('Signup promise resolved');
                    resolve((new SignupResponse().setSuccess(true) as SignupResponse).setId(response.id as string));
                })
                .catch((response: RejectResponse) => {
                    this.logger.log(`Error signing up (${response.status}): ${response.reason}.`);
                    reject(new SignupResponse().setSuccess(false).setReason(response.reason));
                });
        });
    }
}
