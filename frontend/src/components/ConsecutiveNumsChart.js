import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./ConsecutiveNumsChart.css";

function ConsecutiveNumsChart({ data }) {
    // Transform data for the chart
    const chartData = [
        { name: "No Consecutives", value: data.noConsecutives },
        { name: "Two Consecutive", value: data.twoConsecutive },
        { name: "Three Consecutive", value: data.threeConsecutive },
        { name: "Four Consecutive", value: data.fourConsecutive },
        { name: "Five Consecutive", value: data.fiveConsecutive },
        { name: "Six Consecutive", value: data.sixConsecutive }
    ];

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                    <XAxis 
                        dataKey="name" 
                        stroke="#C5C6C7"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                    />
                    <YAxis stroke="#C5C6C7" />
                    <Tooltip 
                        formatter={(value) => [`${value} plays`, "Frequency"]}
                        contentStyle={{ backgroundColor: "#1F2833", color: "#C5C6C7", border: "1px solid #45A29E" }}
                    />
                    <Bar dataKey="value" fill="#FF8E71" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ConsecutiveNumsChart; 