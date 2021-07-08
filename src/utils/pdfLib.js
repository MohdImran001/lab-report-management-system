import { PDFDocument } from "pdf-lib";

import { 
  TEST_REPORT_URL, 
  FINAL_REPORT_URL, 
  STAMP_URL, 
  CACHE_NAME 
} from "../constants";

async function fetchAndCacheData(url) {
  let cache;
  return caches
    .open(CACHE_NAME)
    .then((cacheStorage) => {
      cache = cacheStorage;
      return cacheStorage.add(url);
    })
    .then((someReponse) => {
      return cache.match(url);
    })
    .then((cachedResponse) => cachedResponse);
}

async function fetchCachedData(url) {
  return caches
    .open(CACHE_NAME)
    .then((cacheStorage) => {
      return cacheStorage.match(url);
    })
    .then((cachedResponse) => {
      if (!cachedResponse || !cachedResponse.ok) {
        console.log("fetch and save data");
        return fetchAndCacheData(url);
      }
      return cachedResponse;
    })
    .catch((err) => console.log(err));
}

async function generatePDF(formData, flag) {
  const formUrl = flag
    ? FINAL_REPORT_URL
    : TEST_REPORT_URL;

  const photoUrl = formData.candidatePhoto;

  const [formPdfBytes, photoBytes, stampBytes] = await Promise.all([
    fetchCachedData(formUrl).then((res) => res.arrayBuffer()),
    fetch(photoUrl).then((res) => res.arrayBuffer()),
    fetchCachedData(STAMP_URL).then((res) => res.arrayBuffer()),
  ]);

  // Load a PDF with form fields
  const pdfDoc = await PDFDocument.load(formPdfBytes);

  // Embed the photo
  const photo = await pdfDoc.embedJpg(photoBytes);

  // Get the form containing all the fields
  const form = pdfDoc.getForm();

  // set text fields
  Object.keys(formData).map((key, index) => {
    if (key === "photoName" || key === "candidatePhoto" || key === "fit") return index;

    const value = formData[key];
    const field = form.getTextField(key);
    field.setText(value);
    return index;
  });

  // set candidate photo
  const photoField = form.getButton("photo");
  photoField.setImage(photo);

  if (flag) {
    // Set FIT/UNFIT value
    const value = formData['fit'];
    const field = form.getTextField('fit');
    field.setText(value);

    // Embed the stamp
    const stamp = await pdfDoc.embedPng(stampBytes);
    const stampField = form.getButton("stamp");
    stampField.setImage(stamp);
  }

  form.flatten();

  const pdfBytes = await pdfDoc.save();

  require("downloadjs")(
    pdfBytes,
    `Report-${formData["labSrNo"]}.pdf`,
    "application/pdf"
  );

  return;
}

export default generatePDF;