import React from "react";

function Welcome() {
  const name = "Sibu";
  const message = `Welcome back, ${name}!`;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1> Hello!</h1>
      <p>{message}</p>
    </div>
  );
}

export default Welcome;
