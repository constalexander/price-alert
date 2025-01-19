import { Role } from '@prisma/client';

export interface RegisterUserDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: Role;
    isVerified: boolean;
  };
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}
