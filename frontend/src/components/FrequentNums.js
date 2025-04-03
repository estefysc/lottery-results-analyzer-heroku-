import React, {useEffect, useState} from "react";
import axios from "axios";

import "./FrequentNums.css";

function FrequentNums() {
    const [numData, setNumData] = useState([]);
    const [plays, setPlays] = useState(0);

    async function getMostFreqNumbers() {
        const response = await axios.get("/api/frequentNums", {crossdomain: true})
        
        setNumData(response.data.freqNums.sixMostRepeatedNumbers);
        setPlays(response.data.freqNums.totalPlays);
    }

    useEffect(() => {
        console.log("From first useEffect");
        getMostFreqNumbers().catch(error => console.error(error));
    }, []);

    const listItems = numData.map(
        ([number, appearanceTimes]) => {
            return <ul key={number}>{number} appearing {appearanceTimes} times.</ul>
        });

    return (
        <div className='main-container'>
            <h2 className="section-title">Most Frequent Numbers Analysis</h2>
            <div className='info-container'>
                <p className='info-text'>
                    The Florida Lotto, played since 1988, lets you choose 6 numbers between 1 and 53. So far, there
                    have been a total of <span style={{ color: '#C5C6C7' }}>{plays}</span> draws.
                    The six most frequent numbers and their frequencies are displayed to the right.
                </p>   
            </div>

            <div className='list-container'>
                <ul className='number-text'>
                    {listItems}
                </ul> 
            </div>
        </div>
    )
}

export default FrequentNums;