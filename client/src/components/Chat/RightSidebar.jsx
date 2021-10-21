import { useState, useLayoutEffect, useRef, useContext } from "react";
import { ChatContext } from ".";
import Sidebar from "./Sidebar";
import Profile from "./Profile";

const InfoElem = ({ label, text }) => (
  <div className="info-elem">
    <span className="label">{label}</span>
    <span className="text">{text}</span>
  </div>
);

const RightSidebar = ({ isSidebarOpen }) => {
  const {
    activeContact: {
      name,
      phone,
      pictureUrl,
      email,
      priority,
      promotion,
      curp,
      birthDate,
      notes,
    },
    toggleSidebarMobile,
  } = useContext(ChatContext);
  const [isOpen, setIsOpen] = useState(true);
  const infoRef = useRef();
  const btnRef = useRef();
  const makeInfo = (label, text) => ({ label, text });
  const getAge = (birthDate) => {
    if (!birthDate) return "";
    const today = new Date();
    var bD = new Date(birthDate);
    let age = today.getFullYear() - bD.getFullYear();
    const m = today.getMonth() - bD.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bD.getDate())) age--;
    return age;
  };
  const items = [
    makeInfo("Notas", notes),
    makeInfo("Edad", getAge(birthDate)),
    makeInfo("correo", email),
    makeInfo("Prioridad", priority),
    makeInfo("Promoción", promotion),
    makeInfo("CURP", curp),
  ];
  useLayoutEffect(() => {
    [infoRef, btnRef].map((node) => node.current.classList.toggle("open"));
  }, [isOpen]);
  return (
    <Sidebar position="right" isSidebarOpen={isSidebarOpen}>
      <div className="content">
        <button className="sidebar-btn" onClick={() => toggleSidebarMobile()} />
        <Profile name={name} pictureUrl={pictureUrl} phone={phone}>
          <a href="#">Editar datos</a>
        </Profile>
        <button
          className="info-btn"
          ref={btnRef}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <span>Datos de contacto</span>
          <div className="icon" />
        </button>
        <div className="info" ref={infoRef}>
          {items.map((item) => (
            <InfoElem {...item} />
          ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default RightSidebar;
