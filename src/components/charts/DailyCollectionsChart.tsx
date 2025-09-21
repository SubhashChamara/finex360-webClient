'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getDailyCollections } from '@/services/business';
import { DailyCollectionsResponse } from '@/types'; // Import the interface

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDataState {
  labels: (string | number)[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    borderWidth?: number;
  }[];
}

const DailyCollectionsChart = () => {
  const [chartData, setChartData] = useState<ChartDataState>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data: DailyCollectionsResponse = await getDailyCollections();
        
        const daysInMonth = 31; // Assuming 31 days for now
        const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const collections = labels.map(day => data[day] || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Daily Collections',
              data: collections,
              borderColor: 'rgb(139, 92, 246)',
              backgroundColor: 'rgba(139, 92, 246, 0.5)',
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch daily collections:', error);
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
        display: false,
      },
      title: {
        display: true,
        text: 'Daily Collections (This Month)',
      },
    },
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-gray-700 rounded"></div>;
  }

  return <Line options={options} data={chartData} />;
};

export default DailyCollectionsChart;