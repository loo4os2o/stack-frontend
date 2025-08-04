
export interface UserType {
  email?: string;
  email_verified?: boolean;
  name?: string;
  organization?: string;
  phone?: string;
  phone_verified?: boolean;
  sub?: string;
  companyAddress?: string;
  companyBusinessType?: string;
  companyPhone?: string;
  role?: string;
}

export interface UserStateType {
  user: UserType | null;
  isLoading: boolean;
  error: any;
  updateUser: (data: UserType | null) => void;
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
}