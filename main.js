const express = require("express");
const app = express();
const port = 3000; //radiofrekvens


app.get("/products",(req,res) => {
    res.json(products)
});


app.listen(port,() => {
    console.log(`Example app listening on port ${port}`);
});