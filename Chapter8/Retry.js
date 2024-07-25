class MultiplicatorUnitFailure extends Error {}
// Custom Error Class to catch only Multiplication Error

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else throw new MultiplicatorUnitFailure("Klunk");
}

function reliableMultiply(a, b) {
  for (;;) {
    try {
      const res = primitiveMultiply(a, b);
      return res;
    } catch (error) {
      if (error instanceof MultiplicatorUnitFailure) {
        console.log("Error Occuring... Try Again");
      } else throw error;
    }
  }
}

const res = reliableMultiply(1, 4);
console.log(res);
