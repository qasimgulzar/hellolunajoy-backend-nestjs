// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { DailyLog } from "../../daily-logs/entities/daily-log.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  googleId: string;  // Store Google ID for users authenticated via Google

  @OneToMany(() => DailyLog, (dailyLog) => dailyLog.user)
  dailyLogs: DailyLog[];
}
