import {resultsArray} from "./parser.js";

const numbersInOnePlay = 6;

let globalNumbersMap = new Map();

// This function runs within the evenAndOddPercentageCalculator() function and is used to calculate the amount of times even and odd numbers appear.
function evenAndOddCalculator() {
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

    for(let i = 0; i < resultsArray.length; ++i) {
        let evenCounter = 0;
        let oddCounter = 0;

        for(let j = 0; j < numbersInOnePlay; ++j) {
            // Checks if the number is even.
            if(resultsArray[i][j] % 2 === 0) {
                ++evenCounter;
                ++totalEvenNumbers;
            } else {
                ++oddCounter;
                ++totalOddNumbers;
            }

            // Populates a map with all the numbers and the amount of times they appear.
            // key is the number, value is the amount of times it appears in the set.
            numbersMap.set(resultsArray[i][j], (numbersMap.get(resultsArray[i][j]) || 0) + 1);
        } // End of j-variable for loop. Checks each numbers in each set of six, one play.

        // These switch statements are used to count the amount of sets with zero even, zero odd, one even, one odd, etc.
        switch (evenCounter) {
            case 1:
                ++oneEvenInSet;
                break;
            case 2:
                ++twoEvenInSet;
                break;
            case 3:
                ++threeEvenInSet;
                break;
            case 4:
                ++fourEvenInSet;
                break;
            case 5:
                ++fiveEvenInSet;
                break;
            case 6:
                ++sixEvenInSet;
                break;
            default:
                ++zeroEvenInSet;
                break;
        }
    } // End of i-variable for loop. Checks each set of six.

    globalNumbersMap = numbersMap;

    console.log("evenAndOddCalculator() function has been run.");

    return {
        totalEvenNumbers, totalOddNumbers, zeroEvenInSet, oneEvenInSet,
        twoEvenInSet, threeEvenInSet, fourEvenInSet, fiveEvenInSet, sixEvenInSet
    }
} // End of evenAndOddCalculator function.

// Needs to be run after evenAndOddCalculator()
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

    console.log("evenAndOddPercentageCalculator() function has been run.");

    return {
        averageEven, averageOdd, percentZeroEven, percentOneEven, percentTwoEven, percentThreeEven, percentFourEven,
        percentFiveEven, percentSixEven, numbersData
    }
} // End of evenAndOddPercentageCalculator function.

// Function to check which is the six most repeated numbers in the set.
// todo: Find why this function is being ran twice.
function getSixMostRepeatedNumbers() {
    let totalPlays = resultsArray.length;
    // Sorts the map by value, from highest to lowest.
    globalNumbersMap = new Map([...globalNumbersMap.entries()].sort((a, b) => b[1] - a[1]));

    // Saves the six most repeated numbers and its frequencies in an array.
    let sixMostRepeatedNumbers = Array.from(globalNumbersMap.entries()).slice(0, 6);

    console.log("getSixMostRepeatedNumbers() function has been run.");

    return {sixMostRepeatedNumbers, totalPlays};
} // End of getMostRepeatedNumbers function.

export {evenAndOddCalculator, evenAndOddPercentageCalculator, getSixMostRepeatedNumbers};