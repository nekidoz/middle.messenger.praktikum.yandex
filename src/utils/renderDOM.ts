import Block from '../framework/block';
import logger from './logger';

function render(query: string, block: Block) {
    const root = document.querySelector(query) as HTMLElement;
    // Можно завязаться на реализации вашего класса Block
    if (root) {
        logger.log('renderDOM: render', block, root);
        root.replaceWith(block.getContent() as Node);
        // root.appendChild(block.getContent() as Node);
        logger.log('renderDOM after render: render', block, root);
        block.dispatchComponentDidMount();
    } else {
        logger.error('renderDOM: Root element not found');
    }
    return root;
}

export default render;
