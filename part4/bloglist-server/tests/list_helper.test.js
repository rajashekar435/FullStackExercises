const listHelper = require("./../utils/list_helper");

describe("Dummy tests",() =>{

    test("Dummy returns one", () => {
        const blogs = [];
        const result = listHelper.dummy(1);
        expect(result).toBe(1);
    });
    
});


describe("Total likes test", () => {

    test("Returns zero on an empty list", () =>{
        const blogs = [];

        expect(listHelper.totalLikes(blogs)).toBe(0);
    });

    test("Single blog returns it's own likes",() =>{
        const blogs = [
            {
                _id : "62ef9f2ad6f841eebeec91d9",
                title :"Your brain on porn",
                author :"Gary Wilson",
                url: "www.yourbrainonporn.com",
                likes: 150000,
                __v: "0"
            }
        ];

        expect(listHelper.totalLikes(blogs)).toBe(150000);
    });

    test("Calculation of total likes of a big list is correct", () => {
        const blogs = [
            {
                _id : "62ef9f2ad6f841eebeec91d9",
                title :"Your brain on porn",
                author :"Gary Wilson",
                url: "www.yourbrainonporn.com",
                likes: 150000,
                __v: "0"
            },
            {
                _id : "62ef9f7ed6f841eebeec91db",
                title :"The Missing Introduction to React",
                author :"Eric Elliott",
                url: "https://medium.com/javascript-scene/the-missing-introduction-to-react-62837cb2fd76",
                likes: 3700,
                __v: "0"
            },
            {
                _id : "62ef9fbdd6f841eebeec91dd",
                title :"Building a simple REST API with NodeJS and Express",
                author :"Onejohi",
                url: "https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9",
                likes: 5400,
                __v: "0"
            },
            {
                _id : "62efa92741cdeb27e6a4c0f2",
                title :"Introduction to Node.js / A beginners guide to Node.js and NPM",
                author :"Uday Hiwarale",
                url: "https://medium.com/jspoint/introduction-to-node-js-a-beginners-guide-to-node-js-and-npm-eca9c408f9fe",
                likes: 521,
                __v: "0"
            },
        ];

        expect(listHelper.totalLikes(blogs)).toBe(159621);
    });
    
});


describe("Most favourite blog tests", () => {
    test("Returns correct favourite blog when more than 5 blogs are present", () =>{
        const blogs = [
            {
                _id: "5a422a851b54a676234d17f7",
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
                __v: 0
              },
              {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
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
                _id: "5a422b891b54a676234d17fa",
                title: "First class tests",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                likes: 10,
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
              }  
        ];

        expect(listHelper.favouriteBlog(blogs)).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        });
    
    });

    test("Returns itself when there is only one blog", ()=>{
        const blogs = [
            {
                _id: "5a422ba71b54a676234d17fb",
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 0,
                __v: 0
            }
        ];
        expect(listHelper.favouriteBlog(blogs)).toEqual({
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            likes: 0
        });
    })

    test("Returns empty object when no blogs are sent", ()=>{
        const blogs =[];

        expect(listHelper.favouriteBlog(blogs)).toEqual({});
    });
});


describe("Most blogs tests", ()=>{
    test("Gives correct author when many blogs are present", ()=>{
        const blogs = [
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
        expect(listHelper.mostBlogs(blogs)).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        });
    });

    test("Test to check the author name with highest alphabet value is returned when there is a tie", ()=>{
        const blogs = [
            {
                _id : "62ef9f2ad6f841eebeec91d9",
                title :"Your brain on porn",
                author :"Gary Wilson",
                url: "www.yourbrainonporn.com",
                likes: 150000,
                __v: "0"
            },
            {
                _id : "62ef9f7ed6f841eebeec91db",
                title :"The Missing Introduction to React",
                author :"Eric Elliott",
                url: "https://medium.com/javascript-scene/the-missing-introduction-to-react-62837cb2fd76",
                likes: 3700,
                __v: "0"
            },
            {
                _id : "62ef9fbdd6f841eebeec91dd",
                title :"Building a simple REST API with NodeJS and Express",
                author :"Onejohi",
                url: "https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9",
                likes: 5400,
                __v: "0"
            },
            {
                _id : "62efa92741cdeb27e6a4c0f2",
                title :"Introduction to Node.js / A beginners guide to Node.js and NPM",
                author :"Uday Hiwarale",
                url: "https://medium.com/jspoint/introduction-to-node-js-a-beginners-guide-to-node-js-and-npm-eca9c408f9fe",
                likes: 521,
                __v: "0"
            },
        ];

        expect(listHelper.mostBlogs(blogs)).toEqual({
            author: 'Uday Hiwarale',
            blogs: 1
        });
    });

    test("Test to check empty object is returned when there are no blogs", ()=>{
        const blogs = [];
        expect(listHelper.mostBlogs(blogs)).toEqual({});
    });
});


describe("Most likes tests", ()=>{

    test("Gives correct author and number of likes when a set of blog posts are passed", ()=>{
        const blogs = [
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

        expect(listHelper.mostLikes(blogs)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        });
    });

    test("Test to check the author name with highest alphabet value is returned when there is a tie", ()=>{
        const blogs = [
            {
                _id : "62ef9f2ad6f841eebeec91d9",
                title :"Your brain on porn",
                author :"Gary Wilson",
                url: "www.yourbrainonporn.com",
                likes: 1500,
                __v: "0"
            },
            {
                _id : "62ef9f7ed6f841eebeec91db",
                title :"The Missing Introduction to React",
                author :"Eric Elliott",
                url: "https://medium.com/javascript-scene/the-missing-introduction-to-react-62837cb2fd76",
                likes: 3700,
                __v: "0"
            },
            {
                _id : "62ef9fbdd6f841eebeec91dd",
                title :"Building a simple REST API with NodeJS and Express",
                author :"Onejohi",
                url: "https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9",
                likes: 5400,
                __v: "0"
            },
            {
                _id : "62efa92741cdeb27e6a4c0f2",
                title :"Introduction to Node.js / A beginners guide to Node.js and NPM",
                author :"Uday Hiwarale",
                url: "https://medium.com/jspoint/introduction-to-node-js-a-beginners-guide-to-node-js-and-npm-eca9c408f9fe",
                likes: 5400,
                __v: "0"
            },
        ];

        expect(listHelper.mostLikes(blogs)).toEqual({
            author: 'Uday Hiwarale',
            likes: 5400
        });
    });

});