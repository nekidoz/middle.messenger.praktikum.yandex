export default `
<div class="chat-content-grid">
    {{> Image class="chat-content-avatar" source="/avatar.png" caption="Аватар" }}
    {{> Text class="chat-content-party" text=chat.party}}
    {{> Button id="chat-action" class="chat-content-action" text="⋮"}}
    <div class="chat-content-dialog">  
        {{#each chat.content}}
            {{#if (equals this.party "me")}}
                {{> Text class="chat-content-message-self chat-content-message" text=this.message}}
            {{else}}
                {{> Text class="chat-content-message-party chat-content-message" text=this.message}}
            {{/if}}
        {{/each}}
    </div>
    {{> Button id="chat-attach" class="chat-content-action" text="📎"}}
    <form id="chat-message-form" class="chat-content-message-form" >
        {{> Input id="message" class="chat-content-message-input" type="text" placeholder="Сообщение" }}
        {{> Button id="chat-send" class="chat-content-message-send" type="submit" text="➔"}}
    </form>
</div>
`;
