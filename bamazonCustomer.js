/*

Initially, I decided to divide each prompt into it's own function. 
It felt like the easiest way return back to any prompt I wanted to, regardless of where I 
had been in the sequence of guiding the user. But, in the end it just made data management difficult because I had
to pass a bunch of values between each function. On a smaller application 
like this, it's not too awful. However, I could see how much more difficult
it would be to manage all of those values throughout a larger program. Any advice
on how to better keep track of values would be appreciated.

*/


//My variables/////////////////////////////
var inquirer = require("inquirer");
var mysql = require("mysql");
let readyToPurchase = false;
let itemNameArray = [];
let itemNumberArray = [];
let itemCostArray = [];
let totalItemCost = 0;


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
        }

    ]).then(function (user) {
        if (user.welcome === !true) {
            console.log("  Well if you're not going to use this bootleg service, try our other free products, such as 'Piratebay'," + "\n" +
                " 'Fakebook', and 'Pirategram'. Have a great bootlegging day ya beautiful pirate!");
            process.exit();
            connection.end();
        } else {
            shoppingList(user.itemName, user.itemAmount, user.userName, totalItemCost);
        }

    });

}

////This function finds and displays information about each product. It is also responsible for the logic behind not letting the user purchase too much of something 
const itemFinder = (itemName, itemAmount, userName, itemCost) => {
    console.log("Finding and selecting your product...\n");
    var query = connection.query("SELECT * FROM products WHERE product_name = " + "'" + itemName + "'", function (err, res) {
        if (err) throw err;

        //getting the cost of each item from the data base
        let itemCost = res[0].price;

        /*This is first defined as a global variable because it needs a general value the first time the 
        program runs. Too many things calling on it before it gets intially used */
        totalItemCost = itemCost * itemAmount;

        //getting the amount of stored variables
        let numberOfStoredItems = res[0].stock_quantity;

        //some sweet sweet interactive user prompt
        console.log("There are " + numberOfStoredItems + " of those " + itemName + " items." + "\n" + "At a cost of $" + itemCost + " each. " + "\n" + userName + ", you have just purchased " + itemAmount + " of them for a total of $"
            + totalItemCost + "\n");

        //making sure that the user isn't asking for too much
        if (itemAmount > numberOfStoredItems) {
            console.log("Aye, oi see you're a greedy pirate " + userName + ". We don't have enough of that item! Try a smaller amount-" + "\n");
            itemAmountSelector(itemName, userName);

            //this is the what happens after I wip the user into shape and get them on the righ track
        } else {
            updateDataBase(itemName, itemAmount, numberOfStoredItems);
            keepShoppingFunction(itemName, itemAmount, userName, totalItemCost);
        }

    });
}

// This function updates the database everytime the user picks an item.
const updateDataBase = (itemName, itemAmount, numberOfStoredItems) => {
    //finding how many items we have left over after buying a few things
    let updatedItemAmount = numberOfStoredItems - itemAmount;
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: updatedItemAmount
            },
            {
                product_name: itemName
            }
        ]
    );
}

///////This function displays the prompt for asking the user how many of something they want
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

//////This function asks the user if they want to keep shopping
const keepShoppingFunction = (itemName, itemAmount, userName, totalItemCost) => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "keepShopping",
            message: "Awesome! We put " + itemName + " and it's amount (" + itemAmount + ") in your cart. Would You like to keep shopping?",
        }

    ]).then(function (user) {
        //Pushing all of my values to an array for the end of the program to call upon
        itemNameArray.push(itemName);
        itemNumberArray.push(itemAmount)
        itemCostArray.push(totalItemCost);

        if (user.keepShopping == true) {
            shoppingList(itemName, itemAmount, userName, totalItemCost);

        } else {
            cartExecution(itemName, itemAmount, userName, totalItemCost);
        }

    });

}


/////This function displays my shopping list
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
        //Here I am redefining the item's name value so we can have more than one thing that the user purchases
        itemName = user.itemName;
        itemAmountSelector(itemName, userName, totalItemCost);
    });

}

//////This function handles cashing the user out and ending the application
const cartExecution = (itemName, itemAmount, userName, totalItemCost) => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "finishTheCart",
            message: "Are you ready to check out?",
        }

    ]).then(function (user) {
        if (user.finishTheCart == false) {
            shoppingList(itemName, itemAmount, userName, totalItemCost);
            console.log("Well then, let's keep shopping");

        } else {
            //Once the program ends, I need to add all the amounts together, which reduce is really great at doing!
            let finalCostAmount = itemCostArray.reduce((total, amount) => total + amount);
            console.log("We went a head and processed your order for a total of $" + finalCostAmount + ". Thank you for shopping with us!");
            connection.end();
        }
    });
}

















