"use client";

import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "#f3f4f6",
      },
      ticks: {
        callback: (value: number) => `$${value.toLocaleString()}`,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

interface SpendingChartProps {
  data: {
    labels: string[];
    amounts: number[];
  };
}

export function SpendingChart({ data }: SpendingChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.amounts,
        backgroundColor: "#10b981",
        borderRadius: 6,
        maxBarThickness: 40,
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
}
