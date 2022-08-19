const app = require("./../app");
const mongoose = require("mongoose");
const helper = require("./blog_test_helper");
const Blog = require("./../models/blog");
const supertest = require("supertest");

const api = supertest(app);

beforeEach(async ()=>{
    
    await Blog.deleteMany({});

    for(let blog of helper.initialBlogs){
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
});

describe("Tests to verify get api calls", () =>{
    test("Test to get all blogs", async () => {

        const response = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    
        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });
    
    test("Test to check if blogs contain a property called id", async ()=>{
        const response = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    
        const blogs = response.body;
        blogs.forEach(blog =>{
            expect(blog.id).toBeDefined();
        })
    });
});

describe("Tests to verify post api calls", ()=>{

    test("Test to verify adding new blog to database", async ()=>{
        const newBlog = {
            title :"Your brain on porn",
            author :"Gary Wilson",
            url: "www.yourbrainonporn.com",
            likes: 150000
        }
    
        const result = await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        
        const endBlogs = await helper.getBlogsInDb();
    
        expect(endBlogs).toHaveLength(helper.initialBlogs.length + 1);
        expect(result.body).toMatchObject(newBlog);
    });
    
    test("Test to verify likes property defaults to zero when ommitted", async () =>{
        const newBlog = {
            title :"Your brain on porn",
            author :"Gary Wilson",
            url: "www.yourbrainonporn.com"
        }
    
        const result = await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        
        expect(result.body.likes).toBe(0);
    });
    
    test("Test to verify validation fails when title or url is ommitted", async () => {
        const newBlog = {
            author :"Gary Wilson",
            likes: 1000
        };
    
        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400);
    
    });
});

describe("Tests to verify delete api calls", ()=>{

    test("Test to delete a specific blog", async () =>{
        const blogsAtStart = await helper.getBlogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);

        const blogsAtEnd = await helper.getBlogsInDb();

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length-1);
    });

    test("Test to verify specifying a non-existent id will return 400", async () =>{
        const nonExistingId = await helper.getNonExistingId();
        console.log(nonExistingId);
        await api
            .delete(`/api/blogs/${nonExistingId}`)
            .expect(400);

    });
    
});

describe("Tests to verify put api calls", ()=>{

    test("Test to modify a specific note", async ()=>{
        const blogsAtStart = await helper.getBlogsInDb();

        const blogToUpdate = {
            ...blogsAtStart[0],
            likes: 10000
        };
        const blogIdToUpdate = blogToUpdate.id;
        delete blogToUpdate.id;

        const result = await api
            .put(`/api/blogs/${blogIdToUpdate}`)
            .send(blogToUpdate)
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(result.body).toMatchObject(blogToUpdate);
    });

    test("Test to verify a non-existent id will return 400", async ()=>{
        const nonExistingId = await helper.getNonExistingId();

        await api
            .put(`/api/blogs/${nonExistingId}`)
            .send({})
            .expect(400);
    });
});

afterAll(()=>{
    mongoose.connection.close();
});