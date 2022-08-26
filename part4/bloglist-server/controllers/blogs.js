const blogsRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('./../models/blog');
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { name: 1, username: 1});
    response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) =>{
    const blog = await Blog.findById(request.params.id);

    if(blog)
        response.json(blog)
    else
        response.status(404).end();
});

blogsRouter.post("/", async (request, response) => {

    const user = request.user;

    const blog = new Blog({
        ...request.body,
        likes: request.body.likes? request.body.likes : 0,
        user: user.id
    });
    

    const result = await blog.save();
    user.blogs = user.blogs.concat(blog.id);
    await user.save();
    response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) =>{

    const blog = await Blog.findById(request.params.id);

    if(!blog){
        return response.status(400).json({error : "Bad request"});
    }
        
    const user = request.user;

    if( !user || (blog.user.toString() !== user.id.toString())){
        return response.status(401).json({error: "Unauthorized to perform this action"});
    }

    await blog.delete();

    user.blogs = user.blogs.filter(b => b.id.toString() !== blog.id.toString());

    const result = await user.save();

    if(result)
        response.status(204).end();
    else
        response.status(400).json({error: "Bad request"});
});

blogsRouter.put("/:id", async (request, response) =>{

    const body = request.body;

    const blogToModify = {
        title: body.title,
        author: body.author,
        url: body.url, 
        likes: body.likes
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToModify,  {new : true, runValidators: true, context: "query"});

    if(updatedBlog)
        response.json(updatedBlog);
    else
        response.status(400).json({error: "Bad request"});
});

module.exports = blogsRouter;