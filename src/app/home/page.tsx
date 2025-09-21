'use client';

import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { getDashboardSummary } from '@/services/business';
import DailyCollectionsChart from '@/components/charts/DailyCollectionsChart';
import PortfolioStatusChart from '@/components/charts/PortfolioStatusChart';
import DisbursementsCollectionsChart from '@/components/charts/DisbursementsCollectionsChart';
import TopAgentsChart from '@/components/charts/TopAgentsChart';
import AgentPerformanceTable from '@/components/tables/AgentPerformanceTable';
import OverdueLoansTable from '@/components/tables/OverdueLoansTable';
import { DashboardSummaryResponse } from '@/types'; // Import the interface
import './print.css';

interface StatCardProps {
  title: string;
  value: string | number;
  loading: boolean;
}

const StatCard = ({ title, value, loading }: StatCardProps) => (
  <div className="bg-gray-800 p-4 rounded-lg text-white">
    <p className="text-sm text-gray-400">{title}</p>
    {loading ? (
      <div className="animate-pulse h-8 bg-gray-700 rounded mt-2"></div>
    ) : (
      <p className="text-2xl font-bold">{value}</p>
    )}
  </div>
);

const HomePage: NextPage = () => {
  const [summaryData, setSummaryData] = useState<DashboardSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardSummary();
        setSummaryData(data);
      } catch (error) {
        console.error('Failed to fetch dashboard summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 printable-area">
      <Head>
        <title>Home - Finex360</title>
        <meta name="description" content="Welcome to Finex360" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-8 flex flex-wrap justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">End-of-Month Summary</h1>
          <p className="text-gray-400">For August 2025</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 sm:mt-0 no-print">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base">
            Loan Supply - Summary
          </button>
          <button
            onClick={handlePrint}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-sm sm:text-base"
          >
            Print / Save PDF
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard title="OWNER CAPITAL" value={summaryData ? `LKR ${summaryData.totalInvestment.toLocaleString()}` : '...'} loading={loading} />
        <StatCard title="DISBURSED (MONTH)" value={summaryData ? `LKR ${summaryData.monthlyDisbursement?.toLocaleString() || '0'}` : '...'} loading={loading} />
        <StatCard title="COLLECTIONS (MONTH)" value={summaryData ? `LKR ${summaryData.monthlyCollection.toLocaleString()}` : '...'} loading={loading} />
        <StatCard title="OUTSTANDING" value={summaryData ? `LKR ${summaryData.totalOutstanding.toLocaleString()}` : '...'} loading={loading} />
        <StatCard title="OVERDUE LOANS" value={summaryData?.overdueLoanCount || '...'} loading={loading} />
        <StatCard title="DEFAULT RATE" value={summaryData ? `${summaryData.defaultRate}%` : '...'} loading={loading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <DailyCollectionsChart />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <PortfolioStatusChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <DisbursementsCollectionsChart />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <TopAgentsChart />
        </div>
      </div>

      <div className="mb-8 overflow-x-auto">
        <AgentPerformanceTable />
      </div>

      <div className="overflow-x-auto">
        <OverdueLoansTable />
      </div>
    </div>
  );
};

export default HomePage;