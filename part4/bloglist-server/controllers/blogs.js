const blogsRouter = require('express').Router();
const Blog = require('./../models/blog');

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
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
    const blog = new Blog({
        ...request.body,
        likes: request.body.likes? request.body.likes : 0
    });

    const result = await blog.save();
    response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) =>{

    const result = await Blog.findByIdAndRemove(request.params.id);

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