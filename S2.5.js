// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };
// main.js
const math = require('./math');

let result = math.add(2,4);
console.log("Addition Result:", result);