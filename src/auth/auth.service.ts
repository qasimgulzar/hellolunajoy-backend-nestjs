// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateOAuthLogin(profile: any): Promise<string> {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT secret is not defined');
    }
    // Extract profile details from Google
    const { email, firstName, lastName, picture, id: googleId } = profile;

    // Check if user already exists in the database
    let user = await this.userService.findOneByEmail(email);

    if (!user) {
      // Create a new user if one does not exist
      user = await this.userService.createUser({
        email,
        firstName,
        lastName,
        picture,
        googleId,
      });
    }

    // Return JWT token for the user
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload,{ secret });
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
