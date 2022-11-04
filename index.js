// Brings in the ability to create the 'require' method.
import {createRequire} from "module";
import {evenAndOddPercentageCalculator, getSixMostRepeatedNumbers} from "./calculations.js";

const require = createRequire(import.meta.url);

let evenOddData;

// Obtains the data from the lottery website and initializes the evenOddData variable.
let getNumberData = () => {
    evenOddData = evenAndOddPercentageCalculator();
    console.log(evenOddData);
}

// Obtains the six most repeated numbers and its frequencies.
let getMostRepeated = () => {
    return {
        freqNums: getSixMostRepeatedNumbers()
    };
}

let getEvenOddData = () => {
    return evenOddData;
}

export {getMostRepeated, getNumberData, getEvenOddData};