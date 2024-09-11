// src/daily-log/daily-log.controller.ts
import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { DailyLogService } from './daily-log.service';
import { CreateDailyLogDto } from './dto/create-daily-log.dto';
import { AuthGuard } from "@nestjs/passport";

@Controller('api/daily-log')
export class DailyLogController {
  constructor(private readonly dailyLogService: DailyLogService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createDailyLogDto: CreateDailyLogDto, @Req() req) {
    createDailyLogDto.userId = req.user.id;
    return this.dailyLogService.create(createDailyLogDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req) {
    return this.dailyLogService.findByUser(req.user);
  }
}

@Controller("api/profile")
export class ProfileController {
  @Get()
  @UseGuards(AuthGuard("jwt"))
  getProfile(@Req() req) {
    return req.user;
  }
}