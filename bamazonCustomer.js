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
    // connection.end();
})

function displayAll() {
    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;
        console.log(`\n`);
        console.table(res);
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
                console.log(`\nThe cost of your order is ${parseFloat(price * purchaseQty, 2)}`);
            })
        }
        productSales(price, purchaseQty, num);
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

function productSales(x, y, z) {
    var sale = x * y;
    connection.query(`UPDATE products SET product_sales = product_sales + ${sale} WHERE item_id = ${z}`, function(err) {
        if (err) throw err;
    })
}

// module.exports = displayAll();