const color = 'black';
const hexCode = '#000';

const colors = {
  'yellow Color': '#ff0',
  blue: "#f00",
  orange: "#f60",
  [color]: hexCode
};

// colors[color] = hexCode;
// console.log(colors);

function getColor(key) {
  //console.log(colors.key)
  return colors[key];
}

console.log(getColor('orange'));

// delete colors['yellow Color']
// console.log(colors);