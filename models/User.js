const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true },
  age: { type: Number, required: true, min: 5, max: 150 },
  isInArmy: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", userSchema);
