import { useLayoutEffect, useRef, useContext } from "react";
import { ChatContext } from "..";
import { AppContext } from "../../../App";

const Message = ({ text }) => <span className="message">{text}</span>;

const MessageBlock = ({ messages, isReceived, pictureUrl }) => (
  <div className={`msg-block${isReceived ? " right" : ""}`}>
    <div
      className="user-picture"
      style={pictureUrl ? { backgroundImage: `url("${pictureUrl}")` } : {}}
    />
    <div className="message-container">
      {messages.map((msg, i) => (
        <Message key={i} text={msg} />
      ))}
    </div>
  </div>
);

const MessagesContent = () => {
  const { messageBlocks, activeContact } = useContext(ChatContext);
  const { user } = useContext(AppContext);
  const MessagesRef = useRef();
  useLayoutEffect(() => {
    MessagesRef.current.scroll(0, MessagesRef.current.scrollHeight);
  }, [messageBlocks]);
  return (
    <div id="MessagesContent" ref={MessagesRef}>
      {messageBlocks.map(({ messages, isReceived }, i) => (
        <MessageBlock
          key={i}
          messages={messages}
          isReceived={isReceived}
          pictureUrl={isReceived ? activeContact.pictureUrl : user.pictureUrl}
        />
      ))}
    </div>
  );
};

export default MessagesContent;
