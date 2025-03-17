export default `<div class="login-signup-input-block">
    <div class="login-signup-input-block-inner">
        {{> Text class="login-signup-caption" text=caption }}<p>
        {{> Input id=id type=type value=value placeholder=placeholder class="input" }}
    </div>
    {{#if value}}
        {{> Text class="login-signup-error" text=error }}<p>
    {{/if}}
</div>`;