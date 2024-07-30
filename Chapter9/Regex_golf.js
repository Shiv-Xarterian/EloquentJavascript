const cat_car = /ca[rt]/;
const pop_prop = /pr?op/;
const ferret_ferry_ferrari = /ferr(et|y|ari)/;
const endious = /\b\w*ious\b/;
//   /b->Word boundary to ensure the start of a word. or end of the word
const A_whitespace_character_followed_by_a_period_comma_colon_or_semicolon =
  /\s[,-;:]/;
const A_word_longer_than_six_letters = /\b\w{7,}\b/;
const A_word_without_the_letter_e_or_E = /\b(?!\w*[eE])\w+\b/;
// Without \w+, the regex would only check for the absence of 'e' or 'E' but wouldn’t capture or return any words. \w+ ensures that the word itself is matched and returned if it doesn’t contain 'e' or 'E'.
function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes)
    if (!regexp.test(str)) {
      console.log(`Failure to match '${str}'`);
    }
  for (let str of no)
    if (regexp.test(str)) {
      console.log(`Unexpected match for '${str}'`);
    }
}

verify(cat_car, ["my car", "bad cats"], ["camper", "high art"]);
verify(pop_prop, ["pop culture", "mad props"], ["plop", "prrrop"]);
verify(
  ferret_ferry_ferrari,
  ["ferret", "ferry", "ferrari"],
  ["ferrum", "transfer A"]
);
verify(
  endious,
  ["how delicious", "spacious room"],
  ["ruinous", "consciousness"]
);
verify(
  A_whitespace_character_followed_by_a_period_comma_colon_or_semicolon,
  ["bad punctuation ."],
  ["escape the period"]
);
verify(
  A_word_longer_than_six_letters,
  ["Siebentausenddreihundertzweiundzwanzig"],
  ["no", "three small words"]
);

verify(
  A_word_without_the_letter_e_or_E,
  ["red platypus", "wobbling nest"],
  ["earth bed", "bedrøvet abe", "BEET"]
);
