import React, {useEffect, useState}  from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import axios from "axios";
import "./PercentageGraph.css";

function PercentageGraph() {
    const [data, setData] = useState("");

    function getData() {
        axios.get("https://lottery-analyzer.herokuapp.com/evenOdd", {crossdomain: true})
            .then(response => {
                setData(response.data);
            });
    }

    useEffect(() => getData(), []);

    const graphInfo = [
        {
            name: 'Zero Even Numbers',
            percentage: `${Math.round(data.percentZeroEven * 10) / 10}`,
        },
        {
            name: 'One Even Number',
            percentage: `${Math.round(data.percentOneEven * 10) / 10}`,
        },
        {
            name: 'Two Even Numbers',
            percentage: `${Math.round(data.percentTwoEven * 10) / 10}`,
        },
        {
            name: 'Three Even Numbers',
            percentage: `${Math.round(data.percentThreeEven * 10) / 10}`,
        },
        {
            name: 'Four Even Numbers',
            percentage: `${Math.round(data.percentFourEven * 10) / 10}`,
        },
        {
            name: 'Five Even Numbers',
            percentage: `${Math.round(data.percentFiveEven * 10) / 10}`,
        },
        {
            name: 'Six Even Numbers',
            percentage: `${Math.round(data.percentSixEven * 10) / 10}`,
        },
    ];

    return (
        <div className="graphContainer">
            <ResponsiveContainer width="100%" aspect={4}>
                <LineChart
                    width={500}
                    height={300}
                    data={graphInfo}
                    margin={{
                        top: 0,
                        right: 150,
                        left: 150,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="name" stroke="#C5C6C7"/>
                    <YAxis type="number" domain={[0, 50]} stroke="#C5C6C7"/>
                    <Tooltip />
                    <Legend align={"left"}/>
                    <Line type="monotone" dataKey="percentage" stroke="#45A29E" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PercentageGraph;
