//internal modules
import fs from "fs";
import inquirer from "inquirer";

async function operation() {
  try {
    const response = await inquirer.prompt([
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
    ]);

    const action = response["action"];
    console.log(action);
  } catch (error) {
    console.log(error);
  }
}

operation();
