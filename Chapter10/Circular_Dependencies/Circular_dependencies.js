// In CommonJS, cyclic dependencies are handled through the module cache and the way require works. Let's walk through the mechanism step-by-step to understand how it handles cycles.

// CommonJS require Mechanism
// When a module is required, the following steps happen:

// Check Cache: require first checks if the module is already in the cache.
// Load Module: If not in the cache, it reads the module's code.
// Create Exports Object: An empty exports object is created and placed in the cache.
// Wrap Code: The module code is wrapped in a function and executed with require and exports as arguments.
// Return Exports: The module's exports object is returned.
// Handling Cycles
// Consider the following simplified implementation of require:

// function require(name) {
//   if (!(name in require.cache)) {
//     let code = readFile(name);
//     let exports = (require.cache[name] = {});
//     let wrapper = Function("require, exports", code);
//     wrapper(require, exports);
//   }
//   return require.cache[name];
// }
// require.cache = Object.create(null);

// main.js
const a = require("./a");
const b = require("./b");

console.log("a.name:", a.name);
console.log("a.getBName():", a.getBName());
console.log("b.name:", b.name);
console.log("b.getAName():", b.getAName());
