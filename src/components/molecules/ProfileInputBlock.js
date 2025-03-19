export default `<div class="profile-input-block">
    <div class="profile-input-block-inner">
        {{> Text class="profile-caption" text=caption }}
        {{> Input id=id type=type value=value placeholder=placeholder class="profile-input" }}
    </div>
    {{#if value}}
        {{> Text class="login-signup-error" text=error }}<p>
    {{/if}}
</div>`;