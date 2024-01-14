export interface AuthState {
  loading: boolean;
  error: string;
}

export interface adminData {
  phone: string;
  password: string;
  clubId?: string;
  confirmPassword?: string;
}
