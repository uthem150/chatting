const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must type name"],
    unique: true,
  },
  //연결 id정보 저장
  token: {
    type: String,
  },
  online: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("User", userSchema);
