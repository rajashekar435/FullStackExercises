const _ = require("lodash");

const dummy = (blogs) =>{
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes,0);
}

const favouriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes));
    const mostLikedBlog = blogs.find(blog => blog.likes === maxLikes);

    if(!mostLikedBlog)
        return {};
    return {
        title: mostLikedBlog.title,
        author: mostLikedBlog.author,
        likes: mostLikedBlog.likes
    };
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0 )
        return {};
    const blogsByAuthor = _.groupBy(blogs, 'author');
    const mappedBlogsByAuthor = _.map(blogsByAuthor, (value,key) =>{
        return {
            author : key,
            blogs: value.length
        };
    });
    const sortedBlogsByAuthor = _.sortBy(mappedBlogsByAuthor, ['blogs', 'author']);
    return sortedBlogsByAuthor[sortedBlogsByAuthor.length - 1];

}

const mostLikes = (blogs) =>{
    if(blogs.length === 0 )
        return {};
    const blogsByAuthor = _.groupBy(blogs, 'author');
    const mappedBlogsByAuthor = _.map(blogsByAuthor, (value,key) =>{
        return {
            author : key,
            likes: value.reduce((sumOfLikes, blog) => sumOfLikes + blog.likes, 0)
        };
    });
    const sortedBlogsByAuthor = _.sortBy(mappedBlogsByAuthor, ['likes', 'author']);
    return sortedBlogsByAuthor[sortedBlogsByAuthor.length - 1];

}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs , mostLikes};