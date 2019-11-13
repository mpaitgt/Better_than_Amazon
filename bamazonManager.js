var inquirer = require('inquirer');
var mysql = require('mysql');

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
                displayAllProducts();
                managerPrompt();
                break;
            case 'View Low Inventory':
                lowInventory();
                managerPrompt();
                break;
            case 'Add to Inventory':
                increaseInventory();
                break;
            case 'Add New Product':
                addNewProduct();
                break;
            default:
                console.log('Something went wrong.');
        }
    })
}

function displayAllProducts() {
    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;
        console.log(`\n`);
        console.table(res);
    })
}

function lowInventory() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, res) {
        if (err) throw err;
        console.log(`\n`);
        console.table(res);
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
            displayAllProducts();
            console.log(`\n\nItem has been added to inventory\n\n`);
        })
        managerPrompt();
    })
}

function increaseInventory() {
    displayAllProducts();
    inquirer.prompt([
        {
            message: 'Select the product\'s id:',
            type: 'input',
            name: 'product'
        },
        {
            message: 'Amount of inventory added:',
            type: 'number',
            name: 'inventory'
        }
    ]).then(function(res) {
        console.log(res);
        connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?',
        [res['inventory'], res['product']],
        function(err) {
            if (err) throw err;
            console.log('\n\nYour inventory has been updated.\n');
        })
        managerPrompt();
    })
}