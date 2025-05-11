/* eslint max-classes-per-file: 0 */

import Logger, { Level } from '../utils/logger';
import BaseApi, { BaseApiRequest, BaseApiResponse } from './baseApi';

export class LogoutRequest extends BaseApiRequest {

}

export class LogoutResponse extends BaseApiResponse {

}

export default class LogoutApi extends BaseApi {
    // eslint-disable-next-line no-use-before-define
    private static __instance :LogoutApi;

    private logger: Logger;

    constructor() {
        // Singleton
        if (LogoutApi.__instance) {
            LogoutApi.__instance.logger.log('LogoutApi: returning singleton');
            // eslint-disable-next-line no-constructor-return
            return LogoutApi.__instance;
        }

        super('https://ya-praktikum.tech/api/v2/auth');
        LogoutApi.__instance = this;
        this.logger = new Logger(Level.debug);
        this.logger.log('LogoutApi: creating singleton');
    }

    public request(credentials: LogoutRequest): Promise<LogoutResponse> {
        return new Promise((resolve, reject) => {
            const result = new LogoutResponse().setSuccess(false); // prepare for worse
            this.logger.log('LogoutApi.request()', credentials, JSON.stringify(credentials));
            this.httpApi.post('/logout', { data: JSON.stringify(credentials) })
                .then((response: XMLHttpRequest) => {
                    this.logger.log('Logout promise resolved');
                    let responseStr: string;
                    switch (response.status) {
                        case 200:
                            result.setSuccess(true);
                            responseStr = 'Logged out OK';
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
                    this.logger.log(`Error logging out (${reply.status}): ${reply.response}.`, reply);
                    reject(result.setReason('Exception logging out'));
                })
                .finally(() => {
                    reject(result.setReason('Unknown (finally)'));
                });
        });
    }
}
