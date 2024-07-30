const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Recipe = require("./Recipe");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  addedRecipes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  likedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  checkedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

// Virtual for password confirmation during registration
userSchema
  .virtual("repeatPassword")
  .get(function () {
    return this._repeatPassword;
  })
  .set(function (value) {
    this._repeatPassword = value;
  });

// Validate repeatPassword only during registration
userSchema.pre("validate", function (next) {
  if (this.isNew) {
    if (!this._repeatPassword) {
      this.invalidate("repeatPassword", "Password confirmation is required.");
    } else if (this.password !== this._repeatPassword) {
      this.invalidate("repeatPassword", "The passwords should be matching.");
    }
  }
  next();
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
