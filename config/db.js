
const mongoose = require('mongoose');
const config = require('./config');

const DB_URL = config.db.url;
mongoose.set('strictQuery', false);


mongoose.connect(DB_URL)
    .then(() => {
        console.log("Mongodb is connected successfully!!")
    })
    .catch((error) => {
        console.log(error);
    })


// , { useNewUrlParser: true, useUnifiedTopology: true }