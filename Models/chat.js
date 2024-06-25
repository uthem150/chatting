const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chat: String,
    user: {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      name: String,
    },
  },
  { timestamp: true }
);

model.exports = mongoose.model("Chat", chatSchema);
