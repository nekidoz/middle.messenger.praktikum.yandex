import Block from '../framework/block';

export function render(query: string, block: Block) {
    const root = document.querySelector(query) as HTMLElement;
    // Можно завязаться на реализации вашего класса Block
    if (root) {
        root.appendChild(block.getContent() as Node);
        block.dispatchComponentDidMount();
    }
    return root;
}