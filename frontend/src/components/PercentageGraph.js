import React, {useEffect, useState}  from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import axios from "axios";
import "./PercentageGraph.css";

function PercentageGraph() {
    const [data, setData] = useState("");

    function getData() {
        axios.get("https://lottery-analyzer.herokuapp.com/api/evenOdd", {crossdomain: true})
            .then(response => {
                setData(response.data);
            });
    }

    useEffect(() => getData(), []);

    const graphInfo = Array.from({ length: 7 }, (_, index) => {
        const propertyName = `percent${['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'][index]}Even`;
        const displayName = `${['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'][index]} Even ${index === 1 ? 'Number' : 'Numbers'}`;
        
        return {
            name: displayName,
            percentage: data && data[propertyName] ? `${Math.round(data[propertyName] * 10) / 10}` : '0',
        };
    });

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
                    <XAxis dataKey="name" stroke="#C5C6C7"/>
                    <YAxis type="number" domain={[0, 50]} stroke="#C5C6C7"/>
                    <Tooltip />
                    <Legend align={"left"}/>
                    <Line type="monotone" dataKey="percentage" stroke="#FF8E71" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PercentageGraph;
