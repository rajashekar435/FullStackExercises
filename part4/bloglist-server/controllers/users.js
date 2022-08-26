const User = require("./../models/user");
const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) =>{
    const users = await User
    .find({})
    .populate("blogs", {
        author: 1,
        title: 1,
        url: 1
    });
    return response.json(users);
})


usersRouter.post("/", async (request, response)=>{
    const {name, username, password} = request.body;

    const currentUsers = await User.find({username});

    if(currentUsers.length !== 0){
        return response.status(400).json({error: "Username already exists"});
    }

    if(password.length < 3){
        return response.status(400).json({error: "Password must atleast be 3 characters in length"});
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        name: name, 
        username: username,
        passwordHash: passwordHash
    });

    const savedUser = await user.save();
    return response.status(200).json(savedUser);

});

usersRouter.delete("/:id", async (request,response)=>{
    const result = await User.findByIdAndRemove(request.params.id);

    if(result)
        response.status(204).end();
    else
        response.status(400).end();
})

module.exports = usersRouter;