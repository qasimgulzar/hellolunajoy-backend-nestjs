import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { GoogleStrategy } from "./google/google.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "google" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Set secret from .env
      signOptions: { expiresIn: "1h" } // Token expiration
    }),
  ],
  providers: [AuthService, UserService, GoogleStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
}
