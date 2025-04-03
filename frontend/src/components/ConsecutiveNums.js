import React, { useEffect, useState } from "react";
import axios from "axios";
import ConsecutiveNumsChart from "./ConsecutiveNumsChart";
import "./ConsecutiveNums.css";

function ConsecutiveNums() {
    const [consecutiveData, setConsecutiveData] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getConsecutiveData() {
        try {
            const response = await axios.get("/api/consecutiveNums", { crossdomain: true });
            setConsecutiveData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching consecutive numbers data:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getConsecutiveData();
        console.log(consecutiveData);
    }, []);

    if (loading) {
        return <div className="loading">Loading consecutive numbers analysis...</div>;
    }

    return (
        <div className="consecutive-container">
            <h2 className="section-title">Consecutive Numbers Analysis</h2>
            
            {consecutiveData && (
                <>
                    <div className="stats-section">
                        <h3>Longest Consecutive Sequence</h3>
                        <ConsecutiveNumsChart data={consecutiveData.longestSequenceStats} />
                        <p className="chart-description">
                            This chart shows how many lottery draws contain consecutive numbers sequences of different lengths.
                            For example, the "Four Consecutive" bar shows draws with sequences like 7-8-9-10.
                        </p>
                    </div>
                    
                    <div className="stats-section">
                        <h3>Multiple Sequences Distribution</h3>
                        <div className="sequence-stats">
                            <p>Plays with one sequence: <span className="highlight">{consecutiveData.multipleSequencesStats.oneSequence}</span></p>
                            <p>Plays with two sequences: <span className="highlight">{consecutiveData.multipleSequencesStats.twoSequences}</span></p>
                            <p>Plays with three sequences: <span className="highlight">{consecutiveData.multipleSequencesStats.threeSequences}</span></p>
                        </div>
                    </div>
                    
                    <div className="stats-section">
                        <h3>Common Sequence Combinations</h3>
                        <div className="combinations-container">
                            {Object.entries(consecutiveData.multipleSequencesStats.sequenceCombinations)
                                .sort((a, b) => b[1] - a[1])
                                .slice(0, 8)
                                .map(([combination, count]) => (
                                    <div key={combination} className="combination-item">
                                        <div className="combination-label">
                                            {formatCombination(combination)}
                                        </div>
                                        <div className="combination-count">{count} plays</div>
                                    </div>
                                ))
                            }
                        </div>
                        <p className="chart-description">
                            This shows the most common combinations of consecutive number sequences.
                            For example, "2-3" means a play with one pair and one triplet of consecutive numbers.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

// Helper function to format combinations for display
function formatCombination(combination) {
    if (!combination.includes("-")) {
        const length = parseInt(combination);
        return `One sequence of ${length} numbers`;
    }
    
    const parts = combination.split("-").map(Number);
    return parts.map(length => 
        length === 2 ? "pair" : 
        length === 3 ? "triplet" : 
        `${length} consecutive`
    ).join(" + ");
}

export default ConsecutiveNums; 