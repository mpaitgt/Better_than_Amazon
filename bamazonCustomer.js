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
    displayAll();
    userSelect();
    connection.end();
})

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

function updateQuantity(num, qty) {
    connection.query('SELECT * FROM products WHERE item_id = ?', [num], function(err, res) {
        if (err) throw err;
        var stock = res[0].stock_quantity;
        var purchaseQty = parseInt(qty);
        var price = parseFloat(res[0].price);
        
        if (stock < purchaseQty) {
            console.log('\nInsufficient quantity! Sorry.');
        } else {
            connection.query(`UPDATE products SET stock_quantity = ${stock - purchaseQty} WHERE item_id = ?`, [num], function() {
                console.log('\nYou\'re in luck - we have that in stock!');
                console.log(`\nThe new stock is ${stock - purchaseQty}`);
                console.log(`\nThe cost of your order is ${price * purchaseQty}`);
            })
        }
        userSelect();
    })
    
}

 function userSelect() {
    inquirer.prompt([
        {
            name: 'item_id',
            message: 'What is the ID of the product you\'d like to buy?',
            type: 'input'
        },
        {
            name: 'quantity',
            message: 'And how many units would you like to buy?',
            type: 'input'
        }
    ]).then(
        function(res) {
            updateQuantity(res.item_id, res.quantity);
        });
};

// module.exports = displayAll();