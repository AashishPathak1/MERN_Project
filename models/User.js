const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamps");
const Schema = mongoose.Schema;
// // this is used to encrypt the password
// const bcrypt = require("bcrypt");

let UserSchema = new Schema({
  firstName: {
    type: String
    // required: true
  },
  lastName: {
    type: String
  },
  country: {
    type: String
  },
  mobileNo: {
    type: String
  },
  email: {
    type: String,
    required: true,
    // Make sure email is unique
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // 1 for admin and 2 for users
  userType: { type: Number, default: 2, enum: [1, 2] },
  lastLogin: { type: Date },
  createdAt: Date,
  updatedAt: Date
});

// // Hash password before saving user
// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     const salt = await bcrypt.genSalt(10); // Generate salt
//     this.password = await bcrypt.hash(this.password, salt);
//     // this.confirmPassword = await bcrypt.hash(this.confirmPassword);// Hash password
//   }
//   next();
// });

// // Method to compare password
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password); // Compare with hashed password
// };

UserSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model("User", UserSchema);
