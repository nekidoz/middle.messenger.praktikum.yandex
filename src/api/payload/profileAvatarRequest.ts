import BaseApiRequest from './baseApiRequest';

export default class ProfileAvatarRequest extends BaseApiRequest {
    avatar: string;

    avatarFile: File;

    public setAvatar(avatar: string): ProfileAvatarRequest {
        this.avatar = avatar;
        return this;
    }

    public setAvatarFile(file: File): ProfileAvatarRequest {
        this.avatarFile = file;
        return this;
    }
}
