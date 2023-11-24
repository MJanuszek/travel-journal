import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export function Auth() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //   loging in
  const signIntoJoural = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    // after entering mail and password, new user is created on: https://console.firebase.google.com/project/travel-journal-project-405412/authentication/users
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
      <button className="btn" onClick={signIntoJoural}>
        Enter
      </button>
    </div>
  );
}
