import React, { useState } from "react";
import axios from "axios";

const ReadSecret = () => {
  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");
  const [email, setEmail] = useState("");

  const handleReadSecret = async () => {
    await axios
      .post("http://localhost:5000/api/secrets/read", {
        email: email,
        key: key,
      })
      .then((res) => {
        setSecret(res.data.secret);
        alert(res.data.message);
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  return (
    <>
      <div className="read-secret">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter your key"
        />
        <button onClick={handleReadSecret}>READ</button>
      </div>
      {secret && (
        <div className="read-secret">
          <input type="text" value={secret} readOnly />
          <button onClick={() => navigator.clipboard.writeText(secret)}>
            COPY
          </button>
        </div>
      )}
    </>
  );
};

export default ReadSecret;
