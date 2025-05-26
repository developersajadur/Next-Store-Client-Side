

export type TTokenUser = {
  userId: string;
  email: string;
  role: 'admin' | 'customer';
  loginType: string;
  iat: number;
  exp: number
};
