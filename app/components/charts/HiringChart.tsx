"use client";

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
  },
};

interface HiringChartProps {
  data: {
    labels: string[];
    amounts: number[];
  };
}

export function HiringChart({ data }: HiringChartProps) {
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

  return <Pie options={options} data={chartData} />;
}