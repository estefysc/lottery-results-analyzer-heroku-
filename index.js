// Brings in the ability to create the 'require' method.
import {createRequire} from "module";
import {evenAndOddPercentageCalculator, getSixMostRepeatedNumbers, analyzeConsecutiveNumbers} from "./calculations.js";

const require = createRequire(import.meta.url);

let evenOddData;

// Obtains the data from the lottery website and initializes the evenOddData variable.
let getNumberData = () => {
    if (!evenOddData) {
        evenOddData = evenAndOddPercentageCalculator();
    }
    return evenOddData;
}

// Obtains the six most repeated numbers and its frequencies.
let getMostRepeated = () => {
    return {
        freqNums: getSixMostRepeatedNumbers(getNumberData().numbersMap) 
    };
}

let getEvenOddData = () => {
    if (!evenOddData) {
        evenOddData = evenAndOddPercentageCalculator();
    }
    return evenOddData;
}

let getAllNumsData = () => {
    let numbersMap = getNumberData().numbersMap;
    return { numbers: Object.fromEntries(numbersMap) };
}

let getConsecutiveNumsData = () => {
    let consecutiveNumsData = analyzeConsecutiveNumbers();
    return consecutiveNumsData;
}

export {getMostRepeated, getNumberData, getEvenOddData, getAllNumsData, getConsecutiveNumsData};