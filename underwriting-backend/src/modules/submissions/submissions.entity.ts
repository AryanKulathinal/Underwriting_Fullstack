import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  industry: string;

  @Column()
  location: string;

  @Column()
  revenue: number;

  @Column()
  pastClaimsCount: number;

  @Column()
  coverageAmount: number;

  @Column({ nullable: true })
  riskScore: number;

  @Column({ nullable: true })
  premium: number;

  @Column({ default: 'Pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
