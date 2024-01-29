const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000; //radiofrekvens

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
    res.json(products)
});


app.listen(port,() => {
    console.log(`Example app listening on port ${port}`);
});