const { Chat, User } = require("./Models");

const createMessage = async (room, sender, message) => {
  try {
    const c = await Chat.findOne({ room });
    if (!c) {
      await Chat.create({ room, messages: [{ sender, message }] });
    } else {
      c.messages = [...c.messages, { sender, message }];
      await c.save();
    }
  } catch (err) {
    console.error(err);
  }
};

const getMessages = async (room) => {
  try {
    const c = await Chat.findOne({ room });
    if (c) return await c.messages;
    return [];
  } catch (err) {
    console.error(err);
  }
};

const getUser = (id, fields = "") => User.findById(id, fields).lean();

const getUserLogin = (email) => User.findOne({ email }).lean();

module.exports = {
  createMessage,
  getMessages,
  getUser,
  getUserLogin,
};
