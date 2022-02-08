import React, { useState } from "react";

import toast from "react-hot-toast";
import { useHistory, Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

import { useAuth } from "@Contexts/AuthContext";
import { UpdateReferenceModal } from "@Components/global";

export default function NavigationBar() {
  const { logout } = useAuth();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  async function handleLogout() {
    setLoading(true);
    const id = toast.loading("Logging out!");

    try {
      await logout();
      toast.success("Logged out", { id });
    } catch (err) {
      toast.error("An error occurred", { id });
      console.log(err);
    }

    setLoading(false);
    history.push("/");
  }

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand>
            <img
              alt="brand"
              src="/assets/images/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{ marginRight: "1rem" }}
            />
            <Link
              to="/dashboard"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                color: "#000",
                fontWeight: "500",
              }}
            >
              MEDITRUST LAB
            </Link>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Button
              className="btn btn-primary"
              style={{ marginRight: "1rem" }}
              onClick={() => {
                if (window.location.href.includes("edit")) {
                  history.push("/dashboard/create-report");
                  window.location.reload();
                } else {
                  history.push("/dashboard/create-report");
                }
              }}
            >
              New Report
            </Button>

            <Link
              className="btn btn-dark"
              to="/dashboard/reports"
              style={{ marginRight: "6rem" }}
            >
              Find Report
            </Link>

            <Link
              className="btn btn-outline-primary"
              to="/dashboard/change-password"
              style={{ marginLeft: "1rem", marginRight: "1rem" }}
            >
              Change Password
            </Link>

            <Button onClick={showModal}>Reset Refrence</Button>

            <Button
              variant="primary"
              onClick={handleLogout}
              style={{ marginLeft: "1rem" }}
              disabled={loading}
            >
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <UpdateReferenceModal show={show} closeModal={closeModal} />
    </>
  );
}
