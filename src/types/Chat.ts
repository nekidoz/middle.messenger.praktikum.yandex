import ChatMessage from './ChatMessage';

type Chat = {
    party: string;
    chatId: string;
    content: ChatMessage[];
    newMessages: number;
    preview: string;
    date: string;
};

export default Chat;
