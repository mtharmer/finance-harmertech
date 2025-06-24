import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useRef } from "react";

export default function AmortizationChart({labels, data, dataLabel, colors}) {
  Chart.register(ChartDataLabels);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const chartData = {
    labels: labels,
    datasets: data
  };

  console.log(chartData);

  if (colors) {
    chartData.datasets[0].backgroundColor = colors;
  }

  const options = {
    tooltips: {
      enabled: false
    },
    plugins: {
      datalabels: {
        formatter: () => ''
      }
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: options,
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    }
  }, [chartData, options]);
  return (
    <canvas ref={chartRef}></canvas>
  )
}