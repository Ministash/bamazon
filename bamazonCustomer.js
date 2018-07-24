//My variables/////////////////////////////
var inquirer = require("inquirer");
var mysql = require("mysql");
let Item = require("./itemConstructor");
const userInput = process.argv;
const userInputCommand = userInput[2];


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
const runTheShop = () => {
    inquirer.prompt([

        {
            type: "confirm",
            name: "welcome",
            message: 'Welcome to the bootleg version of Amazon, "Bamazon". Are you ready to begin?',
        },
        {
            type: "input",
            name: "userName",
            message: "What's your name pirate?"
        },
        {
            type: "list",
            name: "itemName",
            message: "Welcome in! What can I get for you today?",
            choices: ["Coors Light", "Kraft Cheese", "48oz of Salmon", "TV", "Hydro Flask",
                "PS4", "Kidney", "Backpack", "G.I. Joe", "6oz of Liquid Courage"]
        },
        {
            type: "input",
            name: "itemAmount",
            message: "How many of this item would you like to purchase?"

        }


    ]).then(function(user) {
        if (user.welcome === !true) {
            console.log("  Well if you're not going to use this bootleg service, try our other free products, such as 'Piratebay'," + "\n" +
                " 'Fakebook', and 'Pirategram'. Have a great bootlegging day ya beautiful pirate!");
            process.exit();
        } else {
            if(isNaN(user.itemAmount)){
                console.log("Hey man! We only deal in whole numbers here. Try again-");
            }else{
                itemManager(user.itemName, user.itemAmount);

            }
        }

    });

}

const itemManager = (item) => {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });










}


























// switch (item) {
//     case "Coors Light": itemChooser(item);
//         break;
//     case "Kraft Cheese": itemChooser(item);
//         break;
//     case "48oz of Salmon": itemChooser(user.items);
//         break;
//     case "TV": itemChooser(user.items);
//         break;
//     case "Hydro Flask": itemChooser(user.items);
//         break;
//     case "PS4": itemChooser(user.items);
//         break;
//     case "Kidney": itemChooser(user.items);
//         break;
//     case "Backpack": itemChooser(user.items);
//         break;
//     case "G.I. Joe": itemChooser(user.items);
//         break;
//     case "6oz of Liquid Courage": itemChooser(user.items);
//         break;