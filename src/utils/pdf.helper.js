import { PDFDocument } from "pdf-lib";
import { fetchCachedData } from "@Helpers/cache.helper";
import {
  TEST_REPORT_URL,
  FINAL_REPORT_URL,
  STAMP_URL,
  EXCLUDED_FIELDS,
  QRCODE_BASE_URL,
  DOMAIN,
} from "../constants";

const downloadjs = require("downloadjs");

async function GeneratePDF(formData, flag) {
  const formUrl = flag ? FINAL_REPORT_URL : TEST_REPORT_URL;

  const photoUrl = formData.candidatePhoto;

  const [formPdfBytes, photoBytes, stampBytes] = await Promise.all([
    fetchCachedData(formUrl).then((res) => res.arrayBuffer()),
    fetch(photoUrl).then((res) => res.arrayBuffer()),
    fetchCachedData(STAMP_URL).then((res) => res.arrayBuffer()),
  ]);

  // Load a PDF with form fields
  const pdfDoc = await PDFDocument.load(formPdfBytes);

  // Get the form containing all the fields
  const form = pdfDoc.getForm();

  // set text fields
  Object.keys(formData).forEach((key) => {
    if (EXCLUDED_FIELDS.indexOf(key) >= 0) return;

    const value = formData[key];
    const field = form.getTextField(key);
    field.setText(value);
  });

  if (formData.passport.length > 0) {
    const passportNo = formData.passport;
    const govtIdField = form.getTextField("govtId");
    const passportField = form.getTextField("govtIdValue");

    passportField.setText(passportNo);
    govtIdField.setText("Passport No.");
  } else if (formData.aadhaar.length > 0) {
    const aadhaarNo = formData.aadhaar;
    const govtIdField = form.getTextField("govtId");
    const aadhaarField = form.getTextField("govtIdValue");

    aadhaarField.setText(aadhaarNo);
    govtIdField.setText("Aadhaar No.");
  }

  if (photoUrl.length > 1) {
    // Embed the photo
    const photo = await pdfDoc.embedJpg(photoBytes);
    // set candidate photo
    const photoField = form.getButton("photo");
    photoField.setImage(photo);
  }

  // For Final Report
  if (flag) {
    // Add QR Code image
    if (formData.token) {
      const reportUrl = `${DOMAIN}/download/${formData.labSrNo}/${formData.token}`;
      const qrCodeUrl = `${QRCODE_BASE_URL}/?data=${reportUrl}&size=100x100`;
      console.log(reportUrl, qrCodeUrl);

      const qrCodeBytesRes = await fetch(qrCodeUrl);
      const qrCodeBytes = await qrCodeBytesRes.arrayBuffer();

      const qrCode = await pdfDoc.embedPng(qrCodeBytes);
      const qrCodeField = form.getButton("qrcode");
      qrCodeField.setImage(qrCode);
    }

    // Set FIT/UNFIT value
    const value = formData.fit;
    const field = form.getTextField("fit-remarks");
    field.setText(value);
    if (value === "FIT") {
      form.getTextField("fit").setText(value);
      form.getTextField("unfit").setText("");
    } else if (value === "UNFIT") {
      form.getTextField("fit").setText("");
      form.getTextField("unfit").setText(value);
    }

    // Embed the stamp
    const stamp = await pdfDoc.embedPng(stampBytes);
    const stampField = form.getButton("stamp");
    stampField.setImage(stamp);
  }

  form.flatten();
  const pdfBytes = await pdfDoc.save();
  downloadjs(pdfBytes, `Report-${formData.labSrNo}.pdf`, "application/pdf");
}

export default GeneratePDF;
