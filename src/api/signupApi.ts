/* eslint max-classes-per-file: 0 */

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
            const result = new SignupResponse().setSuccess(false) as SignupResponse; // prepare for worse
            this.logger.log('SignupApi.request()', credentials, JSON.stringify(credentials));
            this.httpApi.post('/signup', { data: JSON.stringify(credentials) })
                .then((response: XMLHttpRequest) => {
                    this.logger.log('Signup promise resolved');
                    let responseStr: string;
                    switch (response.status) {
                        case 200:
                            // eslint-disable-next-line no-case-declarations
                            const { id } = JSON.parse(response.response);
                            result
                                .setSuccess(true)
                                .setId(id);
                            responseStr = `Signed up OK with id ${id}`;
                            break;
                        case 400:
                            responseStr = 'Bad request';
                            break;
                        case 401:
                            responseStr = 'Unauthorized';
                            break;
                        case 500:
                            responseStr = 'Unexpected error';
                            break;
                        default:
                            responseStr = 'Undefined response code';
                            break;
                    }
                    this.logger.log(`${responseStr} (${response.status}): ${response.response}.`, response);
                    if (response.status === 200) {
                        resolve(result);
                    } else {
                        const { reason } = JSON.parse(response.response);
                        reject(result.setReason(reason));
                    }
                })
                .catch((reply: XMLHttpRequest) => {
                    this.logger.log(`Error signing up (${reply.status}): ${reply.response}.`, reply);
                    reject(result.setReason('Exception signing up'));
                })
                .finally(() => {
                    reject(result.setReason('Unknown (finally)'));
                });
        });
    }
}
