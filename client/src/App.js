import React, { useState } from "react";
import Hero from "./components/Hero.js";
import PasswordChecker from "./components/PasswordChecker.js";
import PasswordGenerator from "./components/PasswordGenerator.js";
import AddSecret from "./components/AddSecret.js";
import ReadSecret from "./components/ReadSecret.js";
import ModifySecret from "./components/ModifySecret.js";
import DeleteSecret from "./components/DeleteSecret.js";
import Footer from "./components/Footer.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import axios from "axios";
import app from "./firebaseConfig.js";

const App = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState([]);
  const [activeTab, setActiveTab] = useState("ADD");
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        /*const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;*/
        setUser(result.user);
        await axios
          .post("http://localhost:5000/api/auth", { email: result.user.email })
          .then((res) => {
            //alert(res.data);
          })
          .catch((err) =>
            console.error("Error occurred while authenticating:", err)
          );
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        /*const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);*/
      });
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
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/favicon.ico" alt="Secure-Pass logo" className="navbar-logo-pic" />
        </div>
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
      <Hero />
      <PasswordChecker />
      <PasswordGenerator />
      {user.length === 0 ? (
        <>
          <section className="secret-text-management">
            <h2>You need to sign in to use all the features</h2>
          </section>
        </>
      ) : (
        <section className="secret-text-management">
          <h2>Secret Text Manager</h2>
          <h3>NOTE: Remember your KEY always</h3>
          <div className="tabs">
            <button onClick={() => setActiveTab("ADD")}>ADD</button>
            <button onClick={() => setActiveTab("READ")}>READ</button>
            <button onClick={() => setActiveTab("MODIFY")}>MODIFY</button>
            <button onClick={() => setActiveTab("DELETE")}>DELETE</button>
          </div>
          {activeTab === "ADD" && <AddSecret />}
          {activeTab === "READ" && <ReadSecret />}
          {activeTab === "MODIFY" && <ModifySecret />}
          {activeTab === "DELETE" && <DeleteSecret />}
        </section>
      )}
      <Footer />
    </>
  );
};

export default App;
