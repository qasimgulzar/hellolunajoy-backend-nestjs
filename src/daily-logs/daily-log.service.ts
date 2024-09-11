// src/daily-log/daily-log.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyLog } from './entities/daily-log.entity';
import { CreateDailyLogDto } from './dto/create-daily-log.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class DailyLogService {
  constructor(
    @InjectRepository(DailyLog)
    private dailyLogRepository: Repository<DailyLog>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createDailyLogDto: CreateDailyLogDto): Promise<DailyLog> {
    const user = await this.userRepository.findOneBy({
      id: createDailyLogDto.userId,
    });

    if (!user) {
      throw new Error('User not found');
    }

    const dailyLog = this.dailyLogRepository.create({
      ...createDailyLogDto,
      user, // Assign the user entity to the daily log
    });

    return this.dailyLogRepository.save(dailyLog);
  }

  findAll(): Promise<DailyLog[]> {
    return this.dailyLogRepository.find();
  }

  findByUser(user: any): Promise<DailyLog[]> {
    return this.dailyLogRepository.findBy({ user: { id: user.userId } });
  }
}
