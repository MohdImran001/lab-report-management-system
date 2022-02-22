import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert, Container } from "react-bootstrap";
import toast from "react-hot-toast";

import ReportsApi from "@Services/reports.api";
import { useAuth } from "@Contexts/AuthContext";
import GeneratePDF from "@Utils/pdf";

const DownloadReportFromUrl = () => {
  const { serialNo, token } = useParams();
  const { anonymousSignIn } = useAuth();

  useEffect(() => {
    async function verifyReport() {
      const id = toast.loading("downloading report...");
      try {
        // signIn user anonymously to access firestore
        await anonymousSignIn();
        const report = await ReportsApi.getById(serialNo);

        if (!report) {
          toast.error("This report doesn't exists", { id });
          return;
        }

        if (report.token !== token) {
          toast.error("Unauthorized report, please contact the lab", { id });
          return;
        }

        await GeneratePDF(report, true);
        toast.success("Report has been downloaded", { id });
      } catch (err) {
        console.log(err);
        toast.error("An error occured, please reload the page", { id });
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
        <Alert variant="primary">XYZ LAB PROJECT</Alert>
        <a href="https://mohdimran.vercel.app">
          This project is developed by Mohammad Imran.
        </a>
      </div>
    </Container>
  );
};

export default DownloadReportFromUrl;
