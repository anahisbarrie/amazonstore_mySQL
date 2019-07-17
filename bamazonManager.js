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
            console.table(response);
            connection.query(query, function (error, response) {
                if (error) throw error;
                connection.end();
            });
        });
    });
}

function addnewProduct() {
    inquirer.prompt([

        {
            name: "id",
            type: "input",
            message: "Add ID Number"

        },
        {
            name: "product_name",
            type: "input",
            message: "What is the name of product you would like to add to the stock?"
        },
        {
            name: "department_name",
            type: "input",
            message: "What is the department?"
        },
        {
            name: "price",
            type: "input",
            message: "What is the price for item?"
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "Please insert the quantity available"
        },

    ]).then(function (answers) {
        // console.log(answers)
        var id = answers.id;
        var name = answers.product_name;
        var category = answers.department_name;
        var price = answers.price;
        var quantity = answers.stock_quantity;
        buildNewItem(id, name, category, price, quantity);
    });
};

function buildNewItem(id, name, category, price, quantity) {
    connection.query('INSERT INTO products (id,product_name,department_name,price,stock_quantity) VALUES("' + id + '","' + name + '","' + category + '",' + price + ',' + quantity + ')');
    viewProducts();
};
