const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectdb = require("./config/dbConnection");
//const validateHandler = require("./middleware/validateHandler");
const contactRoutes = require("./routes/contactRoutes")

connectdb();
const app = express();

const port = process.env.PORT || 5000;

//express inbuild middleware for accepting request body
app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

//restore user from session
// app.use(validateHandler)

app.listen(port, () =>{
    console.log(`server is running port: ${port}`)
})


