const express = require("express")
const app = express();
const hbs = require("hbs");
const { default: mongoose } = require("mongoose");
const path = require("path")
const {v4:uuidv4} = require("uuid");

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended:true}))

app.set("view engine","hbs")
hbs.registerPartials(path.join(__dirname,"/views/partials"))

app.use("/",require('./routes/product'))

// let products = [];

mongoose.connect("mongodb+srv://harshverma8433:8433199105@cluster0.rx8re1j.mongodb.net/productPage",{
    useUnifiedTopology:true,
    useNewUrlparser:true
}).then(()=>{
    console.log("DB Connected");
}).catch(err=>{
    console.log(err);
})

app.listen(5000,()=>{
    console.log("http://localhost:"+5000);
})