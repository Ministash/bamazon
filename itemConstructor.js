function Item(product_name, department_name, price, stock_quantity){
    this.product_name = product_name;
    this.department_name = department_name;
    this.price = price;
    this.stock_quantity = stock_quantity;

    console.log(this);



}


module.exports = Item;