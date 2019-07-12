
//npm install my-sql
//npm init
//npm install inquirer
// remember to format document 

var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: "Luna2019*",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    afterConnection()
});

function afterConnection() {
    connection.query('SELECT * FROM products', function (error, response) {
        if (error) throw error;
        console.table(response);
        askUser();
    });
}
function askUser() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'itemID',
            message: 'Please input ID of desired item: '
        }, {
            type: 'input',
            name: 'quantity',
            message: 'Please input quantity of desired item: '
        }
    ]).then(function (answer) {
        console.log(answer);
        var itemID = answer.itemID;
        var userQuantity = answer.quantity;

        connection.query('SELECT * FROM products WHERE id=' + itemID, function (error, response) {
            if (error) throw error;
            var stockQuantity = response[0].stock_quantity;
            var price = response[0].price;
            if (userQuantity > stockQuantity) {
                console.log("Insufficient quantity!");
            } else {
                // console.log("Lucky, we have " + stockQuantity + "products available");
                connection.query('UPDATE products SET ? WHERE ?', 
                [
                    { stock_quantity: stockQuantity - userQuantity} ,
                    { id: itemID}
                ],
                function(err,response){
                    console.log("your total is:  $" + price * userQuantity);
                });
            }
            connection.end();
        });
    });
}