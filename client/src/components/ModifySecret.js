import React, { useState } from "react";
import axios from "axios";

const ModifySecret = () => {
  const [key, setKey] = useState("");
  const [newSecret, setNewSecret] = useState("");
  const [email, setEmail] = useState("");

  const handleModifySecret = async () => {
    await axios
      .post("http://localhost:5000/api/secrets/modify", { email: email, key: key, secret: newSecret })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => console.error("Error modifying data:", err));
  };

  return (
    <div className="modify-secret">
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
        value={newSecret}
        onChange={(e) => setNewSecret(e.target.value)}
        placeholder="Enter your new secret"
      />
      <button onClick={handleModifySecret}>MODIFY</button>
    </div>
  );
};

export default ModifySecret;
