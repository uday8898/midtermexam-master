const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
    name:String,
    image:String,
    price:String,
    productId:String
})

const products = new mongoose.model("products",schema);

module.exports=products;