const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer.js');
const prompt = require('prompt-sync')();


const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`
        Welcome to CRM`);
    await menu();
}

const menu = async () => {
    console.log(
        `
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
            break;
        case "5":
            mongoose.connection.close()
            console.log('exiting...');
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
    console.log("creating...");
    setTimeout(() => { 
        console.log(`\nNewly created customer:\n\nid: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`) 
    }, 1000);
    setTimeout(async () => { await menu(); }, 2000); // choose next action

}

const viewCustomers = async () => {
    const customers = await Customer.find({});
    customers.forEach(customer => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    })

    setTimeout(async () => { await menu(); }, 2000); // choose next action
}


const updateCustomer = async () => {
    const customers = await Customer.find({});
    console.log("Below is a list of customers:")
    customers.forEach(customer => console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`));

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
    console.log("updating...");

    setTimeout(() => {
        console.log(`\nUpdated Customer:\nid: ${updatedCustomer._id} -- Name: ${updatedCustomer.name}, Age: ${updatedCustomer.age}`) // viewing updated customers
    }, 1000);

    setTimeout(async () => { await menu(); }, 2000); // choose next action

}

const deleteCustomer = async () => {
    const customers = await Customer.find({});
    customers.forEach(customer => console.log(`
        id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`));

    const askedId = prompt("Copy and paste the id of the customer you would like to delete here: ")
    console.log(`# user inputs ${askedId}`);

    console.log("deleting...");

    const removedCustomer = await Customer.findByIdAndDelete(askedId);
    setTimeout(() => {
        console.log(`\nDeleted customer:\n\nid: ${removedCustomer._id} -- Name: ${removedCustomer.name}, Age: ${removedCustomer.age}`);
    })

    setTimeout(async () => { await menu(); }, 2000); // choose next action
}

connect();