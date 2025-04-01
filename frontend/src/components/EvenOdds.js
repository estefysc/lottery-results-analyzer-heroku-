import PercentageGraph from "./PercentageGraph";

import "./EvenOdds.css";

function EvenOdds() {
    return (
        <div>
            <PercentageGraph />
            <p className="graphInfo">
                The graph above shows the amount of times, as a percentage, that one even number, or sets of them, have appeared in each draw.
                In all the draws, a set that includes three even numbers and three odd numbers appears more often. Move the cursor
                over the graph to see the exact appearance percentage of each set. The y-axis represents the percentage of times that a set has appeared and
                the x-axis represents a set containing one even number, two even numbers, three even numbers, etc.
            </p>
        </div>
    )
}

export default EvenOdds;
