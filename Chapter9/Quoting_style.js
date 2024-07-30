let text = "'I'm the cook,' he said, 'it's my job.'";

const regex = /(?<!\w)'()/g;

let replacedText = text.replace(regex, '"');

// ?<! - Negative Lookbehind
// Purpose: The ?<! operator is a negative lookbehind assertion. It ensures that a specific pattern does not precede the current position in the string.
// Usage: It ensures that the match is only valid if the specified pattern does not appear immediately before the current position.

console.log(replacedText);
