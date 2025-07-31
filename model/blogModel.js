const mongoose = require("mongoose");

//defining collection /table in sql
const blogSchema = new mongoose.Schema({      // blogSchema collection / table name
    title : {                                // column 1
        type : String,
        required : true,
    },
    subTitle : {                             // column 2
        type : String,
    },
    description : {                          //col 3
        type : String,
    }


// or if only on field inside column then  can be done as:
// title : String,
// subTitle: String,
// description : String


}, {
    timestamps: true           // to automatically attach blog post created date
});



const Blog = mongoose.model("Blog", blogSchema)   //mongoose malai euta 'Blog' nam ko model banayr de blogSchema use garera    and Blog variable ma hal
module.exports = Blog 


// or    (instead of 2 line)
//module.exports = mongoose.model("Blog", blogSchema)