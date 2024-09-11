// auth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {
    // This initiates the Google OAuth flow
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req, @Res() res) {
    // Handle Google OAuth response
    const { jwtToken } = req.user;

    return res.redirect(`http://localhost:3005/login?access_token=${jwtToken}`);
  }
}
