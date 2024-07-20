import React, { useState } from "react";
//import Navbar from "./components/Navbar.js";
import Hero from "./components/Hero.js";
import PasswordChecker from "./components/PasswordChecker.js";
import PasswordGenerator from "./components/PasswordGenerator.js";
//import SecretTextManagement from "./components/SecretTextManagement.js";
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
import app from "./firebaseConfig.js";
//import { gapi } from "gapi-script";

const App = () => {
  /*const [isSignedIn, setIsSignedIn] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const handleSignIn = () => {
    const auth = gapi.auth2.getAuthInstance();
    auth.signIn().then((user) => {
      setProfile(user.getBasicProfile());
      setIsSignedIn(true);
    });
  };

  const handleSignOut = () => {
    const auth = gapi.auth2.getAuthInstance();
    auth.signOut().then(() => {
      setProfile(null);
      setIsSignedIn(false);
    });
  };*/
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState([]);
  const [activeTab, setActiveTab] = useState("ADD");
  const handleLogin = () => {
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
      {/* 
      <Navbar
      isSignedIn={isSignedIn}
        profile={profile}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />*/}
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
      <Hero />
      <PasswordChecker />
      <PasswordGenerator />
      {/*<SecretTextManagement isSignedIn={isSignedIn} />*/}
      {user.length === 0 ? (
        <>
          <section className="secret-text-management">
            <h2>You need to sign in to use all the features</h2>
          </section>
        </>
      ) : (
        <section className="secret-text-management">
          <h2>You can add/read/modify/delete your secret texts with a key.</h2>
          <h3>NOTE: Remember your KEY always.</h3>
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
