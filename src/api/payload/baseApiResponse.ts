export default class BaseApiResponse {
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
