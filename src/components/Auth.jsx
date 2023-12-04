import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";

export function Auth() {
  let isLogged = false;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //   loging in
  const signIntoJoural = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // after entering mail and password, new user is created on: https://console.firebase.google.com/project/travel-journal-project-405412/authentication/users
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
    <div>
      <h3>Log into your journal:</h3>
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
        <button className="btn" onClick={signIntoJoural}>
          LogIn
        </button>
      )}
    </div>
  );
}
