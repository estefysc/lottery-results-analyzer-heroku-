import {resultsArray} from "./parser.js";

// This function runs within the evenAndOddPercentageCalculator() function and is used to calculate the amount of times
// even and odd numbers appear.
function evenAndOddCalculator() {
    const numbersInOnePlay = 6;

    let totalEvenNumbers = 0;
    let totalOddNumbers = 0;
    let zeroEvenInSet = 0;
    let oneEvenInSet = 0;
    let twoEvenInSet = 0;
    let threeEvenInSet = 0;
    let fourEvenInSet = 0;
    let fiveEvenInSet = 0;
    let sixEvenInSet = 0;

    let numbersMap = new Map();

    resultsArray.forEach((play) => {
        let evenCounter = 0;
    
        play.forEach((number) => {
            // Check if the number is even.
            if (number % 2 === 0) {
                evenCounter++;
            }
    
            // Populate the map with the number and its count.
            numbersMap.set(number, (numbersMap.get(number) || 0) + 1);
        });

        totalEvenNumbers += evenCounter;
        totalOddNumbers += (numbersInOnePlay - evenCounter);

        switch (evenCounter) {
            case 1: oneEvenInSet++; break;
            case 2: twoEvenInSet++; break;
            case 3: threeEvenInSet++; break;
            case 4: fourEvenInSet++; break;
            case 5: fiveEvenInSet++; break;
            case 6: sixEvenInSet++; break;
            default: zeroEvenInSet++; break;
        }
    });

    return {
        totalEvenNumbers, totalOddNumbers, zeroEvenInSet, oneEvenInSet,
        twoEvenInSet, threeEvenInSet, fourEvenInSet, fiveEvenInSet, sixEvenInSet,
        numbersMap
    }
} // End of evenAndOddCalculator function.

function evenAndOddPercentageCalculator() {
    let numbersData = evenAndOddCalculator();
    
    let amountOfSets = resultsArray.length;

    let averageEven = numbersData.totalEvenNumbers / amountOfSets;
    let averageOdd = numbersData.totalOddNumbers / amountOfSets;

    let percentZeroEven = (numbersData.zeroEvenInSet * 100.00) / amountOfSets;
    let percentOneEven = (numbersData.oneEvenInSet * 100.00) / amountOfSets;
    let percentTwoEven = (numbersData.twoEvenInSet * 100.00) / amountOfSets;
    let percentThreeEven = (numbersData.threeEvenInSet * 100.00) / amountOfSets;
    let percentFourEven = (numbersData.fourEvenInSet * 100.00) / amountOfSets;
    let percentFiveEven = (numbersData.fiveEvenInSet * 100.00) / amountOfSets;
    let percentSixEven = (numbersData.sixEvenInSet * 100.00) / amountOfSets;

    return {
        averageEven, averageOdd, percentZeroEven, percentOneEven, percentTwoEven, percentThreeEven, percentFourEven,
        percentFiveEven, percentSixEven, numbersMap: numbersData.numbersMap
    }
} // End of evenAndOddPercentageCalculator function.

// Function to check which is the six most repeated numbers.
function getSixMostRepeatedNumbers(numMap) {
    let totalPlays = resultsArray.length;
    // Sorts the map by value, from highest to lowest.
    let sortedNumbersMap = new Map([...numMap.entries()].sort((a, b) => b[1] - a[1]));

    // Saves the six most repeated numbers and its frequencies in an array.
    let sixMostRepeatedNumbers = Array.from(sortedNumbersMap.entries()).slice(0, 6);

    return {sixMostRepeatedNumbers, totalPlays};
} // End of getMostRepeatedNumbers function.

export {evenAndOddCalculator, evenAndOddPercentageCalculator, getSixMostRepeatedNumbers};