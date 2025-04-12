import Block, {PropsRecord} from '../../framework/block';

export class Link extends Block {
    constructor(props: PropsRecord) {
        super('a', {
            ...props,
            events: {
                click: (e: Event) => {
                    this.changeStyles();
                    const clickFunc = props.onClick as (e: Event) => void;
                    clickFunc(e);
                },
            },
            attrs: {
                // class: 'menu-page-menu-item',
            },
        });
    }

    changeStyles() {
        this.setProps({ attrs: {
            class: '',
        } });
    }

    override render() {
        const template = `<a href="{{href}}" class="{{class}}" data-page="{{datapage}}">{{text}}</a>`;
        return this.compile(template, this._props);
    }
}
