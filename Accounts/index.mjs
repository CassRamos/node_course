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
          getAccountBalance();
        } else if (action === "Deposit") {
          deposit();
        } else if (action === "Withdraw") {
          withdraw();
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
          chalk.bgRed.black(
            "This account already exists. Please type another name."
          )
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
      console.log(
        chalk.greenBright("Congratulations! Your account has been created.")
      );
      operation();
    })
    .catch((err) => console.log(err));
}

function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "What is your account name",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkIfAccountNotExists(accountName)) {
        return deposit();
      }
      inquirer
        .prompt([
          {
            name: "amount",
            message: "How much do you wish to deposit?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          addAmount(accountName, amount);
          operation();
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

function checkIfAccountNotExists(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black("This account does not exist, choose another name")
    );
    return false;
  }
  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgBlack.red("A error occurred, please try again later"));
    return deposit();
  }
  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => console.log(err)
  );

  console.log(
    chalk.green(
      `The amount of $${amount} has been deposited on ${accountName} account`
    )
  );
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf-8",
    flag: "r",
  });
  return JSON.parse(accountJSON);
}

operation();

function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Type your account name",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkIfAccountNotExists(accountName)) {
        return getAccountBalance();
      }
      const accountData = getAccount(accountName);

      console.log(
        chalk.bgBlue.black(
          `Hello... \nYour account balance is ${accountData.balance} `
        )
      );
      operation();
    })
    .catch((err) => {
      console.log(err);
    });
}

function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Type your account name",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkIfAccountNotExists(accountName)) {
        return withdraw();
      }
      inquirer
        .prompt([
          {
            name: "amount",
            message: "How much would you like to withdraw?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          removeAmount(accountName, amount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black("A error ocurred, please try again later"));
    return withdraw();
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black("Unavailable balance"));
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => console.log(err)
  );

  console.log(
    chalk.green(`A withdraw of $${amount} is realized on your account`)
  );
  operation();
}
