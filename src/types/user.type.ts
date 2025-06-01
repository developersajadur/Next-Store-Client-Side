
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
