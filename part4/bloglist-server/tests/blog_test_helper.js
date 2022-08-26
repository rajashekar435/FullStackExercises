const Blog = require("./../models/blog");
const User = require("./../models/user");
const bcrypt = require("bcrypt");

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }  
];


const getNonExistingId = async () =>{

    const user = await getTestUser();
    const newBlog = new Blog({
        title :"Your brain on porn",
        author :"Gary Wilson",
        url: "www.yourbrainonporn.com",
        likes: 150000,
        user: user.id
    });

    
    await newBlog.save();
    await newBlog.remove();

    user.blogs = user.blogs.filter(b => b.id != newBlog.id);
    await user.save();
    return newBlog._id.toString();
}
const getBlogsInDb = async () =>{
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
}

const addTestUser = async () => {

    const testUser = new User({
        username: "testuser123",
        name: "Test User",
        passwordHash: await bcrypt.hash("testuser123", 10),
        blogs: []
    });

    await testUser.save();
};

const getTestUser = async () =>{
    const users = await User.find({username: "testuser123"});
    return users[0];
}

module.exports = {
    initialBlogs, getBlogsInDb, getNonExistingId, addTestUser, getTestUser
};