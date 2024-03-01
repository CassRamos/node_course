import chalk from "chalk";

const grade = 6;

if (grade >= 7) {
  console.log(chalk.green("Congrats ! You're approved"));
} else {
  console.log(chalk.bgRed("You need to take a make-up exam!"));
}
