
export const LOGIN_TYPE = {
  PASSWORD: 'PASSWORD',
  GOOGLE: 'GOOGLE',
  FACEBOOK: 'FACEBOOK',
} as const;

export type TLoginType = keyof typeof LOGIN_TYPE;

export type TTokenUser = {
  userId: string;
  email: string;
  role: 'admin' | 'customer';
  profileImage?: string;
  loginType: TLoginType;
  iat: number;
  exp: number
};



export type TUser = {
  _id: string;
  name: string;
  email: string;
  phone?: number | string;
  password?: string;
  role: 'customer' | 'admin';
  profileImage?: string;
  address?: string;
  isBlocked: boolean;
  isDeleted: boolean;
  loginType: TLoginType;
  createdAt?: Date;
  updatedAt?: Date;
};