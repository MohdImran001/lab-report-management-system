import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function QuickAccessButtons() {
  return (
    <Container className="text-center pt-4">
      <h1>
        <img
          alt=""
          src="/assets/images/report-icon.png"
          className="d-inline-block align-top"
        />
      </h1>
      <br />
      <br />
      <Link
        to="/dashboard/create-report"
        className="btn btn-primary px-5"
        style={{ fontSize: "20px" }}
      >
        New Report
      </Link>
      <Link
        to="/dashboard/reports"
        className="btn btn-dark  ml-4 px-5"
        style={{ fontSize: "20px" }}
      >
        Find Report
      </Link>
    </Container>
  );
}
