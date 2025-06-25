import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useMemo, useRef } from "react";

export default function PieChart({labels, dataLabel, data, colors = null}) {
  Chart.register(ChartDataLabels);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const chartData = useMemo(() => {
    return {
      labels: labels,
      datasets: [{
        label: dataLabel,
        data: data
      }]
    }
  }, [labels, data, dataLabel]);

  if (colors) {
    chartData.datasets[0].backgroundColor = colors;
  }

  const options = useMemo(() => {
    return {
      tooltips: {
        enabled: false
      },
      plugins: {
        datalabels: {
          formatter: (value, categories) => {
            let sum = 0;
            let dataArr = categories.chart.data.datasets[0].data;
            dataArr.map(data => {
              sum += data;
            });
            let percentage = (value*100 / sum).toFixed(2)+"%";
            return percentage;
          },
          color: '#fff',
        }
      }
    }
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
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
  );
}
