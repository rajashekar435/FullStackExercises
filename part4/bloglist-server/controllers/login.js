const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./../models/user");

loginRouter.post("/", async (request, response) =>{

    const {username, password}  = request.body;
    
    const users = await User.find({username});
    const user = users[0];
    const passwordMatch = user.length === 0 ? false : await bcrypt.compare(password, user.passwordHash);

    if(!(user.length !==0  && passwordMatch)){
        return response.status(401).json({error : "Invalid username or password. Please check"});
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 600 });

    return response.status(201).json({
        token: token,
        username: user.username,
        name: user.name
    });


});

module.exports = loginRouter;