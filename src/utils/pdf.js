import { PDFDocument } from "pdf-lib";
import { fetchCachedData, resetCache } from "./cache";
import {
  TEST_REPORT_URL,
  FINAL_REPORT_URL,
  STAMP_URL,
  EXCLUDED_FIELDS,
  QRCODE_BASE_URL,
  DOMAIN,
} from "./constants";

const downloadjs = require("downloadjs");

async function fillPDF(formData, flag, formUrl, photoUrl) {
  // Fetch Form and Candidate Photo
  const [formPdfBytes, photoBytes, stampBytes] = await Promise.all([
    fetchCachedData(formUrl).then((res) => res.arrayBuffer()),
    fetch(photoUrl).then((res) => res.arrayBuffer()),
    fetchCachedData(STAMP_URL).then((res) => res.arrayBuffer()),
  ]);

  // Load the PDF form into memory
  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const form = pdfDoc.getForm();

  // Fill text fields
  Object.keys(formData).forEach((key) => {
    if (EXCLUDED_FIELDS.indexOf(key) >= 0) return;
    const value = formData[key];
    const field = form.getTextField(key);
    field.setText(value);
  });

  // Fill GovtId (Passport/Aadhaar)
  const govtId = form.getTextField("govtId");
  const govtIdField = form.getTextField("govtIdValue");
  if (formData.passport.length > 0) {
    const passportNo = formData.passport;
    govtId.setText("PASSPORT NO.");
    govtIdField.setText(passportNo);
  } else if (formData.aadhaar.length > 0) {
    const aadhaarNo = formData.aadhaar;
    govtId.setText("AADHAAR NO.");
    govtIdField.setText(aadhaarNo);
  }

  // Set candidate photo; if exists
  if (photoUrl.length > 1) {
    const photo = await pdfDoc.embedJpg(photoBytes);
    const photoField = form.getButton("photo_af_image");
    photoField.setImage(photo);
  }

  // For generating final report
  if (flag) {
    // Generate QR Code
    if (formData.token) {
      const reportUrl = `${DOMAIN}/download/${formData.labSrNo}/${formData.token}`;
      const qrCodeUrl = `${QRCODE_BASE_URL}/?data=${reportUrl}&size=100x100`;
      const qrCodeBytesRes = await fetch(qrCodeUrl);
      const qrCodeBytes = await qrCodeBytesRes.arrayBuffer();
      const qrCode = await pdfDoc.embedPng(qrCodeBytes);
      const qrCodeField = form.getButton("qrcode_af_image");
      qrCodeField.setImage(qrCode);
    }

    // Set FIT/UNFIT value
    const value = formData.fit;
    const field = form.getTextField("fit-remarks");
    field.setText(value);
    if (value === "FIT") {
      form.getTextField("fit").setText(value);
    } else if (value === "UNFIT") {
      form.getTextField("unfit").setText(value);
    }

    // Embed the stamp
    const stamp = await pdfDoc.embedPng(stampBytes);
    const stampField = form.getButton("stamp_af_image");
    stampField.setImage(stamp);
  }

  form.flatten();
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

async function GeneratePDF(formData, flag) {
  const formUrl = flag ? FINAL_REPORT_URL : TEST_REPORT_URL;
  const photoUrl = formData.candidatePhoto;
  let pdfBytes;

  try {
    pdfBytes = await fillPDF(formData, flag, formUrl, photoUrl);
  } catch (err) {
    console.log(err, err.message);
    await resetCache();
    const e = new Error("Please reload the page");
    throw e;
  }

  downloadjs(pdfBytes, `Report-${formData.labSrNo}.pdf`, "application/pdf");
}

export default GeneratePDF;
