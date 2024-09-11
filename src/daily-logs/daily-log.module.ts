// src/daily-log/daily-log.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DailyLogService } from "./daily-log.service";
import { DailyLogController, ProfileController } from "./daily-log.controller";
import { DailyLog } from "./entities/daily-log.entity";
import { User } from "../auth/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DailyLog, User])],
  controllers: [DailyLogController, ProfileController],
  providers: [DailyLogService]
})
export class DailyLogModule {
}
