//My variables/////////////////////////////
var inquirer = require("inquirer");
var mysql = require("mysql");
let Item = require("./itemConstructor");
let readyToPurchase = false;
let itemNameArray = [];
let itemNumberArray = [];
let itemCostArray = [];


// My Database Connection///////////////////
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    initializeRunTheShop();
});


// Start of my program's functionality/////
const initializeRunTheShop = () => {
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
            message: "How many do you want?",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    console.log("\n" + "Woah there! Real pirates only ask in numbers");
                    return false;
                }
            }
        }


    ]).then(function (user) {
        if (user.welcome === !true) {
            console.log("  Well if you're not going to use this bootleg service, try our other free products, such as 'Piratebay'," + "\n" +
                " 'Fakebook', and 'Pirategram'. Have a great bootlegging day ya beautiful pirate!");
            process.exit();
        } else {
            itemFinder(user.itemName, user.itemAmount, user.userName);
        }

    });

}

const itemFinder = (itemName, itemAmount, userName, itemCost) => {
    console.log("Finding and selecting your product...\n");
    connection.query("SELECT * FROM products WHERE product_name = " + "'" + itemName + "'", function (err, res) {
        if (err) throw err;
        let itemCost = res[0].price;
        let totalItemCost = itemCost * itemAmount;
        let numberOfStoredItems = res[0].stock_quantity;
        // dataMover(numberOfStoredItems);
        console.log("There are " + numberOfStoredItems + " of those " + itemName + " items." + "\n" + "At a cost of $" + itemCost + " each. " + "\n" + userName + ", you have just purchased " + itemAmount + " of them for a total of $"
            + totalItemCost);

        if (itemAmount > numberOfStoredItems) {
            console.log("Aye, oi see you're a greedy pirate " + userName + ". We don't have enough of that item! Try a smaller amount-" + "\n");
            itemAmountSelector(itemName, userName);

        } else {
            keepShoppingFunction(itemName, itemAmount, userName, totalItemCost);
        }

    });

}
const itemAmountSelector = (itemName, userName, totalItemCost) => {
    inquirer.prompt([
        {
            type: "input",
            name: "itemAmount",
            message: "How many do you want?",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    console.log("\n" + "Woah there! Real pirates only ask in numbers");
                    return false;
                }
            }
        }

    ]).then(function (user) {
        itemFinder(itemName, user.itemAmount, userName, totalItemCost);

    });
}

const keepShoppingFunction = (itemName, itemAmount, userName, totalItemCost) => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "keepShopping",
            message: "Awesome! We put " + itemName + " and it's amount (" + itemAmount + ") in your cart. Would You like to keep shopping?",
        }

    ]).then(function (user) {
        itemNameArray.push(itemName);
        itemNumberArray.push(itemAmount)
        itemCostArray.push(totalItemCost);
        // updateDataBase(itemName, itemAmount, userName, totalItemCost);

        if (user.keepShopping == true) {
            shoppingList(itemName, itemAmount, userName, totalItemCost);

        } else {
            cartExecution(itemName, itemAmount, userName, totalItemCost);
        }

    });

}

const shoppingList = (itemName, itemAmount, userName, totalItemCost) => {
    inquirer.prompt([
        {
            type: "list",
            name: "itemName",
            message: "Welcome in! What can I get for you today?",
            choices: ["Coors Light", "Kraft Cheese", "48oz of Salmon", "TV", "Hydro Flask",
                "PS4", "Kidney", "Backpack", "G.I. Joe", "6oz of Liquid Courage"]
        }

    ]).then(function (user) {
        itemName = user.itemName;
        itemAmountSelector(itemName, userName, totalItemCost);
    });

}

const cartExecution = (itemName, itemAmount, userName, totalItemCost) => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "finishTheCart",
            message: "Are you ready to check out?",
        }

    ]).then(function (user) {
        if(user.finishTheCart == false){
            shoppingList(itemName, itemAmount, userName, totalItemCost);
            console.log("Well then, let's keep shopping");

        }else{
            let finalCostAmount = itemCostArray.reduce((total, amount) => total + amount);
            console.log("We went a head and processed your order for a total of $" + finalCostAmount + ". Thank you for shopping with us!" );
            connection.end();
        }
    });
}

// const updateDataBase = (itemName, itemAmount) =>{

//     connection.query("SELECT * FROM products WHERE product_name = " + "'" + itemName + "'", function (err, res) {
//         let numberOfStoredItems = res[0].stock_quantity;

//         let updatedItemAmount = numberOfStoredItems - itemAmount;
//         var query = connection.query(
//             "UPDATE products SET ? WHERE ?",
//             [
//               {
//                 quantity: updatedItemAmount
//               },
//               {
//                 department_name: itemName
//               }
//             ]
//           );
//     });



// }















