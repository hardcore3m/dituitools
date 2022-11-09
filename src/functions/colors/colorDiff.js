let colorWheel = require("./colorWheel");
let Color = require("./color");
let ColorDifference = require("./colorDifference");
let ColorCheck = require("./colorCheck");

// Pegar a cor

const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`

// Cria o objeto da cor
let newColor = new Color(randomColor);

console.log("Cor Randômica para teste", newColor);

// colorWheel.forEach(element => {
//     let color = new Color(element.hex)
//     let difference = ColorDifference(color, newColor)
//     console.log(color, difference);
// });

// MAP

let colorsWithDistances = colorWheel.map(element => {
    let elementColor = new Color(element.hex)
    element.distance = ColorDifference(elementColor,newColor)
    return element
}).sort((a, b) => a.distance - b.distance)

colorsWithDistances.forEach(element => {
    
   console.log(element.tag," ",element.distance);
});
console.log("\n\n\n\n");
ColorCheck();

