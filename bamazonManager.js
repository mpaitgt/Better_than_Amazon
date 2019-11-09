var inquirer = require('inquirer');
var mysql = require('mysql');
// var displayAll = require('./bamazonCustomer.js');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function(err) {
    if (err) throw err;
    managerPrompt();
    // connection.end();
})


function managerPrompt() {
    inquirer.prompt([
        {
            message: 'Welcome. What would you like to do?',
            type: 'list',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
            name: 'action'
        }
    ]).then(function(res) {
        switch (res['action']) {
            case 'View Products for Sale':
                displayAll();
                break;
            case 'View Low Inventory':
                lowInventory();
                break;
            case 'Add to Inventory':
                break;
            case 'Add New Product':
                addNewProduct();
                break;
            default:
                console.log('Something went wrong.');
        }
    })
}

function displayAll() {
    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;
        console.log(`Item ID | Product | Department | Cost | Stock`)
        for(var i = 0; i < res.length; i++) {
            console.log(
                `${res[i].item_id} | ${res[i].product_name} | ${res[i].department_name} | $${res[i].price} | ${res[i].stock_quantity}`
            );
            console.log(`-----------------------------------------------------------------------------------`);
        }
    })
}

function lowInventory() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, res) {
        if (err) throw err;
        for(var i = 0; i < res.length; i++) {
            console.log(
                `${res[i].item_id} | ${res[i].product_name} | ${res[i].department_name} | $${res[i].price} | ${res[i].stock_quantity}`
            );
            console.log(`-----------------------------------------------------------------------------------`);
        }
    })
}

function addNewProduct() {
    console.log(`\nAdd new product:\n`)
    inquirer.prompt([
        {
            message: 'Product Name:',
            name: 'product',
            type: 'input'
        },
        {
            message: 'Which department does this belong in?',
            type: 'list', 
            choices: ['Clothing', 'Sporting Goods', 'Cosmetics', 'Books', 'Electronics', 'Home Decor', 'Household Supplies', 'Grocery', 'Toys'],
            name: 'department'
        },
        {   
            message: 'Product Price:',
            name: 'price',
            type: 'number'
        },
        {
            message: 'How much of this product has come in?',
            name: 'inventory',
            type: 'number'
        }
    ]).then(function(res) {
        connection.query('INSERT INTO products SET ?', [
            {
                product_name: res['product'],
                department_name: res['department'],
                price: res['price'],
                stock_quantity: res['inventory']
            }
        ], function(err) {
            if (err) throw err;
            displayAll();
            console.log(`\nItem has been added to inventory\n`);
        })
    })
}