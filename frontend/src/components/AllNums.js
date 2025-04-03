import AllNumsGraph from "./AllNumsGraph";

import "./AllNums.css";

function AllNums() {
    return (
        <div className="all-nums-container">
            <h2 className="section-title">All Numbers Analysis</h2>
            <AllNumsGraph />
            <p className="graphInfo">
                This graph shows the frequency of all numbers (1-53) in the Florida Lotto.
                The x-axis represents each possible 
                number, while the y-axis shows how many times that number has appeared in all draws. 
                Hover over data points to see the exact values.
            </p>
        </div>
    )
}

export default AllNums;