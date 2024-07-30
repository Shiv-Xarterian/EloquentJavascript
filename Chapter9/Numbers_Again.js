// Fill in this regular expression.
let number = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;

// /^[+-]?\d*(\.\d*)?([eE][+-]?\d+)?$/;

// ^[+-]? -> start with + or - then \d -> decimal
// (\.\d*) => means there should be a decimal after a dot
// if dot present e or E then +- for sure decimal Afer E
// E part may or maynot came -> but came at end of string so $
// (\.\d*)?|\.\d+) -> 5. or .5 or both coerrct but . is incorrect

//  /(^[+-](?!\w))?\d*\.?(\d*[eE]*\d*[+-]*)*\d*$/;

// Tests:
for (let str of [
  "1",
  "-1",
  "+15",
  "1.55",
  ".5",
  "5.",
  "1.3e2",
  "1E-4",
  "1e+12",
]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}
