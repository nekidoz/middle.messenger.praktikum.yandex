export default `<image src="{{source}}" class="{{class}}" alt=
{{#if caption}}
    "{{caption}}"
{{else}}
    "Картинка"
{{/if}} 
/>`;
