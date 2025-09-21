export interface DashboardSummaryResponse {
  totalInvestment: number;
  monthlyDisbursement: number | null;
  monthlyCollection: number;
  totalOutstanding: number;
  overdueLoanCount: number;
  defaultRate: number;
}

export interface DailyCollectionsResponse {
  [key: string]: number; // e.g., "6": 3800
}

export interface DisbursementsCollectionsResponse {
  year: number;
  monthlyDisbursements: { [key: string]: number };
  monthlyCollections: { [key: string]: number };
  totalDisbursement: number;
  totalCollection: number;
}

export interface TopAgent {
  agentId: string;
  agentName: string;
  totalCollection: number;
}

export interface OverdueLoan {
  customerName: string;
  agentName: string;
  loanNumber: string | null;
  installmentAmount: number;
  daysLate: number;
  arrears: number;
  status: string;
}

export interface AgentPerformance {
  agentName: string;
  customerCount: number;
  disbursedAmount: number;
  collectedAmount: number;
  outstandingAmount: number;
  overdueCount: number;
  recoveryRate: number;
}

export interface PortfolioStatus {
  count: number;
  status: string;
}
