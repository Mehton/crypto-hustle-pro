import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1 style={{ color: "white", padding: "1rem" }}>Crypto Hustle</h1>
      <p>There's nothing here!</p>
      <Link style={{ color: "white", padding: "1rem" }} to="/">
        Back to Home
      </Link>
    </>
  );
};
export default NotFound;
