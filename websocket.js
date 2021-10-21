const { createMessage, getMessages, getUser } = require("./db");

const getRoom = (sender, receiver) =>
  sender < receiver ? receiver + sender : sender + receiver;

const websocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("join chat", async ({ sender, receiver }) => {
      const room = getRoom(sender, receiver);
      const messages = await getMessages(room);
      const contact = await getUser(
        receiver,
        "birthDate curp email priority problem promotion name pictureUrl phone notes"
      );
      socket.join(room);
      socket.emit("initial messages", { messages, contact });
    });
    socket.on("message", async ({ sender, receiver, message }) => {
      const room = getRoom(sender, receiver);
      await createMessage(room, sender, message);
      io.to(room).emit("message", { sender, message });
    });
  });
};

module.exports = websocket;
