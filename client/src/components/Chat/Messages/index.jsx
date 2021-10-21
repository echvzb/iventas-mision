import TopBar from "./TopBar";
import MessageControl from "./MessageControl";
import MessagesContent from "./MessagesContent";

const Messages = () => {
  return (
    <div id="Messages">
      <TopBar />
      <MessagesContent />
      <MessageControl />
    </div>
  );
};

export default Messages;
