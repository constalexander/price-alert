export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isVerified: boolean;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
