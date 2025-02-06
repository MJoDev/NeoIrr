// components/RealtimeChart.tsx
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

interface ChartProps {
  data: number[];
  timestamps: string[];
  isTestComplete: boolean;
}

const RealtimeChart = ({ data, timestamps, isTestComplete }: ChartProps) => {
  return (
    <div className="w-full h-96">
      <Line
        data={{
          labels: timestamps,
          datasets: [{
            label: 'Value',
            data: data,
            borderColor: '#3b82f6',
            tension: 0.4,
            pointRadius: 3,
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          animation: isTestComplete ? {} : { duration: 0 },
          scales: {
            y: { beginAtZero: true },
            x: { display: true, title: { display: true, text: 'Tiempo' } }
          }
        }}
      />
    </div>
  );
};

export default RealtimeChart;