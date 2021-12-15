import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Container } from "react-bootstrap";
import toast from "react-hot-toast";

import ReportsApi from "@Services/firebase.service";
import GeneratePDF from "@Helpers/pdf.helper";

const DownloadReportFromUrl = () => {
  const [msg, setMsg] = useState("");
  const { serialNo, token } = useParams();

  const downloadReport = async (report) => {
    setMsg("Downloading Report...");
    const toastId = toast.loading("generating report...");

    try {
      await GeneratePDF(report, true);
      toast.success("Report Generated Successfully", { id: toastId });
    } catch (err) {
      console.log(err);
      toast.error(err.message, { id: toastId });
    }

    setMsg("Report has been downloaded!");
  };

  useEffect(() => {
    async function verifyReport() {
      let report = null;
      try {
        report = await ReportsApi.getById(serialNo);
        if (report && report.token === token) {
          await downloadReport(report);
        } else {
          setMsg("Couldn't find report, please contact the lab");
        }
      } catch (err) {
        console.log(err);
        setMsg("An error occured!, please try again later");
      }
    }

    verifyReport();
  }, []);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ textAlign: "center", marginTop: "10rem" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {msg.length > 0 && <Alert variant="primary">{msg}</Alert>}
      </div>
    </Container>
  );
};

export default DownloadReportFromUrl;
