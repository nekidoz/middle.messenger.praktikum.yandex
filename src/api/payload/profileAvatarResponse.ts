import ProfileResponse from './profileResponse';

export default class ProfileAvatarResponse extends ProfileResponse {
    avatarBlob: Blob;

    public setAvatarBlob(image: Blob): ProfileAvatarResponse {
        this.avatarBlob = image;
        return this;
    }
}
