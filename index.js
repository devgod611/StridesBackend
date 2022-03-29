const express = require('express');

//Import and initialise the environment variables - stored in .dotenv file in project root
require('dotenv').config();

//Import Routes
const authRoutes = require('./routes/auth');

//Initialise Express
const app = express();

//Set up parser so we can read JSON info from the request
app.use(express.json());

//Set up API routes
app.use('/', authRoutes);

//404 Error route as a catch-all
app.use((req, res, next)=>{
    res.status(404).send("Error 404 - Resource not found");
});

//Set default port to serve app on
const port = process.env.PORT || 3001;

app.listen(port, console.log(`App running on port: ${port}`));