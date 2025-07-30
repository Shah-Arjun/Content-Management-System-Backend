const { connectDatabase } = require("./database/database")

const app = require('express')()



//Database Connection function call
connectDatabase()


// GET API --> /
app.get('/', (req,res) => {
    res.json({
        status: 200,
        message: "Success, home api made easily"
    }) 
})


//start server
app.listen(5000 ,() => {
    console.log("Server / NodeJs is running at port 5000")
})