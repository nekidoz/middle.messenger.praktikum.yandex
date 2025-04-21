export default '<li class="{{class}}" id="{{id}}">\
    <div class="chat-list-item-grid">\
        {{{avatar}}}\
        {{{party}}}\
        {{{date}}}\
        {{{preview}}}\
        {{#if newMessages}}\
            {{{newMessages}}}\
        {{/if}}\
    </div>\
    {{{spacer}}}\
</li>';
