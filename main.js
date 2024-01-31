const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000; //radiofrekvens

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());

const products = [{
    name: "Hyal Reyouth Toner",
    brand: "Dr. Ceuracle",
    price: 299 + "kr",
    rating: 5,
    id: 1
},
{
    name: "Rich Moist Soothing Cream",
    brand: "Klairs",
    price: 399 + "kr",
    rating: 5,
    id: 2
},
{
    name: "Natural Repair Serum",
    brand: "Hyggee",
    price: 559 + "kr",
    rating: 5,
    id: 3
},
{
    name: "Rice Toner",
    brand: "I'm From",
    price: 449 + "kr",
    rating: 4.5,
    id: 4
},
{
    name: "Vegan Kombucha Tea Essence",
    brand: "Dr. Ceuracle",
    price: 499 + "kr",
    rating: 5,
    id: 5
},
{
    name: "Supple Preparation Unscented Toner",
    brand: "Klairs",
    price: 299 + "kr",
    rating: 5,
    id: 6
},
{
    name: "Royal Vita Propolis 33 Ampoule",
    brand: "Dr. Ceuracle",
    price: 349 + "kr",
    rating: 4.5,
    id: 7
},
{
    name: "Advanced Snail 96 Mucin Power Essence",
    brand: "COSRX",
    price: 299 + "kr",
    rating: 4.5,
    id: 8
},
{
    name: "All In One Cream",
    brand: "Hyggee",
    price: 499 + "kr",
    rating: 4.5,
    id: 9
},
];

app.get("/api/products",(req,res) => {
    //hämta alla produkter
    res.json(products)
});

app.get("/api/products/:productId",(req,res) => {
    //hämta en produkt
    let product = products.find(product => product.id == req.params.productId);
    if (product == undefined){
        res.status(404).send("not found");
    }
    res.json(product)
});

function getNextId(){
    let m = Math.max(...products.map(product => product.id))
    return m + 1
}

app.post("/api/products",(req,res) => {
    //skapa nytt objekt
    const product = {
        name : req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        rating: req.body.rating,
        id:getNextId()
    }
    products.push(product)

    res.status(201).send("Created");
});

app.delete('/api/products/:productId',(req,res)=>{
    //radera
    let product = products.find(product => product.id == req.params.productId);
    if (product == undefined){
        res.status(404).send("not found");
    }
    
    products.splice(products.indexOf(product),1)
    res.status(204).send("")
});

app.put('/api/products/:productId',(req,res)=>{
    //updatera
    let product = products.find(product => product.id == req.params.productId);
    if (product == undefined){
        res.status(404).send("not found");
    }
    product.name = req.body.name,
    product.brand = req.body.brand,
    product.price = req.body.price,
    product.rating = req.body.rating
    
    res.status(204).send("Changed");
});


app.listen(port,() => {
    console.log(`Example app listening on port ${port}`);
});