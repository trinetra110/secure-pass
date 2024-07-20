import React, { useState } from "react";
//import axios from "axios";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");

  const generatePassword = async () => {
    let pass = "";
    let u = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let l = "abcdefghijklmnopqrstuvwxyz";
    let n = "0123456789";
    let s = "@#$&";
    let str = u + l + n + s;
    let char = Math.floor(Math.random() * u.length + 1);
    pass += u.charAt(char);
    char = Math.floor(Math.random() * l.length + 1);
    pass += l.charAt(char);
    char = Math.floor(Math.random() * n.length + 1);
    pass += n.charAt(char);
    char = Math.floor(Math.random() * s.length + 1);
    pass += s.charAt(char);
    for (let i = 1; i <= 16; i++) {
      char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  };

  return (
    <section className="password-generator">
      <button onClick={generatePassword}>GENERATE</button>
      <input type="text" value={password} readOnly />
      <button onClick={() => navigator.clipboard.writeText(password)}>
        COPY
      </button>
    </section>
  );
};

export default PasswordGenerator;
