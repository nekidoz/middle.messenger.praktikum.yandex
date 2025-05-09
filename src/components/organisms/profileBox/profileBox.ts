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

export default class ProfileBox extends Block {
    constructor(props: PropsRecord = {}) {
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
                    new ProfileInputBlock({
                        id: 'email',
                        type: 'email',
                        value: props.email,
                        caption: '* Почта',
                        placeholder: 'Почта',
                    }),
                    new ProfileInputBlock({
                        id: 'login',
                        type: 'text',
                        value: props.login,
                        caption: '* Логин',
                        placeholder: 'Логин',
                    }),
                    new ProfileInputBlock({
                        id: 'first_name',
                        type: 'text',
                        value: props.first_name,
                        caption: '* Имя',
                        placeholder: 'Имя',
                    }),
                    new ProfileInputBlock({
                        id: 'second_name',
                        type: 'text',
                        value: props.second_name,
                        caption: 'Фамилия',
                        placeholder: 'Фамилия',
                    }),
                    new ProfileInputBlock({
                        id: 'display_name',
                        type: 'text',
                        value: props.display_name,
                        caption: '* Имя в чате',
                        placeholder: 'Имя в чате',
                    }),
                    new ProfileInputBlock({
                        id: 'phone',
                        type: 'tel',
                        value: props.phone,
                        caption: 'Телефон',
                        placeholder: 'Телефон',
                    }),
                    new ProfileInputBlock({
                        id: 'avatar',
                        type: 'file',
                        value: props.avatar,
                        accept: 'image/png, image/jpeg',
                        caption: 'Аватар',
                        placeholder: 'Аватар',
                    }),
                    new Spacer({
                        class: 'profile-spacer',
                    }),
                    new ProfileInputBlock({
                        id: 'oldPassword',
                        type: 'password',
                        caption: 'Старый пароль',
                        placeholder: 'Старый пароль',
                    }),
                    new ProfileInputBlock({
                        id: 'newPassword',
                        type: 'password',
                        caption: 'Новый пароль',
                        placeholder: 'Новый пароль',
                    }),
                    new ProfileInputBlock({
                        id: 'repeatNewPassword',
                        type: 'password',
                        caption: 'Новый пароль (еще раз)',
                        placeholder: 'Новый пароль (еще раз)',
                    }),
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
                                datapage: 'login',
                                text: 'Выйти',
                                change_page: props.change_page,
                            }),
                        ],
                    }),
                ],
                events: {
                    submit: (e: SubmitEvent) => {
                        e.preventDefault();
                        if (this.validate(['newPassword', 'repeatNewPassword'], 'Пароли не совпадают')) {
                            (this._props.onSubmit as (event: SubmitEvent) => void)(e);
                        }
                    },
                },
            }),
            template,
        });
    }

    // The following is replaced with implementation from InputBoxValidationMixin
    validate(matchingFields: string[] = [], mismatchMessage: string = ''): boolean {
        this.logger.log(matchingFields, mismatchMessage);
        return true;
    }
}

Object.assign(ProfileBox.prototype, InputBoxValidationMixin);
