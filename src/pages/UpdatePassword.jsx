import React, { useState, useRef } from "react";

import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";

import { useAuth } from "@Contexts/AuthContext";

function UpdatePassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef();

  const { updatePassword, logout } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value.length > 0) {
      setError("");
      setLoading(true);
      const id = toast.loading("Updating password...");

      try {
        await updatePassword(passwordRef.current.value);
        toast.success("Password changed successfully", { id });

        setTimeout(async () => {
          await logout();
          history.push("/");
        }, 1000);
      } catch (err) {
        console.log(err);
        setError(err.message);
        toast.error("An error occurred", { id });
      }

      setLoading(false);
    } else {
      setError("please fill the empty fields");
    }
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "30vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            {error.length > 0 && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="password">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button
                className="w-100 text-center"
                disabled={loading}
                type="submit"
              >
                Update Password
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default UpdatePassword;
