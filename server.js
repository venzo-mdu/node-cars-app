const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectdb = require("./config/dbConnection");
const bodyParser = require('body-parser');

connectdb();
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/cars",require("./routes/carRoutes") );

app.listen(port, () =>{
    console.log(`server is running port: ${port}`)
});

//making the folder static
//app.use('/uploads',express.static('uploads'));
