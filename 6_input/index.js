const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`What's your favorite program language? `, (language) => {
  if (language === "HTML") {
    console.log("This is not a program language");
  } else {
    console.log(`My favorite language is: ${language}`);
  }

  readline.close();
});
