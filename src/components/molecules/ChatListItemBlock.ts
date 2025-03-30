export default `<li class=
    {{#if active}}
        "chat-list-item chat-list-item-active" 
    {{else}}
        "chat-list-item" 
    {{/if}}
id={{chatId}}>
    <div class="chat-list-item-grid">
        {{> Image class="chat-list-item-avatar" source="/avatar.png" caption="Аватар" }}
        {{> Text class="chat-list-item-party" text=party}}
        {{> Text class="chat-list-item-date" text=date}}
        {{> Text class="chat-list-item-preview" text=preview}}
        {{#if newMessages}}
            {{#if (greater newMessages 99)}}
                {{> Text class="chat-list-item-new-messages" text="99+"}}
            {{else}}
                {{> Text class="chat-list-item-new-messages" text=newMessages}}
            {{/if}}
        {{/if}}
    </div>
    <div class="chat-list-item-separator">
    </div>
</li>`;
