import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    scales: {
        x: {
            ticks: {
                color: 'rgba(255, 255, 255, 0.8)' 
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.2)' 
            }
        },
        y: {
            ticks: {
                color: 'rgba(255, 255, 255, 0.8)' 
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.2)' 
            }
        }
    },
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: 'white'
              }
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
            color: 'white',
        },
        gridLines: {
            color: 'rgba(255, 255, 255, 0.2)'
          },
    },
};

const base_ = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [2],
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            
        }
    ],
};

export default function VerticalBar({ newArray = [], newLabels = []  }) {
    const [base, setBase] = useState(base_)
    {
        /*
        const updateData = () => {
            setInterval(() => {
                getNewData();
            }, 5000);
        }
        */
    }
    useEffect(() => {
        if (newArray.length > 0) {
            setBase((prevData) => {
                const newData = JSON.parse(JSON.stringify(prevData));
                newData.datasets[0].data = newArray;
                return newData;
            });
        }
    }, [newArray]);


    
    useEffect(() => {
        if (newLabels.length > 0) {
            setBase((prevData) => {
                const newData = JSON.parse(JSON.stringify(prevData));
                newData.labels = newLabels;
                return newData;
            });
        }
    }, [newLabels]);

    return (
        <div className='bg-slate-900 rounded-3xl p-4'>
            <Bar options={options} data={base} />
        </div>
    );
}
