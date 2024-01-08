import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS, ArcElement, Tooltip, Title,
    Filler,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Title,
    Filler,
    Legend);
    const options = {
        responsive: true,
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
                text: 'AREA DE SWAP',
                color: 'rgba(255, 255, 255, 0.8)',
                font: {
                    size: 16,
                    weight: 500
                }
            },
        },
    };
    
const base_ = {
    labels: ['Libre', 'Usado'],
    datasets: [
        {
            label: 'GB',
            data: [12, 19],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export function SwapPie({ newArray = [], newLabels = [] }) {
    const [base, setBase] = useState(base_);

    useEffect(() => {
        if (newArray.length > 0) {
            setBase((prevData) => {
                const newData = JSON.parse(JSON.stringify(prevData));
                newData.datasets[0].data = newArray; // Fix here
                return newData;
            });
        }
    }, [newArray]);

    return (
        <div className='bg-slate-900 rounded-3xl sm:p-10'>
            <Pie  options={options} data={base} />
        </div>
    );
}
