import EventBus from './eventBus';

const enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_RENDER = 'flow:render'
}

type PropsRecord = Record<string, string>;

abstract class Block {

    private _element: HTMLElement | null = null;

    private _meta: {
        tagName: string,
        props: PropsRecord
    };
    private _eventBus;
    protected _props;

    constructor(tagName: string = 'div', props: PropsRecord = {}) {
        this._eventBus = new EventBus;
        this._meta = {
            tagName,
            props
        };
        this._props = this._makePropsProxy(props);

        this._registerEvents();
        this._eventBus.emit(EVENTS.INIT);
    }

    _registerEvents() {
        this._eventBus.on(EVENTS.INIT, this._init.bind(this));
        this._eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this._eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    _init() {
        this._createResources();
        this._eventBus.emit(EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this._eventBus.emit(EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: PropsRecord, newProps: PropsRecord) {
        // implement!!!
    }

    componentDidUpdate(oldProps: PropsRecord, newProps: PropsRecord) {
        return true;
    }

    setProps = (nextProps: PropsRecord) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this._props, nextProps);
    }

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();
        // Это небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно компилировать не в строку (или делать это правильно),
        // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
        if (this._element) {
            this._element.innerHTML = block;
        }
    }

    // Переопределяется пользователем. Необходимо вернуть разметку
    abstract render(): string;

    getContent() {
        return this._element;
    }

    _makePropsProxy(props: PropsRecord) {
        // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

        // Реализовать!!!

        return props;
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        if (this._element) {
            this._element.style.display = 'block';
        }
    }

    hide() {
        if (this._element) {
            this._element.style.display = 'none';
        }
    }
}

export default Block;
