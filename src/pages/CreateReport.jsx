import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import { Container, Row, Button } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";

// Report Components
import {
  SerialNoFields,
  CandidateInfoFields,
  MedicalExaminationFields,
  LabInvestigationFields,
  Remarks,
} from "@Components/new-report";

// Firebase Service
import ReportsApi from "@Services/reports.api";

// Utils
import GeneratePDF from "@Utils/pdf";
import { formatSavingData } from "@Utils/data";

// Constants
import { REPORT_FIELDS } from "@Utils/constants";

function CreateReport() {
  const [data, setData] = useState({
    report: { ...REPORT_FIELDS },
    edit: false,
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const history = useHistory();

  async function saveAndGenerateReport(formData) {
    setSaving(true);
    const id = toast.loading("Saving report ...");
    const formattedFormData = formatSavingData(formData);

    try {
      if (data.edit) {
        // if there is no token present for report, assign a new one
        if (!formattedFormData.token) {
          formattedFormData.token = uuidv4();
        }

        // Update report
        await ReportsApi.update(formattedFormData);
      } else {
        // Assign a unique token to new report
        formattedFormData.token = uuidv4();

        // Save report and get correct serial number and reference number
        const obj = await ReportsApi.save(formattedFormData);
        formattedFormData.labSrNo = obj.labSrNo;
        formattedFormData.refrenceNo = obj.refrenceNo;
      }

      // Generate PDF
      await GeneratePDF(formattedFormData, formData.reportCompleted);

      setError("");
      toast.success("Report saved successfully", { id });
      history.push("/dashboard/reports");
    } catch (err) {
      console.log(err, err.message);
      setError(`${err}: ${err.message}`);
      toast.error(err.message, { id });
    }

    setSaving(false);
  }

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      setLoading(true);

      const reportData = {
        report: { ...REPORT_FIELDS },
        edit: false,
      };

      const queryParams = new URLSearchParams(location.search);
      const labSrNo = queryParams.get("edit");
      const editReport = !!labSrNo;
      const toastId = editReport
        ? toast.loading("loading report ...")
        : toast.loading("preparing form for new report ...");

      if (editReport) {
        try {
          // Find report
          reportData.report = await ReportsApi.getById(labSrNo);
          reportData.edit = true;
        } catch (e) {
          // No report found
          toast.error("No report found with this serial no.", { id: toastId });
          history.push("/dashboard/reports");
        }
      }

      if (mounted) {
        setData(reportData);
      }
      toast.success("You're good to go", { id: toastId });
      setLoading(false);
    }

    fetchData();

    // This will be called when this component is unmount
    return () => {
      mounted = false;
    };
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
