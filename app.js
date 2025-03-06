const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer.js');
const prompt = require('prompt-sync')();


const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await menu();


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
            break;
        case "2":
            await viewCustomers();
            break;
        case "3":
            await updateCustomer();
            break;
        case "4":
            await deleteCustomer();
            breakl
        case "5":
            await mongoose.disconnect();
            console.log('Disconnected from MongoDB');
            process.exit();
    }
}



const createCustomer = async () => {
    const name = prompt("Enter customer name: ");
    const age = parseInt(prompt("Enter customer age: "))

    const customerData = {
        name: name,
        age: age
    };
    const customer = await Customer.create(customerData);
    console.log(customer);
    setTimeout(async () => { await menu(); }, 1000); // choose next action

}

const viewCustomers = async () => {
    const customers = await Customer.find({});
    console.log(customers);

    setTimeout(async () => { await menu(); }, 1000); // choose next action
}


const updateCustomer = async () => {
    const customers = await Customer.find({});
    console.log(`Below is a list of of customers:
        ${customers} 
        `)

    const askedId = prompt("Copy and paste the id of the customer you would like to update here: ")
    console.log(`# user inputs ${askedId}`);


    const newName = prompt("What is the customers new name? ");
    console.log(`# user inputs ${newName}`);

    const newAge = prompt("What is the customers new age? ");
    console.log(`# user inputs ${newAge}`);

    const updatedCustomer = await Customer.findByIdAndUpdate(
        askedId,
        {
            name: newName,
            age: newAge
        },
        { new: true }
    );

    console.log("updated Customer: ", updatedCustomer) // viewing updated customers

    setTimeout(async () => { await menu(); }, 1000); // choose next action

}

const deleteCustomer = async () => {
    const customers = await Customer.find({});
    console.log(`Below is a list of of customers:
        ${customers} 
        `);

    const askedId = prompt("Copy and paste the id of the customer you would like to delete here: ")
    console.log(`# user inputs ${askedId}`);

    const removedCustomer = await Customer.findByIdAndDelete(askedId);

    setTimeout(async () => { await menu(); }, 1000); // choose next action
}

connect();