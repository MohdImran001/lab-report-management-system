import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Container, Row, Button } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";

// Report Components
import {
  SerialNoFields,
  CandidateInfoFields,
  MedicalExaminationFields,
  LabInvestigationFields,
  Remarks,
} from "@Components/Report";

// Firebase Service
import ReportsApi from "@Services/firebase.service";

// Helpers
import GeneratePDF from "@Helpers/pdf.helper";
import { formatSavingData } from "@Helpers/data.helper";

// Constants
import { REPORT_FIELDS } from "../constants";

function CreateReport() {
  const [data, setData] = useState({
    report: { ...REPORT_FIELDS },
    edit: false,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const history = useHistory();

  async function saveAndGenerateReport(formData) {
    setSaving(true);
    const id = toast.loading("Saving report ...");

    const formattedFormData = formatSavingData(formData);
    try {
      let obj;
      if (data.edit) {
        if (!formattedFormData.token) {
          formattedFormData.token = uuidv4();
          console.log("token doesn't exists");
        }
        await ReportsApi.update(formattedFormData);
      } else {
        formattedFormData.token = uuidv4();
        obj = await ReportsApi.save(formattedFormData);
        formattedFormData.labSrNo = obj.labSrNo;
        formattedFormData.refrenceNo = obj.refrenceNo;
      }

      await GeneratePDF(formattedFormData, formData.reportCompleted);

      toast.success("Report saved successfully", { id });
      setError("");
      history.push("/dashboard/reports");
    } catch (err) {
      console.log(err, err.message);
      toast.error(err.message, { id });
      setError(`${err}: ${err.message}`);
    }

    setSaving(false);
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const queryParams = new URLSearchParams(location.search);
      const labSrNo = queryParams.get("edit");
      const editReport = !!labSrNo;

      const toastId = editReport
        ? toast.loading("loading report ...")
        : toast.loading("creating new report ...");

      let reportData = null;
      if (editReport) {
        try {
          reportData = await ReportsApi.getById(labSrNo);
        } catch (e) {
          toast.error("No report found with this serial no.", { id: toastId });
          history.push("/dashboard/reports");
        }
        setData({
          report: reportData,
          edit: true,
        });
      } else {
        setData({
          report: { ...REPORT_FIELDS },
          edit: false,
        });
      }

      toast.success("You're good to go", { id: toastId });
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Container className="pt-4 text-center">
          <img src="/assets/images/loader.gif" alt="loader" />
        </Container>
      ) : (
        <Container
          style={{
            marginBottom: "5rem",
          }}
          className="pt-4"
        >
          <Row className="fill-report-icon text-center justify-content-center">
            <img
              src="/assets/images/fill-report.png"
              alt="fill-report-icon"
              style={{ width: "5rem" }}
            />
          </Row>

          <Formik
            initialValues={data.report}
            onSubmit={async (values) => {
              await saveAndGenerateReport(values);
            }}
          >
            <Form>
              <br />
              <SerialNoFields />
              <br />
              <CandidateInfoFields />
              <br />
              <MedicalExaminationFields />
              <br />
              <LabInvestigationFields />
              <br />
              <Remarks error={error} />
              <br />
              <Button
                disabled={saving}
                type="submit"
                className="px-4 py-2"
                style={{
                  fontSize: "1.2rem",
                  letterSpacing: "2px",
                  fontFamily: "Ubuntu, sans-serif",
                  marginTop: "2rem",
                }}
              >
                GENERATE REPORT
              </Button>
            </Form>
          </Formik>
        </Container>
      )}
    </>
  );
}

export default CreateReport;
