type Chat = {
    party: string;
    chatId: string;
    content: {
        party: string;
        message: string;
    }[];
    newMessages: number;
    preview: string;
    date: string;
};

export default Chat;
