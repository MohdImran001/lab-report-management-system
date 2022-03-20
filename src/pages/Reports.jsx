import React, { useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

import { SEARCH_OPTIONS } from "@Utils/constants";
import TableView from "@Components/reports-list/TableView";
import useReport from "@Hooks/useReport";

export default function Reports() {
  const {
    data,
    loading,
    refreshReports,
    findReports,
    deleteReport,
    isDeleting,
  } = useReport();

  const searchRef = useRef();
  const selectRef = useRef();

  useEffect(() => {
    refreshReports();
  }, []);

  return (
    <Container className="p-4 text-center" fluid>
      <Form onSubmit={(e) => refreshReports(e)}>
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
                onChange={() =>
                  findReports(
                    searchRef.current.value.toUpperCase(),
                    selectRef.current.value
                  )
                }
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
          deleteReport={deleteReport}
          isDeleting={isDeleting}
        />
      )}
    </Container>
  );
}
