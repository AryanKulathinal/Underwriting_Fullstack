import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './submissions.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { UnderwritingService } from './underwriting/underwriting.service';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionsRepository: Repository<Submission>,
    private readonly underwritingService: UnderwritingService,
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto) {
    const riskScore = this.underwritingService.calculateRiskScore(createSubmissionDto);
    const premium = this.underwritingService.calculatePremium(createSubmissionDto.coverageAmount, riskScore);

    const submission = this.submissionsRepository.create({
      ...createSubmissionDto,
      riskScore,
      premium,
    });

    return this.submissionsRepository.save(submission);
  }

  findAll() {
    return this.submissionsRepository.find();
  }

  findOne(id: number) {
    return this.submissionsRepository.findOneBy({ id });
  }

  async update(id: number, updateSubmissionDto: UpdateSubmissionDto) {
    await this.submissionsRepository.update(id, updateSubmissionDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.submissionsRepository.delete(id);
    return { message: 'Submission deleted successfully.' };
  }
}
