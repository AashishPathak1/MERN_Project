const path = require("path");
const express = require("express");
const connection = require("./connection");
const app = express();
const userRoute = require("./routes/user");
const bookRoute = require("./routes/book");
// here downwards common and common.createAdmin uncomment in the case of making a new admin
// const common = require("./helper/common");
// common.createAdmin();

// Calling the connection function
connection();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session is used to maintain the session around the browser
const session = require("express-session");
// session using to keep track the activity on the browser
app.use(
  session({
    secret: "yourSecretKey", // Replace with your secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  })
);

// Setting up the view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.set("views", path.join(__dirname, "views")); // Set views directory correctly

// Serve static files
app.use(express.static(path.join(__dirname, "public"))); // Correct way to serve static files
app.use(express.static("public"));

// Calling the routes
app.use("/", bookRoute); // Use book routes
app.use("/", userRoute); // Use user routes

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Starting the server
app.listen(3000, (err) => {
  if (err) {
    console.log("Error in starting the server: ", err);
  } else {
    console.log("Server is running at http://localhost:3000");
  }
});
