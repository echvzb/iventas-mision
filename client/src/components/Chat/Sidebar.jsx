const Sidebar = ({ children, position, isSidebarOpen }) => (
  <div className={`sidebar ${position}${isSidebarOpen ? " open" : ""}`}>
    {children}
  </div>
);

export default Sidebar;
