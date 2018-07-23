//My variables/////////////////////////////
var inquirer = require("inquirer");
var mysql = require("mysql");
let Item = require("./itemConstructor");


// My Database Connection///////////////////
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "1234",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    runTheShop();
  });

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
                
                
            ]).then(function(user){
                if(user.welcome === true){
                    console.log("You son of a bith");
                    runTheShop();
                    createItem();
        }
        
    });
    
}

