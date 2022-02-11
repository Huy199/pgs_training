import { ILoginParams, ILoginValidation, IRegisterParams, IRegisterValidation } from '../../models/auth';
import { validEmailRegex } from '../../utils';

const validateEmail = (email: string) => {
  if (!email) {
    return 'emailRequire';
  }

  if (!validEmailRegex.test(email)) {
    return 'emailInvalid';
  }

  return '';
};
const validateName = (name: string) => {
  if (!name) {
    return 'nameRequire';
  }
  return '';
};

const validatePassword = (password: string) => {
  if (!password) {
    return 'passwordRequire';
  }

  if (password.length < 4) {
    return 'minPasswordInvalid';
  }

  return '';
};

export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
};
export const validateRegister = (values: IRegisterParams): IRegisterValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    repeatPassword: validatePassword(values.password),
    name: validateName(values.name),
  };
};

export const validLogin = (values: ILoginValidation) => {
  return !values.email && !values.password;
};
export const validRegister = (values: IRegisterValidation) => {
  return !values.email && !values.password && !values.repeatPassword && !values.name;
};
