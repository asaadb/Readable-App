import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h3>404 ERROR. Page Not Found</h3>
      <Link to="/">Return to Home Page</Link>
    </div>
  );
};

export default NotFound;
