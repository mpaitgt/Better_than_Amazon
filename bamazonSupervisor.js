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
    supervisorPrompt();
    // connection.end();
})

function supervisorPrompt() {
    inquirer.prompt([
        {
            name: 'super-choice',
            message: 'What is the ID of the product you\'d like to buy?',
            type: 'list',
            choices: ['View Product Sales by Department', 'Create New Department']
        },
    ]).then(
        function(res) {
            switch (res['super-choice']) {
                case 'View Product Sales by Department':
                    departmentSales();
                    supervisorPrompt();
                    break;  
                case 'Create New Department':
                    createDepartment();
                    break;
                default:
                    console.log('Sorry - something went wrong.');
            }
        });
};

function departmentSales() {
    var sql = 'SELECT departments.department_id, departments.department_name, departments.over_head_costs, ROUND(SUM(products.product_sales), 2) total_sales, ';
    sql += '(ROUND(SUM(products.product_sales), 2) - departments.over_head_costs) AS total_profit FROM departments ';
    sql += 'INNER JOIN products ON departments.department_name = products.department_name ';
    sql += 'GROUP BY departments.department_name';
    
    connection.query(sql, function(err, res) {
        if (err) throw err;
        console.log('\n');
        console.table(res);
    })
}

function createDepartment() {
    inquirer.prompt([
        {
            message: 'What department would you like to create?',
            type: 'input',
            name: 'new-department'
        },
        {
            message: 'What are your overhead costs?',
            name: 'overhead',
            type: 'number'
        }
    ]).then(function(res) {
        connection.query('INSERT INTO departments SET ?', [
            {
                department_name: res['new-department'],
                over_head_costs: res['overhead']
            }
        ], function(err) {
            if (err) throw err;
            console.log(`\nNew department - ${res['new-department']} - has been created!\n`);
        })
        supervisorPrompt();
    })   
}
