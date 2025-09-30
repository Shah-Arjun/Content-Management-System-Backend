
const { connectDatabase } = require("./database/database");
const Blog = require('./model/blogModel')
const express = require("express");
const app = express();
const cors = require('cors')

app.use(cors({origin:"http://localhost:5173"}))



//set ejs,   telling express to use ejs
//renders the pages dyanamically based on server-side data
app.set('views engine', 'ejs');


//middleware
//help your server understand the data being sent from the client (like a frontend form or a React app).
app.use(express.json())                           // This allows your Express server to parse incoming JSON data in req.body.
app.use(express.urlencoded({extended:true}))      // extended: true means it can parse nested objects



//Database Connection function call (function is defined in database.js)
connectDatabase();


// hey server, malai public folder ko kura haru access garn de (asking permission for access to public folder)
app.use(express.static("public"))






// GET API --> /     ,render home.ejs
app.get("/", (req, res) => {
  res.render('home.ejs', {name:'Arjun'})          //render home.ejs with data {name:'Arjun'},   set the value of name in home.ejs as Arjun
});


//render about.ejs
app.get('/about', (req, res) => {
  res.render('about.ejs')
})




// GET API -> /blogs  (to fetch/get all blogs)
app.get("/blogs", async (req, res) => {
  //finding/fetching all blogs form Blog model
  const blogs = await Blog.find();          //db bt sabai blogs fetch garera blogs variable ma hal, find() le array form ma return garxa

  if (blogs.length == 0) {               //checking if the blog is empty 
      res.json({ status: 404,
      message: "empty blogs " 
    });
  } 
  else {
    res.json({
      status: 200,
      message: "fetched all blogs ",
      blogs: blogs, //blogs variable ko blogsData haru data variable ma hal
    });
  }
});



// GET  API - /blogs/:id   (to fetch/get single blog by id)
app.get("/blogs/:id", async (req, res) => {
  const id = req.params.id; // req.params is an object containing route parameters defined in the URL (using : syntax).
  //or
  // const {id} = req.params.id

  //const blog = await Blog.find({ _id:id }); //request gareko id lai db ko _id saga  match garne
  // if (blog.length == 0) {
  //   res.json({
  //     status: 404,
  //     message: "No blogs found with the id  id",
  //   });
  // } else {
  //   res.status(200).json({
  //     message: "found blog by id",
  //     data: blog,
  //   });
  // }

  const blog = await Blog.findById(id)
  if(!blog){
    res.status(400).json({
      message: "Blog not found"
    })
  } else {
    res.status(200).json({
      message: "Blog found",
      data: blog,
    })
  }

});





// CREATE API --> to create blog
app.post("/createBlog", async (req, res) => {

const {title, subTitle, description} = req.body            //frontend bt aako data title, subTitle, descripiton ma hal,  objecr destructuring

  //insert to database logic goes here
  await Blog.create({
    //frontend bt pathako data Blog(it is model exported from blogModel.js) vanne table ma hal
    title: title,                   // title lai db ko title column ma hal
    subTitle: subTitle,            // subTitle lai db ko subTitle column ma hal
    description: description     // description lai db ko description column ma hal
  });

  res.status(201).json({
    status: 201,
    message: "Blog created successfully.",
  });

  //or -for react hit to backend             ,but yesle try catch gardaina hai
  // res.status(200).json({
  //     message: "Blog created successfully"
  // })
});



// UPDATE blog api -> patch
app.patch("/blogs/:id", async (req, res) => {
  const id = req.params.id; //req ma aako url bata id extract garera id variable ma hal
  const title = req.body.title; // req  ma aako title lai title variable ma hal
  const subTitle = req.body.subTitle; // req  ma aako subTitle lai subTitle variable ma hal
  const description = req.body.description; // req  ma aako description lai description variable ma hal

// const {title, subTitle, description} = req.body       //alternative by object destructuing


//check if the blog with id exist or not
const isBlogFound = await Blog.find({
  id : id                                          //i.e.   requested id === db id  checking
})
 if(isBlogFound.length = 0){
  res.json({
    message: "No blog found with that id"
  })
 } else{

  await Blog.findByIdAndUpdate(id, {          //Blog model , particular 'id' ko blog find gar ani {...} yo data tya update gar 
    title: title,
    subTitle: subTitle,
    description: description,
  });
  res.status(200).send({
    message: "updated successfully"
  })
}
});



//DELETE api
app.delete('/blogs/:id', async (req,res) => {
  const id = req.params.id
//or 
// const {id} = req.params

await Blog.findByIdAndDelete(id)

res.status(200).json({
  message: "blog deleted successfully"
})

})



//start server
app.listen(2000, () => {
  console.log("Server / NodeJs is running at port 2000");
});
