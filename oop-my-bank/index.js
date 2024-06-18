#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
// Bank Account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.green(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`));
        }
        else {
            console.log(chalk.red('Insufficient balance.'));
        }
    }
    // Credit Money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(chalk.green(`Deposit of $${amount} successful. New balance: $${this.balance}`));
    }
    // Check Balance
    checkBalance() {
        console.log(chalk.blue(`Current balance: $${this.balance}`));
    }
}
// Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
// Create customers
const customers = [
    new Customer('Faizan', 'Anjum', 'Male', 22, 3112281305, accounts[0]),
    new Customer('Raza', 'Ali', 'Male', 24, 3142281305, accounts[1]),
    new Customer('Alizah', 'Syed', 'Female', 35, 3222281355, accounts[2]),
];
// Function to interact with Bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: 'accountNumber',
            type: 'number',
            message: 'Enter your account number:',
        });
        const customer = customers.find((customer) => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.yellow(`Welcome, ${customer.firstName} ${customer.lastName}\n`));
            const ans = await inquirer.prompt([
                {
                    name: 'select',
                    type: 'list',
                    message: 'Select an operation:',
                    choices: ['Deposit', 'Withdraw', 'Check Balance', 'Exit'],
                },
            ]);
            switch (ans.select) {
                case 'Deposit':
                    const depositAmount = await inquirer.prompt({
                        name: 'amount',
                        type: 'number',
                        message: 'Enter the amount to deposit:',
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case 'Withdraw':
                    const withdrawAmount = await inquirer.prompt({
                        name: 'amount',
                        type: 'number',
                        message: 'Enter the amount to withdraw:',
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case 'Check Balance':
                    customer.account.checkBalance();
                    break;
                case 'Exit':
                    console.log(chalk.magenta('Exiting the banking program...'));
                    console.log(chalk.cyan('\nThank you for using our banking services. Have a great day!'));
                    return;
            }
        }
        else {
            console.log(chalk.red('Invalid account number. Please try again.'));
        }
    } while (true);
}
service();
