import LoginSignupInputBlock from "../../blocks/loginSignupInputBlock";
import ProfileInputBlock from "../../blocks/profileInputBlock";

const InputBoxValidationMixin = {
    /**
     * Validates LoginBox, SignupBox and ProfileBox-like boxes input fields 
     * using their input fields' blur() validation and isValid status field.
     * 
     * @param {string[]} [matchingFields=[]] - specifies field names whose values should match (designed for password configuration fields)
     * @param {string} [mismatchMessage] - specified error message in case of field values mismatch
     * @return {boolean} true if validation successfull, false otherwise
     */
    validate(matchingFields: string[] = [], mismatchMessage: string = 'Значения полей не совпадают'): boolean {
        let success = true;
        let firstFailure: HTMLElement | null = this.getContent();
        let referenceValue: string;
        Object.values(this._children.form._lists.content).forEach((block) => {
            if (block instanceof LoginSignupInputBlock || block instanceof ProfileInputBlock) {
                const element = block._children.inputComponent.getContent();
                if (!block.isValid) {
                    // force validation if was invalid or not yet validated
                    element?.focus();
                    element?.blur();
                }
                // After earlier or forced validation
                if (!block.isValid) {
                    // for invalid field, note it if the first invalid one
                    if (success) {
                        success = false;
                        firstFailure = element;
                    }
                } else {
                    // for valid fields, check field value match
                    if (element) {
                        if (matchingFields.includes(element.id)) {
                            if (!referenceValue) {
                                referenceValue = (element as HTMLInputElement).value;
                            } else if ((element as HTMLInputElement).value !== referenceValue) {
                                block.setProps({error: mismatchMessage});
                                if (success) {
                                    success = false;
                                    firstFailure = element;
                                }          
                            }
                        }
                    }    
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
