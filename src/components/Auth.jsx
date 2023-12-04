import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState, useEffect } from "react";

export function Auth({ onLogin }) {
  let [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {}, [isLogged]);
  //   register
  const registerIntoJoural = async () => {
    // onLogin();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // after entering mail and password, new user is created on: https://console.firebase.google.com/project/travel-journal-project-405412/authentication/users
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("here logged");
      setIsLogged(!isLogged);

      console.log(isLogged);
      onLogin(isLogged);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("logged out of journal");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-element">
      {/* <h3>Log into your journal:</h3> */}
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {isLogged ? (
        <button className="btn" onClick={logOut}>
          Logout
        </button>
      ) : (
        <button className="btn" onClick={registerIntoJoural}>
          Register
        </button>
      )}
      <button className="btn" onClick={handleLogIn}>
        LogIn
      </button>
    </div>
  );
}
