import React, { useState } from "react";
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
  };

  const handleChange = (event) => {
    setPassword(event.target.value);
    checkPasswordStrength(event.target.value);
  };

  return (
    <section className="password-checker">
      <h1>Password Checker</h1>
      <h3>Enter your password:</h3>
      <input type="text" value={password} onChange={handleChange} />
      {status === "Strong" ? <div className="status-green">STRONG</div> : <></>}
      {status === "Weak" ? <div className="status-red">WEAK</div> : <></>}
      {errors.length !== 0 ? (
        <>
          <div className="status-red">NOTE:</div>
          {errors.map(function (error) {
            return <div className="status-red">{error}</div>;
          })}
        </>
      ) : null}
    </section>
  );
};

export default PasswordChecker;
