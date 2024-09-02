"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

export default function BodyScan() {
  const includedFeatures = [
    "Private forum access",
    "Member resources",
    "Entry to annual conference",
    "Official member t-shirt",
  ];

  const data = {
    labels: ["Essential fat", "Normal fat", "Unbeneficial fat", "Lean mass"],
    datasets: [
      {
        data: [9.5, 26.5, 22.4, 131.1],
        backgroundColor: ["#3B82F6", "#FBBF24", "#EF4444", "#10B981"],
        borderColor: ["#FFFFFF"],
        borderWidth: 2,
      },
    ],
  };

  // Options for the donut chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
        position: "right",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="relative col-span-1 flex h-96 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md md:col-span-2">
      <div className="mx-auto max-w-lg text-center">
        <div className="grid grid-cols-2 gap-4">
          <div className="items-left">
            <p className="text-sm text-gray-500">Aug 18, 2024</p>
            <p className="text-2xl font-bold">189.6 lbs</p>
          </div>
          <div className="items-right">
            <Doughnut data={data} options={options} />
          </div>
        </div>

        <div className="mt-4 h-px flex-auto bg-gray-100" />

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="items-left flex flex-col">
            <p className="text-sm text-gray-500">Essential fat</p>
            <p className="text-xl font-bold">5.0%</p>
            <p className="text-sm text-gray-500">9.5 lbs</p>
          </div>
          <div className="items-left flex flex-col">
            <p className="text-sm text-gray-500">Normal fat</p>
            <p className="text-xl font-bold">14.0%</p>
            <p className="text-sm text-gray-500">26.5 lbs</p>
          </div>
          <div className="items-left flex flex-col">
            <p className="text-sm text-gray-500">Unbeneficial fat</p>
            <p className="text-xl font-bold">11.8%</p>
            <p className="text-sm text-gray-500">22.4 lbs</p>
          </div>
          <div className="items-left flex flex-col">
            <p className="text-sm text-gray-500">Lean mass</p>
            <p className="text-xl font-bold">69.2%</p>
            <p className="text-sm text-gray-500">131.1 lbs</p>
          </div>
        </div>
      </div>
    </div>
  );
}

ChartJS.register(ArcElement, Tooltip, Legend);
