import axiosInstance from '../axios';

export interface Submission {
  id: number;
  companyName: string;
  industry: string;
  location: string;
  revenue: number;
  pastClaimsCount: number;
  coverageAmount: number;
  riskScore: number | null;
  premium: number | null;
  status: string;
  createdAt: string;
}

export interface CreateSubmissionDto {
  id:number;
  companyName: string;
  industry: string;
  location: string;
  revenue: number;
  pastClaimsCount: number;
  coverageAmount: number;
}

export interface UpdateSubmissionDto {
  companyName?: string;
  industry?: string;
  location?: string;
  revenue?: number;
  pastClaimsCount?: number;
  coverageAmount?: number;
  status?: string;
}

const SUBMISSIONS_URL = '/submissions';

export const SubmissionsService = {
 
  getAllSubmissions: async (): Promise<Submission[]> => {
    try {
      const response = await axiosInstance.get(SUBMISSIONS_URL);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch submissions');
    }
  },

  getSubmissionById: async (id: number): Promise<Submission> => {
    try {
      const response = await axiosInstance.get(`${SUBMISSIONS_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch submission');
    }
  },


  createSubmission: async (data: CreateSubmissionDto): Promise<Submission> => {
    try {
      const response = await axiosInstance.post(SUBMISSIONS_URL, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create submission');
    }
  },


  updateSubmission: async (id: number, data: UpdateSubmissionDto): Promise<Submission> => {
    try {
      const response = await axiosInstance.patch(`${SUBMISSIONS_URL}/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update submission');
    }
  },

  
  deleteSubmission: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${SUBMISSIONS_URL}/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete submission');
    }
  }
};