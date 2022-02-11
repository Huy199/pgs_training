export interface ILoginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}
export interface ILoginValidation {
  email: string;
  password: string;
}
export interface IRegisterParams {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: 'male' | 'female';
  region: number;
  state: number;
}

export interface IRegisterValidation {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
}
