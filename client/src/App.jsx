import { useEffect, useState, createContext } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";

export const AppContext = createContext({
  setUser() {},
  user: {},
});

const App = () => {
  const [user, setUser] = useState({ isAuthenticated: false });
  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    try {
      const res = await fetch("/user");
      const u = await res.json();
      if (res.status === 200) {
        setUser({ ...u, isAuthenticated: true });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  if (loading) return null;
  return (
    <AppContext.Provider value={{ setUser, user }}>
      <div className="app">{user.isAuthenticated ? <Chat /> : <Login />}</div>
    </AppContext.Provider>
  );
};

export default App;
