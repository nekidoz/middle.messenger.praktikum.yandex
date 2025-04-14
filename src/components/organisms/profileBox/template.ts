export default '<main class="profile-box">\
    {{{avatar}}}\
    <h2>\
        {{#if display_name}}{{display_name}}{{/if}}\
        {{#unless display_name}}(имя не задано){{/unless}}\
    </h2>\
    {{{form}}}\
</main>';
    