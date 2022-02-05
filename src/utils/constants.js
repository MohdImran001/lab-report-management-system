export const TEST_REPORT_URL = `https://firebasestorage.googleapis.com/v0/b/lab-report-management-system.appspot.com/o/assets%2Freports%2Ftest-report.pdf?alt=media&token=37403716-008f-4047-aaf9-f3676bbba014`;
export const FINAL_REPORT_URL = `https://firebasestorage.googleapis.com/v0/b/lab-report-management-system.appspot.com/o/assets%2Freports%2Ffinal-report.pdf?alt=media&token=e42b246a-4049-499b-819d-ffd622f9f8d1`;
export const STAMP_URL = `https://firebasestorage.googleapis.com/v0/b/lab-report-management-system.appspot.com/o/assets%2Fstamp.png?alt=media&token=5c482a6e-9684-4fff-aebc-fe924be00c6a`;

export const CACHE_NAME = "reports_app";
export const ALLOWED_EXTNS = /(\.jpg|\.jpeg)$/i;
export const DOMAIN = process.env.REACT_APP_DOMAIN;
export const QRCODE_BASE_URL = "https://api.qrserver.com/v1/create-qr-code";

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
  "otherRightEye",
  "otherLeftEye",
  "covid",
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
  // otherRightEye: "NAD",
  visionLeftEye: "",
  // otherLeftEye: "NAD",

  // -> ears
  rightEar: "NAD",
  leftEar: "NAD",

  // -> systematic exam
  bloodPressure: "",
  heart: "",
  lungs: "NAD",
  abdomen: "NAD",
  hydrocil: "Not Seen",

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
