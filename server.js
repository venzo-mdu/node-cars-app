const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectdb = require("./config/dbConnection");
// const fileUpload = require('express-fileupload');


connectdb();
const app = express();


const port = process.env.PORT || 5000;
// app.use(express.json({limit:' 50mb'}));
// app.use(express.urlencoded({limit:'50mb',extended:true}))
// app.use(fileUpload({
//     useTempFiles:true
// }))

//express inbuild middleware for accepting request body
// /app.use('trust proxy',true)
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/cars",require("./routes/carRoutes") );
app.use(errorHandler);
//making the folder static
// app.use('/uploads',express.static('uploads'));

app.listen(port, () =>{
    console.log(`server is running port: ${port}`)
})
