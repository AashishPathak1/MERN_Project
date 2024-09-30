const mongoose = require("mongoose");

// connecting to the database
async function connection() {
  try {
    await mongoose.connect("mongodb://localhost:27017/newProject");
    // await mongoose.connect("mongodb://localhost:27017/newProjectDB");
    console.log("Conncetion successful!!");
  } catch (err) {
    console.error("error in connecting DB", err);
  }
}

// export the connection function to use in index.js
module.exports = connection;
