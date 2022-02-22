import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

import ReportsApi from "@Services/reports.api";
import { SEARCH_OPTIONS } from "@Utils/constants";
import TableView from "@Components/reports-list/TableView";

export default function Reports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef();
  const selectRef = useRef();

  async function findReports() {
    setLoading(true);

    const query = searchRef.current.value.toUpperCase();
    const option = selectRef.current.value;

    if (query.length === 0) {
      setLoading(false);
      return;
    }

    let result = [];
    switch (option) {
      case "labSrNo":
        result = await ReportsApi.searchByLabSrNo(query);
        break;

      case "fullName":
        result = await ReportsApi.searchByName(query);
        break;

      case "passport":
        result = await ReportsApi.searchByPassportNo(query);
        break;

      case "dateExamined":
        result = await ReportsApi.searchByExaminedDate(query);
        break;

      default:
        result = [];
    }

    if (!result.empty) {
      setData(result.docs);
    } else {
      setData([]);
    }

    setLoading(false);
  }

  async function fetchReports(e) {
    setLoading(true);

    if (e) e.preventDefault();
    const toastId = toast.loading("Loading reports...");

    let reports;
    try {
      reports = await ReportsApi.get();
      toast.success(`Fetched ${reports.docs.length} reports`, { id: toastId });
    } catch (err) {
      console.log(err);
      toast.error("An error occured!", { id: toastId });
    }

    setData(reports.docs);
    setLoading(false);
  }

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <Container className="p-4 text-center" fluid>
      <Form onSubmit={(e) => fetchReports(e)}>
        <Row
          style={{
            justifyContent: "center",
            marginLeft: "2rem",
          }}
        >
          <Col className="text-left" xs={2}>
            <Form.Group>
              <Form.Label
                style={{
                  fontWeight: "bold",
                }}
              >
                Find By
              </Form.Label>
              <Form.Control as="select" ref={selectRef} custom>
                {Object.keys(SEARCH_OPTIONS).map((option, index) => {
                  return (
                    <option value={SEARCH_OPTIONS[option]} key={index}>
                      {option}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              style={{
                marginTop: "2rem",
              }}
            >
              <Form.Control
                type="text"
                placeholder="search reports"
                ref={searchRef}
                onChange={findReports}
              />
              <Form.Label
                style={{
                  fontSize: 12,
                }}
              >
                When searching by Lab Sr No, enter only number. Do not use MT
                prefix.
              </Form.Label>
            </Form.Group>
          </Col>
          <Col>
            <Button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "2rem",
                marginLeft: "-4rem",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                letterSpacing: ".2rem",
                fontWeight: "400",
                textTransform: "capitalize",
                maxwidth: "100%",
              }}
            >
              RELOAD LATEST REPORTS
            </Button>
          </Col>
        </Row>
      </Form>
      {loading && (
        <Row
          style={{
            justifyContent: "center",
          }}
        >
          <img
            src="/assets/images/search-loader.gif"
            alt="infinity"
            style={{
              width: "2rem",
            }}
          />
        </Row>
      )}
      {data.length === 0 && (
        <Row>
          <Col className="text-center">
            <p>No Records Found!</p>
          </Col>
        </Row>
      )}
      {data.length > 0 && (
        <TableView
          reports={data}
          updateData={(updatedReportsList) => setData(updatedReportsList)}
        />
      )}
    </Container>
  );
}
