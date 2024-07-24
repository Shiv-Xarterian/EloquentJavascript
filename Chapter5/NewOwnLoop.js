// forloop
// value, testfunction, update function, body function
// each iteration 0-> run test function on current loop value stops when false
// when false -> call the body function

const OwnForLoop = (value, test, body, update) => {
  if (!test(value)) return; // break of a for loop
  body(value); // inside of a for loop
  OwnForLoop(update(value), test, body, update); // update iterator
};

OwnForLoop(
  3,
  (n) => n > 0,
  console.log,
  (n) => n - 1
);
