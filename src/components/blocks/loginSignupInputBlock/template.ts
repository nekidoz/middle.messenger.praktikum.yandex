export default `<div class="login-signup-input-block">
    <div class="login-signup-input-block-inner">
        {{{captionComponent}}}<p>
        {{{inputComponent}}}
    </div>
    {{#if error}}
        {{{errorComponent}}}<p>
    {{/if}}
</div>`;