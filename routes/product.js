const express = require("express")
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const products = require('../model/product');
const { model } = require("mongoose");
router.post("/addproduct",async (req,res)=>{
    console.log(req.body);
    const {name,image,price}= req.body;
    const obj = {
        name,
        image,
        price,
        productId:uuidv4()
    }

    // products.push(obj);
    await products.create(obj);
    res.redirect("/getproduct")
})

router.get("/getproduct", async (req,res)=>{
    let prod = await products.find();
    res.render("productPage",{
        prod
    })
})

router.get("/delete/:productId",async (req,res)=>{
    const prodId=req.params.productId;
    // products = products.filter((items)=>items.productId != prodId);
    await products.deleteOne({productId:prodId});
    res.redirect("/getproduct");
})

router.get("/update/:productId",async (req,res)=>{
    const prodId = req.params.productId;
    // updateproduct = products.filter((items)=>items.productId == prodId);
    const updateproduct = await products.findOne( {productId : prodId} );
    res.render("updatePage",{
        updateproduct:updateproduct
    })
})

router.post("/updateProduct",async (req,res)=>{
    const {name,image,price,productId} = req.body;
    let obj = {
        name,
        image,
        price,
        productId
    }  
    
    // products = products.map((item)=>{
    //     if(item.productId == productId){
    //         return obj;
    //     }
    //     return item;
    // })

    await products.updateOne({ productId: productId }, { $set: obj })

    res.redirect("/getproduct");
})

module.exports = router;