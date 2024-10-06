const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRound = 10;

async function addUser(req, res) {
  try {
    // first we need to check wheather email already exists
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.end("Email already exists");
    } else {
      console.log("Received form data:", req.body); // Log the form data
      let password = bcrypt.hashSync(req.body.password, saltRound);
      console.log("Password:", password);
      let user = new User(req.body);
      user.password = password;
      await user.save();
      res.redirect("/");
    }
  } catch (err) {
    console.log("Error:", err);
  }
}

async function addNewUser(req, res) {
  try {
    let existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(400).send({ message: "Email already exists" });
    } else {
      console.log("Received form data:", req.body);

      let password = await bcrypt.hash(req.body.password, saltRound);
      console.log("Password:", password);

      let newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: password,
        country: req.body.country,
        mobileNo: req.body.mobileNo
      });

      res.redirect("/usertable");
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    console.log(email, password); // Verify email and password

    const user = await User.findOne({ email });
    console.log(user); // Verify user data

    if (!user) {
      return res.status(401).send("User doesn't exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Password is incorrect");
    }

    if (user.userType === 1) {
      res.render("dashboard");
    } else {
      res.render("normaluser");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function getUsers(req, res) {
  try {
    let users = await User.find({});
    console.log("All users:", users);
    res.render("usertable", {
      users: users.filter((user) => user.email !== "admin@rdec.in")
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
}

async function getUserForEdit(req, res) {
  try {
    // res.render("studentedit", { student: student });
    let id = req.params.id;
    console.log("Users Id: " + id);
    let user = await User.findOne({ _id: id });
    console.log("User: " + User);
    // res.send(student);
    res.render("userforupdate", { user: user });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

async function updateUser(req, res) {
  try {
    let id = req.params.id;
    console.log("User Id: " + id);
    let user = await User.findOne({ _id: id });
    console.log("User: ", user);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.mobileNo = req.body.mobileNo;
    user.country = req.body.country;
    user.password = req.body.password;
    await user.save();
    let users = await User.find({});
    console.log("All users:", users);
    res.render("usertable", {
      users: users.filter((user) => user.email !== "admin@rdec.in")
    });
    // res.end("<h1>Something is happeing while updation!!</h1>");
  } catch (err) {
    console.error("Something went wrong!!", err);
  }
}

async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    console.log("User Id: " + id);
    await User.deleteOne({ _id: id });
    let users = await User.find({});
    console.log("All users:", users);
    res.render("usertable", {
      users: users.filter((user) => user.email !== "admin@rdec.in")
    });
  } catch (err) {
    console.error("Something went wrong!!", err);
  }
}

module.exports = {
  addUser,
  loginUser,
  getUsers,
  deleteUser,
  updateUser,
  getUserForEdit,
  addNewUser
};
