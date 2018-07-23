var inquirer = require("inquirer");
var mysql = require("mysql");
let Item = require("./itemConstructor");

let items = 15;


const runTheShop = () => {
    inquirer.prompt([
        
        {
            type: "confirm",
            name: "welcome",
            message: 'Welcome to the bootleg version of Amazon, "Bamazon". Are you ready to begin?',
        },
        
        
    ]).then(function(user){
        if(user.welcome === true){
            
            console.log("You son of a bith");
            items--;
            console.log(items);
            runTheShop();
        }
        
    });
    
}

runTheShop();
