import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";

import { useAuth } from "@Contexts/AuthContext";

function ResetPassword() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();

  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (emailRef.current.value.length > 0) {
      //
      try {
        setError("");
        setMessage("");
        setLoading(true);
        await resetPassword(emailRef.current.value);
        setMessage("Please check your email for further instructions");
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    } else {
      setError("please fill the empty fields");
    }
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Reset Password</h2>
        <Card>
          <Card.Body>
            {error.length > 0 && <Alert variant="danger">{error}</Alert>}
            {message.length > 0 && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Button
                className="w-100 text-center"
                disabled={loading}
                type="submit"
              >
                Send password reset link
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="mt-4 text-center">
          <Link to="/">Login</Link>
        </div>
      </div>
    </Container>
  );
}

export default ResetPassword;
