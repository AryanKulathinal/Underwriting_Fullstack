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
    const riskScore = Math.round(this.underwritingService.calculateRiskScore(createSubmissionDto));
    const premium = Math.round(this.underwritingService.calculatePremium(createSubmissionDto.coverageAmount, riskScore));

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

  
  async getDashboardStats() {
    const [submissions, totalCount] = await this.submissionsRepository.findAndCount();
    
    // Calculate statistics
    const pendingSubmissions = submissions.filter(s => s.status === 'Pending').length;
    const underReviewSubmissions = submissions.filter(s => s.status === 'Under Review').length;
    const quotedSubmissions = submissions.filter(s => s.status === 'Quoted').length;
    const declinedSubmissions = submissions.filter(s => s.status === 'Declined').length;
    
    // Calculate average risk score and premium
    const avgRiskScore = submissions.length > 0 
      ? submissions.reduce((sum, s) => sum + (s.riskScore || 0), 0) / submissions.length 
      : 0;
    
    const avgPremium = submissions.length > 0 
      ? submissions.reduce((sum, s) => sum + (s.premium || 0), 0) / submissions.length 
      : 0;
    
    // Calculate total premium
    const totalPremium = submissions.reduce((sum, s) => sum + (s.premium || 0), 0);
    
    // Calculate submissions by industry
    const submissionsByIndustry = submissions.reduce((acc, submission) => {
      const industry = submission.industry;
      acc[industry] = (acc[industry] || 0) + 1;
      return acc;
    }, {});
    
    // Get submissions by month (for the last 6 months)
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    
    const submissionsByMonth = submissions
      .filter(s => new Date(s.createdAt) >= sixMonthsAgo)
      .reduce((acc, submission) => {
        const month = new Date(submission.createdAt).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});
    
    return {
      totalSubmissions: totalCount,
      submissionStatuses: {
        pending: pendingSubmissions,
        underReview: underReviewSubmissions,
        quoted: quotedSubmissions,
        declined: declinedSubmissions
      },
      avgRiskScore: parseFloat(avgRiskScore.toFixed(2)),
      avgPremium: parseFloat(avgPremium.toFixed(2)),
      totalPremium: parseFloat(totalPremium.toFixed(2)),
      submissionsByIndustry,
      submissionsByMonth,
    };
  }
}
