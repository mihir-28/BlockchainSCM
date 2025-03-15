import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data, title = "Distribution", height = "240px" }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (!chartRef.current || !data) return;

    const ctx = chartRef.current.getContext('2d');
    
    // Define colors for your pie chart
    const colors = [
      '#66FCF1', // CTA color
      '#45A29E', // Darker variant
      '#3500D3', // Purple
      '#0B0C10', // Very dark
      '#4FBDBA', // Teal
    ];
    
    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.values,
          backgroundColor: colors,
          borderColor: '#1F2833',
          borderWidth: 2,
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#c5c6c7',
              font: {
                size: 10
              },
              padding: 15,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: '#333e52',
            titleColor: '#fff',
            bodyColor: '#66FCF1',
            borderColor: '#66FCF1',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: function(context) {
                const label = context.label;
                const value = context.raw;
                const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${percentage}% (${value})`;
              }
            }
          }
        },
        cutout: '40%',
        animation: {
          animateScale: true
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title]);

  return (
    <div className="w-full" style={{ height }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PieChart;