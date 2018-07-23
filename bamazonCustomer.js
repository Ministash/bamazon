//My variables/////////////////////////////
var inquirer = require("inquirer");
var mysql = require("mysql");
let Item = require("./itemConstructor");


// My Database Connection///////////////////
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    runTheShop();
});


// Start of my program's functionality/////
function createItem() {
    console.log("Inserting a new product...\n");
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            product_name: "Cheese",
            department_name: "food",
            price: 3,
            stock_quantity: 10

        },
        function(err, res) {
            console.log(res.affectedRows + " product inserted!\n");
        }
    );
}


const runTheShop = () => {
    inquirer.prompt([

        {
            type: "confirm",
            name: "welcome",
            message: 'Welcome to the bootleg version of Amazon, "Bamazon". Are you ready to begin?',
        },


    ]).then(function(user) {
        if (user.welcome === !true) {
            console.log("  Well if you're not going to use this bootleg service, try our other free products, such as 'Abay',"  + "\n" + 
            " 'Pacebook', and 'Bamagram'. Have a great bootlegging day ya beautiful pirate!");
                        process.exit();
        }

    });

}

