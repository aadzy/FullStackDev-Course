const temperatures = [69, 82, 73, 64]; // 0, 1, 2, 3; -1
console.log(temperatures.indexOf(50));

console.log(temperatures.includes(50));

// const temperatures = [
//     { degrees: 69, isRecordTemp: false }, 
//     { degrees: 82, isRecordTemp: true }, 
//     { degrees: 73, isRecordTemp: false }, 
//     { degrees: 64, isRecordTemp: false }
// ];

// const result=temperatures.some(temperature => temperature.isRecordTemp === true); // true / false
// console.log(result)

// const temperatures = [
//     { degrees: 69, isRecordTemp: false }, 
//     { degrees: 82, isRecordTemp: false }, 
//     { degrees: 73, isRecordTemp: false }, 
//     { degrees: 64, isRecordTemp: false }
// ];

// const result = temperatures.every(temperature => !temperature.isRecordTemp); // true / false
// console.log(result);