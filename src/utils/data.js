import { convertDate } from "./date";

const getNumericData = (value) => {
  return value.split(" ")[0];
};

export const formatSavingData = (values) => {
  const newValues = { ...values };

  newValues.dateExamined = convertDate(newValues.dateExamined);
  newValues.dateExpiry = convertDate(newValues.dateExpiry);
  newValues.dob = convertDate(newValues.dob);
  newValues.doi = convertDate(newValues.doi);

  newValues.fullName = newValues.fullName.toUpperCase();
  newValues.passport = newValues.passport.toUpperCase();

  const h = newValues.height;
  const w = newValues.weight;
  newValues.height = h.length > 0 ? `${h} cm` : "";
  newValues.weight = w.length > 0 ? `${w} kg` : "";

  newValues.bloodPressure += " mm Hg";
  newValues.hemoglobin += " gm %";
  newValues.urea += " mg/dl";
  newValues.creatinine += " mg/dl";
  newValues.bloodSugar += " mg/dl";

  return newValues;
};

export const formatFetchedData = (values) => {
  const newValues = { ...values };

  newValues.dateExamined = convertDate(newValues.dateExamined);
  newValues.dateExpiry = convertDate(newValues.dateExpiry);
  newValues.dob = convertDate(newValues.dob);
  newValues.doi = convertDate(newValues.doi);

  newValues.weight = getNumericData(newValues.weight);
  newValues.height = getNumericData(newValues.height);
  newValues.urea = getNumericData(newValues.urea);
  newValues.creatinine = getNumericData(newValues.creatinine);
  newValues.hemoglobin = getNumericData(newValues.hemoglobin);
  newValues.bloodPressure = getNumericData(newValues.bloodPressure);
  newValues.bloodSugar = getNumericData(newValues.bloodSugar);

  return newValues;
};
