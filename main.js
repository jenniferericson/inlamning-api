const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000; 

const {Op} = require('sequelize')
const { sequelize, Product } = require('./models');
const migrationhelper = require('./migrationhelper');
const { validateInputValues } = require("./validators/inputValidator.js");
const { check } = require("express-validator");

app.use(express.json());
app.use(cors());


app.get("/api/products", check("q").escape(), async (req,res) => {

    let sortCol = req.query.sortCol || 'id';
    let sortOrder = req.query.sortOrder || 'asc';
    let offset = Number(req.query.offset || 0);
    let limit = Number(req.query.limit || 5);
    const products = await Product.findAndCountAll({
        where:{
            name:{
                [Op.like]: '%' + req.query.q + '%'
            }
        },
        order: [ 
            [sortCol, sortOrder]
        ],
        offset: offset,
        limit:limit
    });
        
    const total = products.count
    const result = products.rows.map(p=>{
        return {
        id:p.id,
        name:p.name,
        brand:p.brand,
        price:p.price,
        rating:p.rating
        };
    });
  
    return res.json({
        total,
        result
    });
});


app.post("/api/products", validateInputValues , async (req,res) => {

    await Product.create({
        name : req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        rating: req.body.rating
    });

    res.status(201).send("Created");
});


app.put('/api/products/:productId', validateInputValues , async (req,res)=>{

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