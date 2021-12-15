export const BASE_URL =
  "https://mohdimran001.github.io/lab-report-management-system/public/assets";
export const QRCODE_BASE_URL = "https://api.qrserver.com/v1/create-qr-code";
export const DOMAIN = process.env.REACT_APP_DOMAIN;
export const TEST_REPORT_URL = `${BASE_URL}/reports/test-report.pdf`;
export const FINAL_REPORT_URL = `${BASE_URL}/reports/final-report.pdf`;
export const STAMP_URL = `${BASE_URL}/images/stamp.png`;
export const CACHE_NAME = "meditrust_app";

export const ALLOWED_EXTNS = /(\.jpg|\.jpeg|\.png)$/i;

export const EXCLUDED_FIELDS = [
  "photoName",
  "candidatePhoto",
  "fit",
  "reportCompleted",
  "id",
  "lab",
  "refrence",
  "updatedAt",
  "createdAt",
  "passport",
  "aadhaar",
  "govtIdValue",
  "govtId",
  "token",
  "urineBilharziasis",
];

export const SEARCH_OPTIONS = {
  "Lab Sr No.": "labSrNo",
  "Full Name": "fullName",
  "Passport No": "passport",
  "Examined Date": "dateExamined",
};

export const REPORT_FIELDS = {
  // Serial Number
  labSrNo: "NOT ASSIGNED",
  refrenceNo: "NOT ASSIGNED",

  // Candidate Information
  dateExamined: "",
  dateExpiry: "",

  photoName: "",
  candidatePhoto: "",

  fullName: "",
  age: "",
  gender: "",
  height: "",

  weight: "",
  maritalStatus: "",
  dob: "",
  doi: "",

  nationality: "",
  passport: "",
  aadhaar: "",
  // govtId: "Passport",
  poi: "",
  post: "",

  // MEDICAL EXAMINATION
  // -> eyes
  visionRightEye: "",
  otherRightEye: "NAD",
  visionLeftEye: "",
  otherLeftEye: "NAD",

  // -> ears
  rightEar: "NAD",
  leftEar: "NAD",

  // -> systematic exam
  bloodPressure: "",
  heart: "",
  lungs: "NAD",
  abdomen: "NAD",
  hydrocil: "",

  // -> venereal diseases (clinical)
  VDRLorTPHA: "Non-Reactive",

  // -> chest x ray
  chest: "NAD",

  // -> pregnancy
  pregnancy: "Not Applicable",

  // LAB INVERSTIGATION

  // -> urine
  sugar: "NIL",
  albumin: "NIL",
  // urineBilharziasis: "NIL",
  urineOthers: "",

  // -> blood
  hemoglobin: "",
  malariaFilm: "Not Seen",
  microFilaria: "Non-Reactive",
  bloodGroup: "",
  bloodOthers: "",

  // -> Stool
  helminths: "Not Seen",
  stoolBilharziasis: "Not Seen",
  salmonellaShigella: "NAD",
  cholera: "NAD",

  // -> serology
  hiv: "Non-Reactive",
  hbsag: "Non-Reactive",
  antiHCV: "Non-Reactive",
  lft: "Normal",

  // -> serology (mg/dl)
  urea: "",
  creatinine: "",
  bloodSugar: "",
  kft: "Normal",

  // -> covid
  covid: "",

  // -> remarks
  fit: "",
  remarks: "",
  reportCompleted: false,
};
