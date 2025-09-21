'use client';

import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getPortfolioStatus } from '@/services/business';
import { PortfolioStatus } from '@/types'; // Import the interface

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartDataState {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

const PortfolioStatusChart = () => {
  const [chartData, setChartData] = useState<ChartDataState>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  const generateColors = (numColors: number) => { // Added type annotation
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const hue = (i * 360) / numColors;
      colors.push(`hsla(${hue}, 70%, 50%, 0.8)`);
    }
    return colors;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data: PortfolioStatus[] = await getPortfolioStatus();
        
        const labels = data.map(item => item.status);
        const counts = data.map(item => item.count);
        const backgroundColors = generateColors(data.length);
        const borderColors = backgroundColors.map(color => color.replace('0.8', '1'));

        setChartData({
          labels,
          datasets: [
            {
              label: 'Portfolio Status',
              data: counts,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch portfolio status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '55%',
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Status',
      },
    },
  };

  if (loading) {
    return <div className="animate-pulse h-80 bg-gray-700 rounded"></div>;
  }

  return (
    <div className="h-80">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default PortfolioStatusChart;