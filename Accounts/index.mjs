//internal modules
import chalk from "chalk";
import fs from "fs";
import inquirer from "inquirer";

async function operation() {
  try {
    const response = await inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "What do you want to do?",
          choices: [
            "Create account",
            "Check balance",
            "Deposit",
            "Withdraw",
            "Exit",
          ],
        },
      ])
      .then((answer) => {
        const action = answer["action"];

        if (action === "Create account") {
          createAccount();
        } else if (action === "Check balance") {
        } else if (action === "Deposit") {
        } else if (action === "Withdraw") {
        } else if (action === "Exit") {
          console.log(chalk.bgBlue.black("Thanks you for using Accounts"));
          process.exit();
        }
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
}

function createAccount() {
  console.log(chalk.bgGreen.black("Thank you for choosing our bank"));
  console.log(chalk.green("Configure the options for your account"));
  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Type a name for your account",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("This account already exists. Please type another name.")
        );
        buildAccount();
      }
      fs.writeFileSync(
        `accounts/${accountName}.json`,
        `{"balance": 0}`,
        (err) => {
          console.log(err);
        }
      );
      console.log(chalk.greenBright("Congratulations! Your account has been created."));
      operation();
    })
    .catch((err) => console.log(err));
}

operation();
