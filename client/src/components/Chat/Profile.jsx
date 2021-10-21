const Profile = ({ children, name, phone, pictureUrl }) => (
  <div className="profile">
    <div
      className="profile-picture"
      style={{ backgroundImage: `url("${pictureUrl}")` }}
    />
    <div className="profile-info">
      <span className="name">{name}</span>
      <div className="phone">{phone}</div>
    </div>
    {children}
  </div>
);

export default Profile;
