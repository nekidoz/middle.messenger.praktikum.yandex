export default `<li class="chat-list-item" id={{id}}>
    <div class="chat-list-item-grid">
        {{> Image class="chat-list-item-avatar" source="/avatar.png" }}
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