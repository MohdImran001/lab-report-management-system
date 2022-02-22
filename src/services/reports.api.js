import { formatFetchedData } from "@Utils/data";
import { storage, db, getTime } from "../firebase.config";

const reportsRef = db.collection("reports");
const statsRef = db.collection("reports").doc("--stats--");

function get() {
  return reportsRef.orderBy("createdAt", "desc").limit(30).get();
}

function save(formData) {
  const newFormData = { ...formData };
  newFormData.createdAt = getTime.serverTimestamp(); // placeholder for timestamp evaluated at server

  return db.runTransaction((transaction) => {
    return transaction.get(statsRef).then((statsDoc) => {
      if (!statsDoc.exists) {
        return console.log("Stats doc is missing !");
      }

      // Update Report Count and Reference No
      const newCount = statsDoc.data().reportCount + 1;
      const newReference = statsDoc.data().reference + 1;
      transaction.update(statsRef, {
        reportCount: newCount,
        reference: newReference,
      });

      // Save Report Doc
      const newLabSrNo = `MT_${newCount}`;
      const newReferenceNo = `MT_${newReference}`;

      newFormData.labSrNo = newLabSrNo;
      newFormData.refrenceNo = newReferenceNo;

      const newReportRef = reportsRef.doc(newLabSrNo);
      transaction.set(newReportRef, newFormData);

      const obj = { labSrNo: newLabSrNo, refrenceNo: newReferenceNo };
      return obj;
    });
  });
}

function update(formData) {
  const newFormData = { ...formData };
  newFormData.updatedAt = getTime.serverTimestamp();
  return reportsRef.doc(formData.labSrNo).update(newFormData);
}

function searchByName(query) {
  return reportsRef
    .where("fullName", ">=", query) //
    .where("fullName", "<", `${query}z`)
    .limit(10)
    .get();
}

function searchByPassportNo(query) {
  return reportsRef
    .where("passport", ">=", query)
    .where("passport", "<", `${query}z`)
    .limit(10)
    .get();
}

function searchByExaminedDate(query) {
  return reportsRef
    .where("dateExamined", ">=", query)
    .where("dateExamined", "<", `${query}z`)
    .get();
}

function searchByLabSrNo(query) {
  const newQuery = `MT_${query}`;
  return reportsRef
    .where("labSrNo", ">=", newQuery)
    .where("labSrNo", "<", `${newQuery}z`)
    .limit(5)
    .get();
}

async function getById(id) {
  let report = null;
  const doc = await reportsRef.doc(id).get();

  if (doc.exists) {
    const data = doc.data();
    report = formatFetchedData(data);
    return report;
  }

  return report;
}

function upload(photo) {
  const date = new Date().toISOString();
  const name = `${photo.name}_${date}`;
  const uploadRef = storage.ref(`images/${name}`);

  return uploadRef
    .put(photo)
    .then(() => {
      return uploadRef.getDownloadURL();
    })
    .then((url) => {
      return { url, name };
    });
}

async function deleteReportById(photoName, id) {
  const deleteReport = reportsRef.doc(id).delete();
  const deletePhoto = storage.ref().child(`images/${photoName}`).delete();
  await Promise.all([deleteReport, deletePhoto]);
}

function resetReference() {
  return db.runTransaction((transaction) => {
    return transaction.get(statsRef).then((statsDoc) => {
      if (!statsDoc.exists) {
        return console.log("Stats doc is missing !");
      }
      // Set Reference Number to Zero (0)
      return transaction.update(statsRef, {
        reference: 0,
      });
    });
  });
}

const ReportsApi = {
  get,
  searchByName,
  searchByLabSrNo,
  searchByPassportNo,
  searchByExaminedDate,
  getById,
  update,
  save,
  upload,
  delete: deleteReportById,
  resetReference,
};

export default ReportsApi;
