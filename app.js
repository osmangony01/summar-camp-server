const express = require('express');
const cors = require('cors');
require('./config/db');

const learningRoute = require("./routes/routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(learningRoute);


app.get('/', (req, res) => {
    res.send("LearningCamp Server is running ...")
});


module.exports = app;

