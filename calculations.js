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

function analyzeConsecutiveNumbers() {
    // Stats for single longest sequence per play
    const longestSequenceStats = {
      noConsecutives: 0,
      twoConsecutive: 0,   // longest sequence is 2 consecutive numbers
      threeConsecutive: 0, // longest sequence is 3 consecutive numbers
      fourConsecutive: 0,  // longest sequence is 4 consecutive numbers
      fiveConsecutive: 0,  // longest sequence is 5 consecutive numbers
      sixConsecutive: 0    // all 6 numbers consecutive
    };
    
    // Stats for multiple sequences
    const multipleSequencesStats = {
      oneSequence: 0,      // play has exactly one sequence
      twoSequences: 0,     // play has exactly two sequences
      threeSequences: 0,   // play has exactly three sequences
      sequenceCombinations: {} // breakdown of sequence combinations
    };
  
    resultsArray.forEach(play => {
      const sortedPlay = [...play].sort((a, b) => a - b);
      const sequences = [];
      let currentSeq = [sortedPlay[0]];
      
      // Find all consecutive sequences
      for (let i = 1; i < sortedPlay.length; i++) {
        if (sortedPlay[i] === sortedPlay[i-1] + 1) {
          // This number continues the current sequence
          currentSeq.push(sortedPlay[i]);
        } else {
          // This number breaks the sequence
          if (currentSeq.length > 1) {
            sequences.push(currentSeq);
          }
          currentSeq = [sortedPlay[i]];
        }
      }
      
      // Add the last sequence if it exists
      if (currentSeq.length > 1) {
        sequences.push(currentSeq);
      }
      
      // Categorize based on sequences found
      if (sequences.length === 0) {
        longestSequenceStats.noConsecutives++;
      } else {
        // Get sequence lengths (e.g., [2, 3] for a play with a pair and a triplet)
        const sequenceLengths = sequences.map(seq => seq.length);
        
        // Find the longest sequence length for the primary categorization
        const maxLength = Math.max(...sequenceLengths);
        
        // Update longest sequence stats
        if (maxLength === 2) longestSequenceStats.twoConsecutive++;
        else if (maxLength === 3) longestSequenceStats.threeConsecutive++;
        else if (maxLength === 4) longestSequenceStats.fourConsecutive++;
        else if (maxLength === 5) longestSequenceStats.fiveConsecutive++;
        else if (maxLength === 6) longestSequenceStats.sixConsecutive++;
        
        // Update multiple sequences stats
        if (sequences.length === 1) multipleSequencesStats.oneSequence++;
        else if (sequences.length === 2) multipleSequencesStats.twoSequences++;
        else if (sequences.length === 3) multipleSequencesStats.threeSequences++;
        
        // Record the combination of sequence lengths
        // Sort to ensure consistent keys like "2-2" for two pairs
        const combinationKey = sequenceLengths.sort((a, b) => a - b).join('-');
        multipleSequencesStats.sequenceCombinations[combinationKey] = 
          (multipleSequencesStats.sequenceCombinations[combinationKey] || 0) + 1;
      }
    });
    
    return { 
      longestSequenceStats,
      multipleSequencesStats
    };
  }

export {evenAndOddCalculator, evenAndOddPercentageCalculator, getSixMostRepeatedNumbers, analyzeConsecutiveNumbers};