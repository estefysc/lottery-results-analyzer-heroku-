import cheerio from "cheerio";
import got from "got";
import fs from "fs";

const lotteryURL = "https://flalottery.com/exptkt/l6.htm";
const numsPerPlay = 6;

let wordArray = [];
let resultsArray = [];
let intArray = [];
let numOfRows;
let resultArrayJson;

// Helper function to create a 2d array for the results.
function create2dArray(rows, columns, numArr) {
    let twoDimArray = [];
    let numsArrayIndex = 0;

    for(let i = 0; i < rows; i++) {
        twoDimArray.push([]);

        twoDimArray[i].push(new Array(columns));

        for(let j = 0; j < columns; j++) {
            if(numsArrayIndex < numArr.length) {
                twoDimArray[i][j] = numArr[numsArrayIndex];
                numsArrayIndex++;
            }

        }
    }
    return twoDimArray;
}

// todo: find something meaningful to use instead of the test variable.
// This promise will get the text contained in the 'td' tag from the url, and then create the wordArray with the resultant text.
let wordsArrayPromise = new Promise(function(resolve, reject) {
    let test = true;

    if(test) {
        resolve(
            got(lotteryURL).then(response => {

                const pattern = new RegExp('[0-9]+-');
                const patternSec = new RegExp('[0-9]+/')
                const $ = cheerio.load(response.body);

                // response.body contained in the $ constant is filtered by 'td' and converted to text.
                // The numbers from the dates of the results, which are followed by - or /, will be replaced with 'NaN'
                // so when the intArray is populated, those numbers are not included as lottery results.
                $('td').each((index, element) => {
                    wordArray.push($(element).text().replace(pattern, 'NaN').replace(patternSec, 'NaN'));
                });

            }).catch(err => {
                console.log(err);
            })
        );
    } else {
        reject("wordsArrayPromise did not resolve");
    }
});

// todo: find something meaningful to use instead of the test variable.
// This function is a promise that will create the resultsArray, which is a 2d array containing only the lottery results.
let createResultsArray = function (arrayWithWords) {
    new Promise(function (resolve, reject) {
        let test = true;

        if (test) {
            resolve(
                arrayWithWords.forEach(element => {
                    // Each element that is a number is converted to an integer and pushed to the intArray.
                    if (!isNaN(parseInt(element))) {
                        intArray.push(parseInt(element));
                    }
                }),

                numOfRows = intArray.length / numsPerPlay,

                resultsArray = create2dArray(numOfRows, numsPerPlay, intArray),
            );
        } else {
            reject("the promise within the createResultsArray function did not work");
        }
    }).then();
}

// This function is exported.
// This function will call the other functions to create the resultsArray first and then create the json file with the results.
function createJsonFile() {
    wordsArrayPromise.then(() => {
        createResultsArray(wordArray);
        resultArrayJson = JSON.stringify(resultsArray);

        fs.writeFile("data.json", resultArrayJson, function (err) {
            console.log(err ? 'Error :' + err : 'File created')
        });
    });
    return resultArrayJson;
}

// The resultsArray variable is exported to be used in the calculations.js file.
export {createJsonFile, resultsArray};


