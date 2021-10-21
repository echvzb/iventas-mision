import { useContext, useRef } from "react";
import { ChatContext } from "..";

const MessageControl = () => {
  const msgInp = useRef();
  const { sendMessage } = useContext(ChatContext);
  return (
    <form id="MessageControl">
      <input
        type="text"
        name="msg"
        id="msg"
        autoComplete="off"
        placeholder="Escribe un mensaje..."
        ref={msgInp}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          sendMessage(msgInp.current.value);
          msgInp.current.value = "";
        }}
      />
    </form>
  );
};

export default MessageControl;
