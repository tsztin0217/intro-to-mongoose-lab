const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer.js');
const prompt = require('prompt-sync')();


const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await runQuieries();

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

    process.exit();
}

const menu = async () => {
    console.log(`
        Welcome to the CRM

        What would you like to do?
        
        1. Create a customer
        2. View all customers
        3. Update a customer
        4. Delete a customer
        5. quit
        `);
    const choice = prompt('Number of action to run: ');
    console.log(`# user inputs ${choice}`);
    switch (choice) {
        case "1":
            await createCustomer();
        case "2":
            await viewCustomers();
        case "3":
            await updateCustomer();
        case "4":
            await deleteCustomer();
        case "5":
    }
}



// const username = prompt('What is your name? ');

const createCustomer = async () => {
    const name = prompt("Enter customer name: ");
    const age = parseInt(prompt("Enter customer age: "))

    const customerData = {
        name: name,
        age: age
    };
    const customer = await Customer.create(customerData);
    console.log();

}

const viewCustomer = async () => {
    const customers = await Customer.find({});
    console.log(customers);
}


const updateCustomer = async () => {
    const customers = await Customer.find({});
    console.log(`Below is a list of of customers:
        ${customers} 
        `)
    const askId = prompt("Copy and paste the id of the customer you would like to update here: ")
    const updatedCustomer = await Customer.findById(askId);
    console.log(`# user inputs ${askId}`);

    const newName = prompt("What is the customers new name?");
    console.log(`# user inputs ${newName}`);
    updatedCustomer.name = newName;

    const newAge = prompt("What is the customers new age?");
    updatedCustomer.age = newAge;
    console.log(`# user inputs ${newAge}`);

    await updatedCustomer.save();

}
// console.log(`# user inputs {choice}`)

// console.log(`Your name is ${username}`);

menu();