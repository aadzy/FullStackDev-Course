const temperatures = [
  { degrees: 69, isRecordTemp: false },
  { degrees: 82, isRecordTemp: true },
  { degrees: 73, isRecordTemp: false },
  { degrees: 64, isRecordTemp: false }
];

const newTemps = temperatures.map(temperature => {
   temperature.isRecordTemp = true; 
   return temperature;
});
console.log(newTemps);

//To add an element
// const newTemps = temperatures.map(temperature => {
//    temperature.isHigh = true; 
//    return temperature;
// });
// console.log(newTemps);



//Based on Condition
// const temperatures = [
//   { degrees: 69, isRecordTemp: false },
//   { degrees: 82, isRecordTemp: true },
//   { degrees: 73, isRecordTemp: false },
//   { degrees: 64, isRecordTemp: false }
// ];

// const newTemps = temperatures.map(temperature => 
// temperature.degrees > 70 ? { ...temperature, isHigh: true } : temperature 
// );
// console.log(newTemps);