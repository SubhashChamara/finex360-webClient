import apiClient from './apiClient';

export const getDashboardSummary = async () => {
  try {
    const response = await apiClient.get('/dashboard/eom/summary');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dashboard summary:', error);
    throw error;
  }
};

export const getDailyCollections = async () => {
  try {
    const response = await apiClient.get('/dashboard/eom/daily-collection');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch daily collections:', error);
    throw error;
  }
};

export const getDisbursementsVsCollections = async (year: number) => {
  try {
    const response = await apiClient.get(`/dashboard/eom/collection-disbursement/${year}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch disbursements vs collections:', error);
    throw error;
  }
};

export const getTopAgents = async (limit: number) => {
  try {
    const response = await apiClient.get('/dashboard/eom/top-agent', {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch top agents:', error);
    throw error;
  }
};

export const getOverdueLoans = async () => {
  try {
    const response = await apiClient.get('/dashboard/eom/overdue');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch overdue loans:', error);
    throw error;
  }
};

export const getAgentPerformance = async () => {
  try {
    const response = await apiClient.get('/dashboard/eom/agent-loan-stats');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch agent performance:', error);
    throw error;
  }
};

export const getPortfolioStatus = async () => {
  try {
    const response = await apiClient.get('/dashboard/eom/loan-portfolio-status');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch portfolio status:', error);
    throw error;
  }
};
