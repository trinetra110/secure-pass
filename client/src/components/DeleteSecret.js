import React, { useState } from "react";
import axios from "axios";

const DeleteSecret = () => {
  const [key, setKey] = useState("");
  const [email, setEmail] = useState("");

  const handleDeleteSecret = async () => {
    await axios
      .delete("http://localhost:5000/api/secrets/delete", { email: email, key: key })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => console.error("Error deleting data:", err));
  };

  return (
    <div className="delete-secret">
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
      <button onClick={handleDeleteSecret}>DELETE</button>
    </div>
  );
};

export default DeleteSecret;
