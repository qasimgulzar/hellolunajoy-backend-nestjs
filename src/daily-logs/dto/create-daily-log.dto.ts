// src/daily-log/dto/create-daily-log.dto.ts
import { IsNumber, IsString, IsNotEmpty, Min, Max, IsDateString } from 'class-validator';

export class CreateDailyLogDto {
  @IsNumber()
  @Min(1)
  @Max(10)
  moodRating: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  anxietyLevel: number;

  @IsNumber()
  @Min(0)
  sleepHours: number;

  @IsString()
  sleepQuality: string;

  @IsString()
  sleepDisturbances: string;

  @IsString()
  physicalActivityType: string;

  @IsNumber()
  physicalActivityDuration: number; // in minutes

  @IsNumber()
  socialInteractionFrequency: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  stressLevel: number;

  @IsString()
  depressionSymptoms: string;

  @IsString()
  anxietySymptoms: string;

  @IsNumber()
  userId: number;

  @IsDateString()
  date: string;
}
