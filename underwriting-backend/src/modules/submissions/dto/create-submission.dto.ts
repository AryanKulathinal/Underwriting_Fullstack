import { IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubmissionDto {
  @ApiProperty({ example: 'ABC Corp', description: 'Name of the company' })
  @IsString()
  companyName: string;

  @ApiProperty({ example: 'Construction', description: 'Industry sector' })
  @IsString()
  industry: string;

  @ApiProperty({ example: 'New York', description: 'Location of company' })
  @IsString()
  location: string;

  @ApiProperty({ example: 5000000, description: 'Annual Revenue' })
  @IsNumber()
  @Min(0)
  revenue: number;

  @ApiProperty({ example: 1, description: 'Number of past claims' })
  @IsNumber()
  @Min(0)
  pastClaimsCount: number;

  @ApiProperty({ example: 1000000, description: 'Requested coverage amount' })
  @IsNumber()
  @Min(0)
  coverageAmount: number;
}
