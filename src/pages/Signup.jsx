import React, { useState, useRef } from "react";

import toast from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";

import { useAuth } from "@Contexts/AuthContext";

function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      emailRef.current.value.length > 0 &&
      passwordRef.current.value.length > 0
    ) {
      setError("");
      setLoading(true);
      const id = toast.loading("creating account...");

      try {
        await signup(emailRef.current.value, passwordRef.current.value);
        toast.success("Signup successful", { id });
        history.push("/dashboard");
      } catch (err) {
        toast.error("Oops an error occurred, try again!", { id });
        setError(err.message);
      }

      setLoading(false);
    } else {
      setError("please fill the empty fields");
    }
    setLoading(false);
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <Card>
          <Card.Body>
            {error.length > 0 && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Button
                className="w-100 text-center"
                disabled={loading}
                type="submit"
              >
                Sign Up
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

export default Signup;
