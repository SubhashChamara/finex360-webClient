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
import { getTopAgents } from '@/services/business';
import { TopAgent } from '@/types'; // Import the interface

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

const TopAgentsChart = () => {
  const [chartData, setChartData] = useState<ChartDataState>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data: TopAgent[] = await getTopAgents(5); // Apply the type
        
        const labels = data.map(agent => agent.agentName);
        const collections = data.map(agent => agent.totalCollection);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Net Collections',
              data: collections,
              backgroundColor: 'rgba(75, 192, 192, 0.8)',
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch top agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Top Agents by Net Collections',
      },
    },
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-gray-700 rounded"></div>;
  }

  return <Bar options={options} data={chartData} />;
};

export default TopAgentsChart;