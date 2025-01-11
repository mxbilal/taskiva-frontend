"use client";

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
  },
  cutout: '70%',
};

interface CategoryChartProps {
  data: {
    labels: string[];
    amounts: number[];
  };
}

export function CategoryChart({ data }: CategoryChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.amounts,
        backgroundColor: [
          '#10b981',
          '#3b82f6',
          '#8b5cf6',
          '#ec4899',
          '#f59e0b',
        ],
        borderWidth: 0,
      },
    ],
  };

  return <Doughnut options={options} data={chartData} />;
}