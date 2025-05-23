import axiosInstance from '../axios';

export interface DashboardStats {
  totalSubmissions: number;
  submissionStatuses: {
    pending: number;
    underReview: number;
    quoted: number;
    declined: number;
  };
  avgRiskScore: number;
  avgPremium: number;
  totalPremium: number;
  submissionsByIndustry: Record<string, number>;
  submissionsByMonth: Record<string, number>;
}

const DASHBOARD_URL = '/submissions/stats/dashboard';

export const DashboardService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      const response = await axiosInstance.get(DASHBOARD_URL);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard statistics');
    }
  }
}; 