import React, {useEffect, useState} from "react";
import axios from "axios";
import {Pie, PieChart, ResponsiveContainer} from 'recharts';

import "./FrequentNums.css";

function FrequentNums() {
    const [numData, setNumData] = useState([]);
    const [plays, setPlays] = useState(0);
    // debugger;

    // Original code:
    // function getMostFreqNumbers() {
    //     axios.get("http://localhost:5000/frequentNums", {crossdomain: true})
    //         .then(response => {
    //             // setText(response.data.freqNums.map(
    //             //     number => number.toString()
    //             // ).join(", "));
    //             setNumData(response.data.freqNums);
    //         }).catch(error => console.error(error));
    //
    //     console.log("This is numData");
    //     console.log(numData);
    // }

    async function getMostFreqNumbers() {
        const response = await axios.get("https://lottery-analyzer.herokuapp.com/frequentNums", {crossdomain: true})
        // const newData = response.data.freqNums.sixMostRepeatedNumbers;

        setNumData(response.data.freqNums.sixMostRepeatedNumbers);
        setPlays(response.data.freqNums.totalPlays);
    }

    useEffect(() => {
        console.log("From first useEffect");
        getMostFreqNumbers().catch(error => console.error(error));
    }, []);

    // useEffect(() => {
    //     console.log("From second useEffect -> Before mapping to data");
    //     // map the data to the pie chart
    //     data = numData.map(
    //         ([a, b]) => {
    //             return {name: a.toString(), value: b}
    //         }
    //     );
    //     console.log("This is numData");
    //     console.log(numData);
    //     console.log("This is data");
    //     console.log(data);
    // }, [numData]);

    const data = numData.map(
            ([number, appearanceTimes]) => {
                return {name: number.toString(), value: appearanceTimes}
            }
    );

    // This code also works to map the data to the pie chart.
    // function getData() {
    //     return numData.map(
    //         ([a, b]) => {
    //             // console.log("This is a");
    //             // console.log(a);
    //             // console.log("This is b");
    //             // console.log(b);
    //             return {name: a.toString(), value: b}
    //         }
    //     );
    // }

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="#C5C6C7" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {data[index].name}
            </text>
        );
    };

    // useEffect(() => {
    //     // getMostFreqNumbers();
    //
    //     const getMostFreqNumbers = async () => {
    //         const response = await axios.get("http://localhost:5000/frequentNums", {crossdomain: true});
    //         const newData = response.data.freqNums;
    //         setNumData(newData);
    //         console.log("This is numData inside first useEffect");
    //         console.log(numData);
    //     }
    //     getMostFreqNumbers().catch(console.error);
    // }, []);
    //
    // useEffect(() => {
    //     const print = () => {
    //         console.log("This is numData inside second useEffect");
    //         console.log(numData);
    //     }
    //     print();
    // }, [numData]);

    // console.log("This is numData outside useEffects");
    console.log(numData);
    console.log(data);

    const listItems = numData.map(
        ([number, appearanceTimes]) => {
            return <ul key={number}>{number} appearing {appearanceTimes} times.</ul>
        });

    return (
        <div className='main-container'>
            <div className='info-container'>
                <p className='info-text'>
                    The Florida Lotto, played since 1988, lets you choose 6 numbers between 1 and 53. So far, there
                    have been a total of {plays} draws.
                    The six most frequent numbers and their frequencies appear below:

                    <div className='list-container'>
                        {listItems}
                    </div>
                </p>
            </div>

            <div className='number-container'>
                <ResponsiveContainer width="100%" aspect={3}>
                    <PieChart>
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={data}
                            cx="29%"
                            cy="100%"
                            outerRadius={80}
                            fill="#45A29E"
                            label={renderCustomizedLabel}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default FrequentNums;