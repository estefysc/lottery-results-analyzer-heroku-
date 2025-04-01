import React, {useEffect, useState}  from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import axios from "axios";
import "./AllNumsGraph.css";

function AllNumsGraph() {
    const [data, setData] = useState("");

    function getData() {
        axios.get("https://lottery-analyzer.herokuapp.com/api/allNums", {crossdomain: true})
            .then(response => {
                setData(response.data);
            });
    }

    useEffect(() => getData(), []);

    const graphInfo = Array.from({ length: 53 }, (_, index) => {
        const num = index + 1;
        return {
            name: num.toString(),
            frequency: data && data.numbers ? data.numbers[num] || 0 : 0
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
                    <XAxis 
                        dataKey="name" 
                        stroke="#C5C6C7"
                        interval={0} // Force display of all labels
                    />
                    <YAxis type="number" domain={['auto', 'auto']} stroke="#C5C6C7"/>
                    <Tooltip />
                    <Legend align={"left"}/>
                    <Line type="monotone" dataKey="frequency" stroke="#FF8E71" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default AllNumsGraph;