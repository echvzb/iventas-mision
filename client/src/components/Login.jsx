import { useRef, useContext } from "react";
import { AppContext } from "../App";

const Login = () => {
  const passwordRef = useRef();
  const emailRef = useRef();
  const { setUser } = useContext(AppContext);
  const signIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      const u = await res.json();
      if (res.status === 200) setUser({ ...u, isAuthenticated: true });
    } catch (err) {
      console.error(err);
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  return (
    <div id="Login">
      <div className="feature-img">
        <div className="svg" />
      </div>
      <div className="content">
        <h1>Iniciar sesión</h1>
        <form>
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            placeholder="Ingresa tu correo"
            required
            ref={emailRef}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            required
            ref={passwordRef}
          />
          <button onClick={signIn}>Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
