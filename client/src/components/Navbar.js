import React, { useState } from "react";
import axios from "axios";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import app from "../firebaseConfig.js";

const Navbar = () => {
  /*useEffect(() => {
    axios
      .get("http://localhost:5000/api/current_user")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error("Error fetching user details", err));
  }, []);

  const handleLogout = () => {
    axios.get("/api/logout").then(() => {
      setUser(null);
    });
  };*/
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState([]);
  const handleLogin = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        /*const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;*/
        setUser(result.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        /*const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);*/
      });
    if (user.length !== 0) {
      await axios
        .post("http://localhost:5000/api/auth", { email: user.email })
        .then((res) => {
          alert("yes");
          console.log("yes");
        })
        .catch((err) => console.error("Error adding data:", err));
    }
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Secure-Pass</div>
      <div className="navbar-actions">
        {user.length !== 0 ? (
          <>
            <img src={user.photoURL} alt="profile" className="profile-pic" />
            <button onClick={handleLogout}>Sign Out</button>
          </>
        ) : (
          <button onClick={handleLogin}>Sign Up/Sign In</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
