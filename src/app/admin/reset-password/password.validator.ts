import {FormGroup, ValidatorFn} from "@angular/forms";

export const differentPasswords: ValidatorFn = (formGroup: FormGroup) => {
  const password = formGroup.get("password").value;
  const passwordConfirmation = formGroup.get("passwordConfirmation").value;

  return passwordConfirmation !== password && password.trim() && passwordConfirmation.trim() ?  {differentPasswords: true} : null;
}
