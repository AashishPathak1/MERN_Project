let User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRound = 10;
async function createAdmin() {
  try {
    let password = bcrypt.hashSync("12345", saltRound);
    let adminData = {
      name: "admin",
      userType: 1,
      email: "admin@rdec.in",
      password: password
    };
    let user = new User(adminData);
    await user.save();
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createAdmin
};
