/* eslint max-classes-per-file: 0 */

import { RejectResponse } from '../framework/httpTransport';
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
            this.logger.log('LogoutApi.request()', credentials);
            this.httpApi.post('/logout', { data: credentials })
                .then(() => {
                    this.logger.log('Logout promise resolved');
                    resolve(new LogoutResponse().setSuccess(true));
                })
                .catch((response: RejectResponse) => {
                    this.logger.log(`Error logging out (${response.status}): ${response.reason}.`);
                    reject(new LogoutResponse().setSuccess(false).setReason(response.reason));
                });
        });
    }
}
