import * as bcrypt from 'bcrypt';

export class AuthService {
  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }
}
