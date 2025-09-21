'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getDisbursementsVsCollections } from '@/services/business';
import { DisbursementsCollectionsResponse } from '@/types'; // Import the interface

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDataState {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

const DisbursementsCollectionsChart = () => {
  const [chartData, setChartData] = useState<ChartDataState>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const year = new Date().getFullYear();
        const data: DisbursementsCollectionsResponse = await getDisbursementsVsCollections(year);
        
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const labels = monthNames;
        
        const monthlyDisbursements = Array(12).fill(0);
        for (const month in data.monthlyDisbursements) {
          monthlyDisbursements[parseInt(month) - 1] = data.monthlyDisbursements[month];
        }

        const monthlyCollections = Array(12).fill(0);
        for (const month in data.monthlyCollections) {
          monthlyCollections[parseInt(month) - 1] = data.monthlyCollections[month];
        }

        setChartData({
          labels,
          datasets: [
            {
              label: 'Disbursed',
              data: monthlyDisbursements,
              backgroundColor: 'rgba(139, 92, 246, 0.8)',
            },
            {
              label: 'Collected',
              data: monthlyCollections,
              backgroundColor: 'rgba(75, 192, 192, 0.8)',
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch disbursements vs collections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Disbursements vs Collections (Monthly)',
      },
    },
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-gray-700 rounded"></div>;
  }

  return <Bar options={options} data={chartData} />;
};

export default DisbursementsCollectionsChart;