export default `<div class="profile-input-block">
    <div class="profile-input-block-inner">
        {{{captionComponent}}}<p>
        {{{inputComponent}}}
    </div>
    {{#if error}}
        {{{errorComponent}}}<p>
    {{/if}}
</div>`;