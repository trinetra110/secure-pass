import React, { useState } from "react";
//import axios from "axios";
import owasp from "owasp-password-strength-test";

const PasswordChecker = () => {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState([]);

  const checkPasswordStrength = async () => {
    try {
      const tested = owasp.test(password);
      const isStrong = tested.strong;
      const errors = tested.errors;
      console.log("YES");
      setStatus(isStrong ? "Strong" : "Weak");
      setErrors(errors);
    } catch (err) {
      console.log(err);
    }
    /*await axios
      .get("http://localhost:5000/api/check-password", { password: password })
      .then((res) => {
        setStatus(res.data.status);
      })
      .catch((err) => console.error("Error checking password:", err));*/
  };

  const handleChange = (event) => {
    setPassword(event.target.value);
    checkPasswordStrength(event.target.value);
  };

  return (
    <section className="password-checker">
      <h2>Enter your password:</h2>
      <input type="text" value={password} onChange={handleChange} />
      <div className="status">{status}</div>
      {errors.length !== 0 ? (
        <>
          <div className="status">Note:</div>
          {errors.map(function (error) {
            return <div className="status">{error}</div>;
          })}
        </>
      ) : null}
    </section>
  );
};

export default PasswordChecker;
