import BaseApiRequest from './baseApiRequest';

export default class ProfilePasswordRequest extends BaseApiRequest {
    oldPassword: string;

    newPassword: string;

    public setOldPassword(password: string): ProfilePasswordRequest {
        this.oldPassword = password;
        return this;
    }

    public setNewPassword(password: string): ProfilePasswordRequest {
        this.newPassword = password;
        return this;
    }
}
