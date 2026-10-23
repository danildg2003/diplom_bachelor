import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: process.env.CREDIT_LOANS_SCHEMA, name: 'creditLoans' })
export class CreditLoans {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  summCredit: number;

  @ApiProperty()
  @Column()
  stavkaCredit: number;

  @ApiProperty()
  @Column()
  srokCredit: number;
}
