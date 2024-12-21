import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export class AuthService {
  constructor(private jwtService: JwtService) {}

  async decode(token: string): Promise<string> {
    return this.jwtService.decode(token);
  }

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
