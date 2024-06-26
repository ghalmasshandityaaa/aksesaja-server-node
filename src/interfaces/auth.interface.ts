export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp {
  fullName: string;
  password: string;
}

export interface VerifyActivationCode {
  email: string;
  verificationCode: string;
}

export interface Auth {
  userId: string;
  email: string;
}

export interface AuthOrganizer {
  organizerId: string;
  userId: string;
}
