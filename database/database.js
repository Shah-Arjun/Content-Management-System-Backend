const mongoose = require("mongoose");

exports.connectDatabase = async() => {
  await mongoose.connect("mongodb+srv://cms:cms123@cluster0.6pd6gqs.mongodb.net/?retryWrites=true&w=majority&appName=cluster0");
  console.log("Database connected successfully.");
};


// or

// const connectDatabase = () => {
//     mongoose.connect("mongodb+srv://cms:cms123@cluster0.6pd6gqs.mongodb.net/?retryWrites=true&w=majority&appName=cluster0")
//     .then("DB connected successfully")
// }
// export default connectDatabase;
