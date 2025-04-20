import LoginSignupInputBlock from "../../blocks/loginSignupInputBlock";

const InputBoxValidationMixin = {
    validate(e: SubmitEvent): boolean {
        e.preventDefault();
        let success = true;
        let firstFailure: HTMLElement | null = this.getContent();
        Object.values(this._children.form._lists.content).forEach((block) => {
            if (block instanceof LoginSignupInputBlock) {
                const component = block._children.inputComponent.getContent();
                if (!block.isValid) {
                    component?.focus();
                    component?.blur();
                }
                if (success && !block.isValid) {
                    success = false;
                    firstFailure = component;
                }
            }
        })
        if (!success) {
            firstFailure?.focus();
        }
        return success;
    }
}

export default InputBoxValidationMixin;
