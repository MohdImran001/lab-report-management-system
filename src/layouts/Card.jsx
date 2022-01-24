import React from "react";
import { Card } from "react-bootstrap";

export default function Card({ title, children }) {
  return (
    <Card>
      <Card.Title> {title} </Card.Title>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}
