import { useContext } from "react";
import { AppContext } from "../../App";
import Profile from "./Profile";
import Sidebar from "./Sidebar";

const LeftSidebar = () => {
  const {
    user: { name, pictureUrl, phone },
  } = useContext(AppContext);
  return (
    <Sidebar position="left">
      <Profile name={name} pictureUrl={pictureUrl} phone={phone} />
      <button>
        <div className="icon" />
        <span>Chat</span>
      </button>
      <a href="/logout" className="logout">
        Cerrar sesión
      </a>
    </Sidebar>
  );
};

export default LeftSidebar;
