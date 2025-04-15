import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './eventBus';
import Logger, { Level } from '../utils/logger';

const enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render'
}

export type PropsRecord = Record<string, unknown>;
type EventsRecord = Record<string, () => void>;
/* eslint-disable-next-line no-use-before-define */
type BlocksRecord = Record<string, Block>;
type BlockListRecord = Record<string, unknown[]>;

abstract class Block {
    protected _element: HTMLElement | null = null;

    private _meta: {
        tagName: string,
        props: PropsRecord
    };

    private _eventBus;

    protected _props;

    protected _children;

    protected _lists: BlockListRecord;

    private _id: string | null = null;

    logger: Logger;

    // constructor(tagName: string = 'div', propsAndChildren: PropsRecord = {}) {
    constructor(propsAndChildren: PropsRecord = {}) {
        this.logger = new Logger(Level.info);

        const tagName = 'div'; 
        this._eventBus = new EventBus();

        // Get and save props in meta
        const { props, children, lists } = Block._separatePropsAndChildren(propsAndChildren);
        this._meta = {
            tagName,
            props,
        };

        // Generate UUID if necessary
        // !!! ID is necessary for compile - always created !!!

        // const settings = props.settings as PropsRecord;
        // if (settings?.withInternalID) {
            this._id = makeUUID();
            props.__id = this._id;
            this.logger.log(`${this._id}: Construct ${tagName}: `
                + `${Object.keys(props).length} props, `
                + `${Object.keys(children).length} children, `
                + `${Object.keys(lists).length} lists`, 
                propsAndChildren);
        // } else {
        //     this.logger.log(`Construct ${tagName} without UUID`);
        // }

        // Save props and generate PROPS proxies
        this._props = this._makePropsProxy(props) as PropsRecord;
        this._children = children;
        this._lists = this._makePropsProxy(lists) as BlockListRecord;

        this._registerEvents();
        this.logger.log(`${this._id}: Emitting INIT`);
        this._eventBus.emit(EVENTS.INIT);
    }

