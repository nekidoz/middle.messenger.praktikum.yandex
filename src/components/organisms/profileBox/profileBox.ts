import Block, { PropsRecord } from '../../../framework/block';
import Input from '../../atoms/input';
import Link from '../../atoms/link';
import Form from '../../atoms/form';
import Div from '../../atoms/div';
import Image from '../../atoms/image';
import Spacer from '../../atoms/spacer';
import ProfileInputBlock from '../../blocks/profileInputBlock';
import template from './template';
import InputBoxValidationMixin from '../../mixins/inputBoxValidationMixin';
import Indexed from '../../../types/indexed';
import { connect } from '../../../framework/store';
import sessionController from '../../../controllers/sessionController';
import profileController, { ProfileUpdateRequest } from '../../../controllers/profileController';

class ProfileBox extends Block {
    private email;

    private login;

    private firstName;

    private secondName;

    private displayName;

    private phone;

    private avatar;

    // private oldPassword;

    // private newPassword;

    // private repeatNewPassword;

    constructor(props: PropsRecord = {}) {
        const email = new ProfileInputBlock({
            id: 'email',
            type: 'email',
            value: props.email,
            caption: '* Почта',
            placeholder: 'Почта',
        });
        const login = new ProfileInputBlock({
            id: 'login',
            type: 'text',
            value: props.login,
            caption: '* Логин',
            placeholder: 'Логин',
        });
        const firstName = new ProfileInputBlock({
            id: 'first_name',
            type: 'text',
            value: props.first_name,
            caption: '* Имя',
            placeholder: 'Имя',
        });
        const secondName = new ProfileInputBlock({
            id: 'second_name',
            type: 'text',
            value: props.second_name,
            caption: '* Фамилия',
            placeholder: 'Фамилия',
        });
        const displayName = new ProfileInputBlock({
            id: 'display_name',
            type: 'text',
            value: props.display_name,
            caption: '* Имя в чате',
            placeholder: 'Имя в чате',
        });
        const phone = new ProfileInputBlock({
            id: 'phone',
            type: 'tel',
            value: props.phone,
            caption: '* Телефон',
            placeholder: 'Телефон',
        });
        const avatar = new ProfileInputBlock({
            id: 'avatar',
            type: 'file',
            value: props.avatar,
            accept: 'image/png, image/jpeg, image/gif, image/webp',
            caption: 'Аватар',
            placeholder: 'Аватар',
        });
        const oldPassword = new ProfileInputBlock({
            id: 'oldPassword',
            type: 'password',
            caption: 'Старый пароль',
            placeholder: 'Старый пароль',
        });
        const newPassword = new ProfileInputBlock({
            id: 'newPassword',
            type: 'password',
            caption: 'Новый пароль',
            placeholder: 'Новый пароль',
        });
        const repeatNewPassword = new ProfileInputBlock({
            id: 'repeatNewPassword',
            type: 'password',
            caption: 'Новый пароль (еще раз)',
            placeholder: 'Новый пароль (еще раз)',
        });
        super({
            ...props,
            avatar: new Image({
                source: props.profile_avatar,
                class: 'profile-avatar',
                caption: 'Аватар',
            }),
            display_name: props.display_name,
            form: new Form({
                id: 'profile-form',
                content: [
                    new Spacer({
                        class: 'profile-spacer',
                    }),
                    email,
                    login,
                    firstName,
                    secondName,
                    displayName,
                    phone,
                    new Spacer({
                        class: 'profile-spacer',
                    }),
                    avatar,
                    new Spacer({
                        class: 'profile-spacer',
                    }),
                    oldPassword,
                    newPassword,
                    repeatNewPassword,
                    new Div({
                        class: 'button-stack',
                        content: [
                            new Input({
                                id: 'btn-save-profile',
                                class: 'regular-button',
                                type: 'submit',
                                value: 'Сохранить',
                            }),
                            new Link({
                                href: '#',
                                class: 'menu-page-menu-item',
                                text: 'Выйти',
                                events: {
                                    click: (e: Event) => {
                                        e.preventDefault();
                                        this.logger.log('Выход');
                                        sessionController.logout();
                                    },
                                },
                            }),
                        ],
                    }),
                ],
                events: {
                    submit: (e: SubmitEvent) => {
                        e.preventDefault();
                        if (this.validate(['newPassword', 'repeatNewPassword'], 'Пароли не совпадают')) {
                            const formElement = e.target as HTMLFormElement;
                            const request = (new ProfileUpdateRequest()
                                .setFirstName(formElement?.first_name.value)
                                .setSecondName(formElement?.second_name.value)
                                .setDisplayName(formElement?.display_name.value)
                                .setLogin(formElement?.login.value)
                                .setEmail(formElement?.email.value)
                                .setPhone(formElement?.phone.value) as ProfileUpdateRequest)
                                .setOldPassword(formElement?.oldPassword.value)
                                .setNewPassword(formElement?.newPassword.value)
                                .setAvatar(formElement?.avatar.value);
                            this.logger.log('Обновление профиля', request);
                            profileController.update(request);
                        }
                    },
                },
            }),
            template,
        });
        this.email = email;
        this.login = login;
        this.firstName = firstName;
        this.secondName = secondName;
        this.displayName = displayName;
        this.phone = phone;
        this.avatar = avatar;
        // this.oldPassword = oldPassword;
        // this.newPassword = newPassword;
        // this.repeatNewPassword = repeatNewPassword;
    }

    componentDidUpdate(_oldProps: PropsRecord, _newProps: PropsRecord): boolean {
        return Block.updateChildProps(_oldProps, _newProps, this.email, 'value', 'email')
            || Block.updateChildProps(_oldProps, _newProps, this.login, 'value', 'login')
            || Block.updateChildProps(_oldProps, _newProps, this.firstName, 'value', 'first_name')
            || Block.updateChildProps(_oldProps, _newProps, this.secondName, 'value', 'second_name')
            || Block.updateChildProps(_oldProps, _newProps, this.displayName, 'value', 'display_name')
            || Block.updateChildProps(_oldProps, _newProps, this.phone, 'value', 'phone')
            || Block.updateChildProps(_oldProps, _newProps, this.avatar, 'value', 'avatar');
    }

    // The following is replaced with implementation from InputBoxValidationMixin
    validate(matchingFields: string[] = [], mismatchMessage: string = ''): boolean {
        this.logger.log(matchingFields, mismatchMessage);
        return true;
    }
}

// map Store props to form props
function mapStateToProps(state: Indexed) {
    const userSection: Indexed | undefined = state.user as Indexed | undefined;
    return userSection
        ? {
            email: userSection.email,
            login: userSection.login,
            first_name: userSection.first_name,
            second_name: userSection.second_name,
            display_name: userSection.display_name,
            phone: userSection.phone,
            avatar: userSection.avatar,
        }
        : {};
}

Object.assign(ProfileBox.prototype, InputBoxValidationMixin);

export default connect(ProfileBox, mapStateToProps);
