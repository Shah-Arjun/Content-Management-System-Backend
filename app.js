const { connectDatabase } = require("./database/database");

const app = require("express")();

//Database Connection function call
connectDatabase();



// GET API --> /
app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Success, made home api",
  });
});



// CREATE API --> to create blog
app.post("/createBlog", (req, res) => {
  res.json({ 
    status: 200, 
    message: "Blog created successfully." });


    //or -for react hit to backend
    // res.status(200).json({
    //     message: "Blog created successfully"
    // })
});




//start server
app.listen(5000, () => {
  console.log("Server / NodeJs is running at port 5000");
});
