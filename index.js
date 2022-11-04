// Brings in the ability to create the 'require' method.
import {createRequire} from "module";
import {evenAndOddPercentageCalculator, getSixMostRepeatedNumbers} from "./calculations.js";

const require = createRequire(import.meta.url);
const data = require("./data.json");

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

// Obtains a set of six numbers randomly, which are the result of one lottery play, from the data.json file.
// let getSetOFSix = () => {
//     return {
//         setOfSix: data[Math.floor(Math.random() * data.length)]
//     };
// }

export {getMostRepeated, getNumberData, getEvenOddData};