import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
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
                color: 'rgba(255, 255, 255, 0.8)', 
                font: {
                    size: 12,
                    weight: 500
                }
            }
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
            color: 'rgba(255, 255, 255, 0.8)'
        },
    },
};

const base_ = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.5,
            fill: false,
        },
        {
            label: 'Dataset 2',
            data: [],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0,
            fill: true,
        },
        {
            label: 'Dataset 3',
            data: [],
            borderColor: 'rgb(63, 16, 78)',
            backgroundColor: 'rgba(63, 16, 78, 0.5)',
            tension: 0,
            fill: false,
            borderDash: [7,5],
        },
    ],
};

export default function Lines({ newArray = [], newLabels = [] }) {
    const [base, setBase] = useState(base_);

    useEffect(() => {
        if (newArray.length > 0) {
            setBase((prevData) => {
                const newData = JSON.parse(JSON.stringify(prevData));
                newData.datasets = newData.datasets.map((dataset, index) => ({
                    ...dataset,
                    data: newArray[index],
                }));
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
            <Line options={options} data={base} />
        </div>
    );
}
