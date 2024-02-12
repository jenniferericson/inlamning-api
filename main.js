const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000; //radiofrekvens

const { sequelize, Product } = require('./models');
const migrationhelper = require('./migrationhelper');

app.use(express.json())
app.use(cors());



app.get("/api/products",async (req,res) => {
    //hämta alla produkter
    let products = await Product.findAll()
   /*  let result = products.map(p=>({
        productId: p.id,
        name: p.name,
        brand: p.brand,
        price: p.price,
        rating: p.rating
    })) */
     res.json(products)
});

app.get("/api/products/:productId", async (req,res) => {
    //hämta en produkt

   const product = await Product.findOne({
        where: {id:req.params.productId}
    }) 
   
    if (product == undefined){
        res.status(404).send("not found");
    }
    res.json(product)
});


app.post("/api/products", async (req,res) => {
    //skapa nytt objekt

    await Product.create({
        name : req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        rating: req.body.rating
    })

    res.status(201).send("Created");
});

/* app.delete('/api/products/:productId',(req,res)=>{
    //radera
    let product = products.find(product => product.id == req.params.productId);
    if (product == undefined){
        res.status(404).send("not found");
    }
    
    products.splice(products.indexOf(product),1)
    res.status(204).send("")
}); */

app.put('/api/products/:productId',async (req,res)=>{
    //updatera
    const productId = req.params.productId;
    const product = await Product.findOne({
        where: {id: productId}
    }) 

    product.name = req.body.name;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.rating = req.body.rating;

   await product.save()
    
    res.status(204).send("Changed");
});


app.listen(port, async () => {
    await migrationhelper.migrate()
    await sequelize.authenticate()
    console.log(`Example app listening on port ${port}`)
}); 