    static _separatePropsAndChildren(propsAndChildren: PropsRecord) {
        const props: PropsRecord = {};
        const children: BlocksRecord = {};
        const lists: BlockListRecord = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (value instanceof Array) {
                lists[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props, children, lists };
    }

    compile(template: string, props: PropsRecord = {}): HTMLElement {
        const propsAndStubs = { ...this._props, ...props };
        this.logger.log('Compile: ', template, props);

        // Resolve and add children's stubs into element
        Object.entries(this._children).forEach(([key, child]) => {
            this.logger.log(`Compile: child ${key} with id ${child._id}`);
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        // Resolve and add lists's stubs into element
        const listUUID = makeUUID();
        Object.entries(this._lists).forEach(([key]) => {
            this.logger.log(`Compile: list ${key} - assign common ID ${listUUID}`);
            propsAndStubs[key] = `<div data-id="${listUUID}"></div>`;
        });
        
        // Create temporary element (fragment) not to render intermediate results on screen
        this.logger.log(`Compile: create template fragment for element`);
        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

        // Compile element with stubs using Handlebars and place it into fragment
        const renderFunc = Handlebars.compile(template);
        const renderString = renderFunc(propsAndStubs);
        this.logger.log(`Compile: Handlebars-compiled string: ${renderString}`);
        fragment.innerHTML = renderString;

        // Replace child stubs with real children's content
        Object.values(this._children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            const content = child.getContent();
            if (!stub) {
                this.logger.warning(`Compile: stub ${child._id} not found - probably not rendered`);
            } else if (!content) {
                this.logger.error(`Compile: child ${child._id} has no content`);
            } else {
                this.logger.log(`Compile: replacing child ${child._id} with content: `, content);
                stub.replaceWith(content);
            }
        });

        // Replace list stubs with real lists's content
        Object.values(this._lists).forEach((list) => {
            // Create fragment for this individual list
            this.logger.log(`Compile: create template fragment for list`);
            const listFragment = this._createDocumentElement('template') as HTMLTemplateElement;

            list.forEach((item) => {
                if (item instanceof Block) {
                    const content = item.getContent();
                    if (!content) {
                        this.logger.error(`List item ${item._id} has no content`);
                    } else {
                        listFragment.content.append(content);
                    }
                    this.logger.log(`Compile: appended list block ${item._id}: `, content);
                } else {
                    listFragment.content.append(`${item}`);
                    this.logger.log(`Compile: appended list item: ${item}`);
                }

            })
            const stub = fragment.content.querySelector(`[data-id="${listUUID}"]`);
            if (!stub) {
                this.logger.error(`List stub not found!`);
            } else {
                stub.replaceWith(listFragment.content);
                this.logger.log(`Compile: replaced template fragment for list`, listFragment);
            }
        });

        // Find and return the first child element - the first real element
        const newElement = fragment.content.firstElementChild as HTMLElement;
        // this.logger.log('Fragment', fragment.innerHTML);
        // const newElement = fragment.content.firstChild as HTMLElement;
        this.logger.log(`Compile: complete element: `, newElement);
        return newElement;
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
        this.logger.log(`${this._id}: _init()`)
        this._createResources();
        this.logger.log(`${this._id}: Emitting FLOW_RENDER`);
        this._eventBus.emit(EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();

        // Генерируем это событие для всех детушек
        Object.values(this._children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
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

    // This is a stub, parameters are naturally unused
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    componentDidUpdate(_oldProps: PropsRecord, _newProps: PropsRecord): boolean {
        return true;
    }

    setProps = (nextProps: PropsRecord) => {
        if (!nextProps) {
            return;
        }
        this.logger.log(`${this._id}: setProps (old, new):`, this._props, nextProps);
        Object.assign(this._props, nextProps);
    };

    get element() {
        return this._element;
    }

    _addEvents() {
        const events: EventsRecord = this._props.events as EventsRecord;
        const element = this._element;
        if (events && element) {
            this.logger.log(`${this._id}: _addEvents: _element exists, adding ${Object.keys(events).length} events`);
            Object.keys(events).forEach((eventName) => {
                element.addEventListener(eventName, events[eventName]);
            });
        } else {
            this.logger.log(`${this._id}: _addEvents: no _element or no events`);
        }
    }

    _removeEvents() {
        const events: EventsRecord = this._props.events as EventsRecord;
        const element = this._element;
        if (events && element) {
            this.logger.log(`${this._id}: _removeEvents: _element exists, removing ${Object.keys(events).length} events`);
            Object.entries(events).forEach(([eventName, listener]) => {
                element.removeEventListener(eventName, listener);
            });
        } else {
            this.logger.log(`${this._id}: _removeEvents: no _element or no events`);
        }
    }

    setAttributes(attrs: PropsRecord) {
        if (attrs) {
            this.logger.log(`${this._id}: setAttributes: setting ${Object.keys(attrs).length} attributes`, attrs);
            Object.entries(attrs).forEach(([key, value]) => {
                if (this._element) {
                    this._element.setAttribute(key, value as string);
                }
            })
        } else {
            this.logger.log(`${this._id}: setAttributes: no attributes`);
        }
    }

    addAttributes() {
        const { attrs = {} } = this._props;
        this.setAttributes(attrs as PropsRecord);
    }

    _render() {
        this.logger.log(`${this._id}: _render: calling user-defined render() function`);
        const block = this.render();
        if (block) {
            this.logger.log(`${this._id}: _render: user-defined render() function returned block`, block);            
        }

        // remove existing events
        this._removeEvents();
    
        // replace element
        this.logger.log(`${this._id}: _render: replace element`);
        this.logger.log(`${this._id}: _render: _element before replacement`, this._element);   
        //  command to DOM         
        if (this._element && block) {
            this._element.replaceWith(block);
        }
        //  save element
        this._element = block;
        this.logger.log(`${this._id}: _render: _element after replacement`, this._element);            

        // reinstate events
        this._addEvents();
        this.addAttributes();

    }

    // Может переопределяться пользователем. Необходимо вернуть элемент
    render(): HTMLElement {
        return this.compile(this.getTemplate(), this._props);
    }

    // Может переопределяться пользователем. Необходимо вернуть шапблон разметки HTML
    getTemplate(): string {
        return this._props.template as string;
    }

    getContent() {
        return this._element;
    }

    _makePropsProxy(props: PropsRecord | BlockListRecord): PropsRecord | BlockListRecord {
        // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

        const propsProxy = new Proxy(props, {
            get(target: PropsRecord, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: PropsRecord, prop: string, value: unknown) {
                const oldTarget = { ...target };
                // This is the essense of this function - to reassign its parameter
                /* eslint-disable-next-line no-param-reassign */
                target[prop] = value;
                this.logger.log(`${self._id}: PropsProxy: assigned new value to \"${prop}\". Emitting FLOW_CDU`, value);
                self._eventBus.emit(EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
            deleteProperty(_target: PropsRecord, _prop: string) {
                throw new Error('Нет прав');
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
        this.logger.log(`${this._id}: _createDocumentElement: ${tagName}`, element);
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
