import { Injectable } from '@nestjs/common';

@Injectable()
export class UnderwritingService {
  calculateRiskScore(data: {
    industry: string;
    location: string;
    revenue: number;
    pastClaimsCount: number;
  }): number {
    let score = 50;

    if (['Construction', 'Mining'].includes(data.industry)) {
      score += 20;
    }

    if (['Flood Zone', 'Earthquake Zone'].includes(data.location)) {
      score += 15;
    }

    if (data.revenue > 10_000_000) {
      score += 10;
    }

    if (data.pastClaimsCount > 2) {
      score += 30;
    }

    return score;
  }

  calculatePremium(coverageAmount: number, riskScore: number): number {
    const basePremium = coverageAmount * 0.01;
    const riskFactor = riskScore / 100;
    return basePremium * (1 + riskFactor);
  }
}
