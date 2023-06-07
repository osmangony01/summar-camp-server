
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Summar Camp is running...")
})








app.listen(PORT, ()=>{
    console.log(`Summar camp is running on PORT : ${PORT}`)
})