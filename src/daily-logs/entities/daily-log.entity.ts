// src/daily-log/entities/daily-log.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from '../../auth/entities/user.entity';

@Entity()
export class DailyLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  moodRating: number;

  @Column()
  anxietyLevel: number;

  @Column()
  sleepHours: number;

  @Column()
  sleepQuality: string;

  @Column()
  sleepDisturbances: string;

  @Column()
  physicalActivityType: string;

  @Column()
  physicalActivityDuration: number;

  @Column()
  socialInteractionFrequency: number;

  @Column()
  stressLevel: number;

  @Column()
  depressionSymptoms: string;

  @Column()
  anxietySymptoms: string;

  @ManyToOne(() => User, (user) => user.dailyLogs, { eager: true })
  user: User;

  @Column()
  date: string;
}
