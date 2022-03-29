const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Import our authentication middleware function
const authMiddleware = require('./authMiddleware');


//Bring in Sequelize model so we can read/write users in the Database:
const User = require('../models').User;
const Password = require('../models').Password;

//Bring in our Joi validator for request body
const {registerValidator, loginValidator} = require('../validation');


router.post('/signup', async (req, res)=>{
    //Run body parameters through the validation schema before continuing:
    const {error} = registerValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Search for an existing user with the supplied username - to make sure same name is only used once
    const unameExist = await User.findOne({where: {"name": req.body.name}});
    if(unameExist) return res.status(400).send("A User account with this user name already exists");

    //Hash the password with bcrypt and a generated salt.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    
    //Build the user object to write to database
    const newUser = {
        name: req.body.name
    };
    
    //Save the new user object, using the User model we defined in Sequelize. Return the new user ID in JSON
    User.create(newUser)
        .then(savedUser => {
            const newPassword = {
                hash: hashedPassword,
                user_id: savedUser.id
            };
            Password.create(newPassword).then(savedPassword => {
                res.status(200).json({ status: "Success", new_user_id: savedUser.id });
            });
        })
        .catch(err => res.status(500).send(err.message));
})

router.get('/users', authMiddleware, async(req, res)=>{
    if(!req.body.isAuthorized)
    {
        res.status(401).send("Access Denied(Invalid Credentials)");
        return;
    }

    const userlist = await User.findAll();
    res.status(200).json({status: "Success" , users: userlist } );

})

router.get('/users/:id', authMiddleware, async(req, res)=>{
    if(!req.body.isAuthorized)
    {
        res.status(401).send("Access Denied(Invalid Credentials)");
        return;
    }

    // if request parameter does not exist, then return all users
    if(!req.params)
    {
        return res.status(401).send("Invalid User Id");
        
    }
    const specificUser = await User.findOne({where: {"id": req.params.id}});
    res.status(200).json({status: "Success" , users: specificUser } );
})

module.exports = router;