const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    pictureUrl: String,
    birthDate: Date,
    email: String,
    priority: String,
    problem: String,
    promotion: String,
    curp: String,
    password: String,
    contacts: [String],
    notes: String,
  },
  {
    collection: "users",
  }
);

const chatSchema = new mongoose.Schema(
  {
    room: String,
    messages: [
      {
        sender: String,
        message: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { collection: "chats" }
);

module.exports = {
  User: mongoose.model("User", userSchema),
  Chat: mongoose.model("Chat", chatSchema),
};
