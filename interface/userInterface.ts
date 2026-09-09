

export interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
  password: string;
  passwordConfirm?: string|undefined;
  passwordChangedAt?: Date;
  role: 'user' | 'guide' | 'lead-guide' | 'admin';
  passwordResetToken?: string|undefined;
  passwordResetExpires?: Date|undefined;
  active: boolean;

  changedPasswordAfter(iat: number): boolean;
  correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
  createPasswordResetToken(): string;


}