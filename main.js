const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000; 

const { sequelize, Product } = require('./models');
const migrationhelper = require('./migrationhelper');

app.use(express.json());
app.use(cors());


app.get("/api/products",async (req,res) => {

    let products = await Product.findAll();
  
     res.json(products);
});


app.post("/api/products", async (req,res) => {

    await Product.create({
        name : req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        rating: req.body.rating
    });

    res.status(201).send("Created");
});


app.put('/api/products/:productId',async (req,res)=>{

    const productId = req.params.productId;
    const product = await Product.findOne({
        where: {id: productId}
    });

    product.name = req.body.name;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.rating = req.body.rating;

    await product.save();
    
    res.status(204).send("Changed");
});


app.listen(port, async () => {
    await migrationhelper.migrate();
    await sequelize.authenticate();
    console.log(`Example app listening on port ${port}`);
}); 