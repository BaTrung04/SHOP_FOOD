export interface ILogin {
  email: string;
  password: string;
}
export interface IAvatar {
  public_id: string;
  url: string;
}
export interface IUser {
  avatar: IAvatar;
  role: string;
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface IApiLogin {
  token: string;
  user: IUser;
}
