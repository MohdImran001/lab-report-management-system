import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function PageNotFound404() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100 text-center mb-4" style={{ maxWidth: "400px" }}>
        <h2 className="">404</h2>
        <p>Oops!, the page you're looking for doesn't exist.</p>
        <div className="mt-4 text-center">
          <Link
            to="/"
            style={{
              border: "1px solid #eee",
              borderRadius: "5px",
              padding: "1rem 2rem",
              textDecoration: "none",
            }}
          >
            Go to Login Page
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default PageNotFound404;
