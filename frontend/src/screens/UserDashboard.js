import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Inventory Levels',
      data: [30, 45, 28, 50, 60, 70, 80],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        borderColor: '#e5e5e5',
      },
    },
  },
};

function UserDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-xl font-medium mb-2">Inventory Overview</h3>
          <Line data={data} options={options} />
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-xl font-medium mb-2">Recent Transactions</h3>
          <ul>
            <li className="py-2 border-b">Transaction 1</li>
            <li className="py-2 border-b">Transaction 2</li>
            <li className="py-2 border-b">Transaction 3</li>
            <li className="py-2 border-b">Transaction 4</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
