import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data, title = "Transaction Activity", height = "240px" }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy previous chart instance to prevent memory leaks
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (!chartRef.current || !data) return;

    const ctx = chartRef.current.getContext('2d');
    
    // Create gradient for area under the line
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(102, 252, 241, 0.5)'); // Cta color with transparency
    gradient.addColorStop(1, 'rgba(102, 252, 241, 0.0)'); // Transparent at bottom

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: title,
          data: data.values,
          fill: true,
          backgroundColor: gradient,
          borderColor: '#66FCF1', // CTA color
          borderWidth: 2,
          tension: 0.4, // Makes the line curve slightly
          pointBackgroundColor: '#66FCF1',
          pointBorderColor: '#1F2833', // Background color
          pointRadius: 4,
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: '#333e52',
            titleColor: '#fff',
            bodyColor: '#66FCF1',
            borderColor: '#66FCF1',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              title: function(tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function(context) {
                return `${title}: ${context.parsed.y}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              color: '#c5c6c7',
              font: {
                size: 10
              }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.05)',
              drawBorder: false
            },
            ticks: {
              color: '#c5c6c7',
              font: {
                size: 10
              },
              stepSize: Math.ceil(Math.max(...data.values) / 5)
            }
          }
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

export default LineChart;