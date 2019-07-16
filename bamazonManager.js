// Dependencies
var mysql = require("mysql");
var inquirer = require('inquirer');

//mysql connection

var connection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: "Luna2019*",
    database: "bamazon_DB"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    afterConnection();
});
function afterConnection() {
    inquirer.prompt({
        type: 'list',
        name: 'userAnswer',
        message: 'Please select one of the following options:',
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function (answer) {
        console.log(answer);
        var action = answer.userAnswer;
        switch (action) {

            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewlowInventory();
                break;
            case "Add to Inventory":
                addtoInventory();
                break;
            case "Add New Product":
                addnewProduct();
                break;
            default:
                console.log('Invalid option');
        }
    });

}
function viewProducts() {
    connection.query('SELECT * FROM products', function (error, response) {
        if (error) throw error;
        console.table(response);
        connection.end();
    });
}
function viewlowInventory() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function (error, response) {
        if (error) throw error;
        console.table(response);
        connection.end();
    });
}
function addtoInventory() {
    connection.query('SELECT * FROM products', function (error, response) {
        if (error) throw error;
        var productname = [];
        response.forEach(element => {
            productname.push(element.product_name);
        });
        inquirer.prompt([{
            type: 'list',
            name: 'userAnswer',
            message: 'Please select product you want to add: ',
            choices: productname
        }, {
                type: 'input',
                name: 'userInputQuantity',
                message: 'How many you want to add? ',
            }]

        ).then(function (answer) {
            console.log(answer);
            var action = answer.userAnswer;

            var query = "UPDATE products SET `stock_quantity`=(`stock_quantity` + " + answer.userInputQuantity + ") WHERE `product_name` = '" + answer.userAnswer + "';";
            console.log(query);
            connection.query(query, function (error, response) {
                if (error) throw error;
                connection.end();
            });
        });
    });
}
