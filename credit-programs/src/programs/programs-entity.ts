import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: process.env.CREDIT_PROGRAMS_SCHEMA, name: 'creditPrograms' })

export class CreditPrograms {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    creditProgram: string

    @ApiProperty()
    @Column()
    informationProgram: string

}