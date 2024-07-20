import React, { useState } from "react";
import axios from "axios";

const AddSecret = () => {
  const [secret, setSecret] = useState("");
  const [key, setKey] = useState("");
  const [email, setEmail] = useState("");

  const handleAddSecret = async () => {
    await axios
      .post("http://localhost:5000/api/secrets/add", { email: email, key: key, secret: secret })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => console.error("Error adding data:", err));
  };

  return (
    <div className="add-secret">
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
      <input
        type="text"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        placeholder="Enter your secret"
      />
      <button onClick={handleAddSecret}>ADD</button>
    </div>
  );
};

export default AddSecret;
