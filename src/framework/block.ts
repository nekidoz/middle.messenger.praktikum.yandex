import EventBus from './eventBus';
import {v4 as makeUUID} from 'uuid';

const enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render'
}

export type PropsRecord = Record<string, unknown>;
type EventsRecord = Record<string, () => void>;

abstract class Block {

    private _element: HTMLElement | null = null;

    private _meta: {
        tagName: string,
        props: PropsRecord
    };
    private _eventBus;
    protected _props;
    private _id: string | null = null;

    constructor(tagName: string = 'div', props: PropsRecord = {}) {
        this._eventBus = new EventBus;
        this._meta = {
            tagName,
            props
        };
        this._props = {...props};

        // Generate UUID if necessary
        const settings = props.settings as PropsRecord;
        if (settings?.withInternalID) {
            console.log('with UUID');
            this._id = makeUUID();
            this._props.__id = this._id;
        } else {
            console.log('without UUID');
        }

        // Generate PROPS proxy
        this._props = this._makePropsProxy(this._props);
        console.log(this._props);

        this._registerEvents();
        this._eventBus.emit(EVENTS.INIT);
    }

    _registerEvents() {
        this._eventBus.on(EVENTS.INIT, this._init.bind(this));
        this._eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this._eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
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
        const result = this.componentDidUpdate(oldProps, newProps);
        if (result) {
            this._eventBus.emit(EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: PropsRecord, newProps: PropsRecord): boolean {
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

    _addEvents() {
        const events: EventsRecord = this._props.events as EventsRecord;
        if (events && this._element) {
            Object.keys(events).forEach( eventName => {
                this._element?.addEventListener(eventName, events[eventName]);
            });
        }
    }

    _removeEvents() {
        const events: EventsRecord = this._props['events'] as EventsRecord;
        if (events && this._element) {
            Object.keys(events).forEach( eventName => {
                this._element?.removeEventListener(eventName, events[eventName]);
            });
        }
    }

    _render() {
        if (!this._element) {
            return;
        }
        const block = this.render();
        this._removeEvents();
        // Это небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно компилировать не в строку (или делать это правильно),
        // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
        this._element.innerHTML = block;
        this._addEvents();
    }

    // Переопределяется пользователем. Необходимо вернуть разметку
    abstract render(): string;

    getContent() {
        return this._element;
    }

    _makePropsProxy(props: PropsRecord) {
        // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

        const propsProxy = new Proxy(props, {
            get(target: PropsRecord, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: PropsRecord, prop: string, value: unknown) {
                const oldTarget = {...target};
                target[prop] = value;
                self._eventBus.emit(EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty(target: PropsRecord, prop: string) {
                if (prop.startsWith('_')) {
                  throw new Error('Нет прав');
                }
                delete target[prop];
                return true;
            },
            
        });

        return propsProxy;
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        const element = document.createElement(tagName);
        if (this._id) {
            element.setAttribute('data-id', this._id);
        }
        console.log(element);
        return element;
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
