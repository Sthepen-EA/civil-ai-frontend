export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  password: string;
  role: string;
}

export const initialUser: IUser = {
  _id: '',
  name: '',
  email: '',
  phone: '',
  state: '',
  password: '',
  role: '',
};
