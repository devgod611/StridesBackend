//Middleware to add to any routes to only allow authenticated users to access them

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Password = require('../models').Password;

const authMiddleware = async (req, res, next)=>{
    //Pull the token value from the header on any requests that come in. If the token isn't present, reject access to the route
    const token = req.header('Authorization');
    if(!token) 
    {   
        next();
        return;
    }

    try{
        var pwExist = false;
        const allPasswords = await Password.findAll();
        for (let i = 0; i < allPasswords.length; i++)  {
            pwExist = await bcrypt.compare(token, allPasswords[i].hash);
            if(pwExist) break; 
        }

        req.body.isAuthorized = pwExist;
        
        next();
    }catch(e){
        res.status(401).send("Access Denied");
    }

    
}

module.exports = authMiddleware;