const minimist = require("minimist");

const sum = require("./sum").sum;

const args = minimist(process.argv.slice(2));

const firstNum = parseInt(args["a"]);
const secondNum = parseInt(args["b"]);

sum(firstNum, secondNum);

/*
Terminal
node ./index.js --a=<typeNum> --b=<typeNum>
*/