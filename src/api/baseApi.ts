/* eslint max-classes-per-file: 0 */

import HTTPTransport from '../framework/httpTransport';

export class BaseApiRequest {

}

export class BaseApiResponse {
    success: boolean;

    reason: string;

    public setSuccess(success: boolean): BaseApiResponse {
        this.success = success;
        return this;
    }

    public setReason(reason: string): BaseApiResponse {
        this.reason = reason;
        return this;
    }
}

export default class BaseAPI {
    protected httpApi: HTTPTransport;

    constructor(baseUrl: string) {
        this.httpApi = new HTTPTransport(baseUrl);
    }

    // eslint-disable-next-line class-methods-use-this
    create(request: BaseApiRequest): Promise<BaseApiResponse> {
        throw new Error(`Not implemented: ${JSON.stringify(request)}`);
    }

    // eslint-disable-next-line class-methods-use-this
    request(request: BaseApiRequest): Promise<BaseApiResponse> {
        throw new Error(`Not implemented: ${JSON.stringify(request)}`);
    }

    // eslint-disable-next-line class-methods-use-this
    update(request: BaseApiRequest): Promise<BaseApiResponse> {
        throw new Error(`Not implemented: ${JSON.stringify(request)}`);
    }

    // eslint-disable-next-line class-methods-use-this
    delete(request: BaseApiRequest): Promise<BaseApiResponse> {
        throw new Error(`Not implemented: ${JSON.stringify(request)}`);
    }
}
