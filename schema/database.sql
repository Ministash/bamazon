CREATE TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT,   
    product_name VARCHAR (45) NOT NULL,  
     department_name INT default 0,  
     price INT default 0,   
     stock_quantity INT default 0,   
     PRIMARY KEY (item_id)
     
     )
