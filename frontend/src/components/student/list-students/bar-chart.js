import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
export const BarChart = () => {
    const subjects = useSelector((state) => state?.student?.subjects);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    useEffect(() => {
        const subjectName = subjects?.subjects?.map(
            (subject) => subject?.subject
        );
        const subjectPer = subjects?.subjects?.map(
            (subject) => subject?.averagePercentageScore
        );
        const chartCanvas = chartRef.current;

        if (chartCanvas) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            chartInstanceRef.current = new Chart(chartCanvas, {
                type: "bar",
                data: {
                    labels: subjectName,
                    datasets: [
                        {
                            label: "Student Analaysis",
                            data: subjectPer,
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Score",
                            },
                        },
                    },
                },
            });
        }
    }, [subjects]);
    return (
        <div>
            <div >
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    )
}
export default BarChart