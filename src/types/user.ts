export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

export type UserStatus = "ACTIVE" | "BANNED";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  photo?: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};
