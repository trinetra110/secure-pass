import React, { useState } from "react";
import AddSecret from "./AddSecret.js";
import ReadSecret from "./ReadSecret.js";
import ModifySecret from "./ModifySecret.js";
import DeleteSecret from "./DeleteSecret.js";

const SecretTextManagement = () => {
  const [activeTab, setActiveTab] = useState("ADD");

  /*if (!isSignedIn) {
    return (
      <section className="secret-text-management">
        <h2>You need to sign in to use all the features</h2>
      </section>
    );
  }*/
  

  return (
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
  );
};

export default SecretTextManagement;
