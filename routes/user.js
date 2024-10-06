const express = require("express");
const usercontroller = require("../controllers/usercontroller");
const router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.render("loginpage");
});

router.get("/user/signup", (req, res) => {
  res.render("signuppage");
});

router.get("/add/new/user", (req, res) => {
  res.render("addnewuser");
});

router.post("/add/new/user", async (req, res) => {
  try {
    await usercontroller.addNewUser(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/add/user", async (req, res) => {
  try {
    await usercontroller.addUser(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    await usercontroller.loginUser(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/usertable", (req, res) => {
  // res.render("usertable");
  usercontroller.getUsers(req, res);
});

router.get("/booktable", (req, res) => {
  res.render("booktable");
});

router.get("/usertable", (req, res) => {
  res.render("usertable");
});

router.get("/edit/user/:id", (req, res) => {
  usercontroller.getUserForEdit(req, res);
});

router.post("/update/user/:id", (req, res) => {
  usercontroller.updateUser(req, res);
});

router.get("/delete/user/:id", (req, res) => {
  usercontroller.deleteUser(req, res);
});

router.get("/login", (req, res) => {
  res.render("loginpage");
});

module.exports = router;
