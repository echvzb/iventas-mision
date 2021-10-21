import { useEffect, createContext, useState, useContext } from "react";
import io from "socket.io-client";
import { AppContext } from "../../App";
import Messages from "./Messages";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

export const ChatContext = createContext({
  sendMessage() {},
  messageBlocks: [],
  activeContact: {},
  toggleSidebarMobile() {},
});

const socket = io();

const Chat = () => {
  const { user } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messageBlocks, setMessageBlocks] = useState([]);
  const [activeContact, setActiveContact] = useState({ id: user.contacts[0] });
  useEffect(() => {
    const appendMessage = (arr, sender, message, i = true) => {
      const isReceived = sender === activeContact.id;
      if (i === 0 || arr[arr.length - 1].isReceived !== isReceived)
        return [...arr, { isReceived, messages: [message] }];
      arr[arr.length - 1].messages.push(message);
      return [...arr];
    };
    socket.emit("join chat", { sender: user._id, receiver: activeContact.id });
    socket.on("initial messages", ({ messages, contact }) => {
      setMessageBlocks(
        messages.reduce(
          (acum, { message, sender }, i) =>
            appendMessage(acum, sender, message, i),
          []
        )
      );
      setActiveContact((prevState) => ({ ...prevState, ...contact }));
    });
    socket.on("message", ({ sender, message }) => {
      setMessageBlocks((prevState) =>
        appendMessage(prevState, sender, message, prevState.length)
      );
    });
    return () => socket.disconnect();
  }, [setMessageBlocks]);
  const sendMessage = (message) => {
    socket.emit("message", {
      sender: user._id,
      receiver: activeContact.id,
      message,
    });
  };
  const toggleSidebarMobile = () => setIsSidebarOpen((prevState) => !prevState);
  return (
    <ChatContext.Provider
      value={{ sendMessage, messageBlocks, activeContact, toggleSidebarMobile }}
    >
      <div id="Chat">
        <LeftSidebar />
        <Messages />
        <RightSidebar isSidebarOpen={isSidebarOpen} />
      </div>
    </ChatContext.Provider>
  );
};

export default Chat;
