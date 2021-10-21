import { useContext } from "react";
import { ChatContext } from "..";

const TopBar = () => {
  const {
    toggleSidebarMobile,
    activeContact: { name, pictureUrl },
  } = useContext(ChatContext);
  return (
    <div id="TopBar">
      <div
        className="profile-picture"
        style={{ backgroundImage: `url("${pictureUrl}")` }}
      />
      <span className="username">{name}</span>
      <button onClick={() => toggleSidebarMobile()} />
    </div>
  );
};

export default TopBar;
