import { formatFetchedData } from "@Helpers/data.helper";
import { storage, db, getTime } from "../firebase.config";
import { ALLOWED_EXTNS } from "../constants";

const reportsRef = db.collection("reports");
const statsRef = db.collection("reports").doc("--stats--");

async function get() {
  return reportsRef.orderBy("createdAt", "desc").limit(30).get();
}

function save(formData) {
  const newFormData = { ...formData };
  newFormData.createdAt = getTime.serverTimestamp();

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

      const newReportRef = reportsRef.doc(newLabSrNo);
      newFormData.labSrNo = newLabSrNo;
      newFormData.refrenceNo = newReferenceNo;

      transaction.set(newReportRef, newFormData);

      const obj = { labSrNo: newLabSrNo, refrenceNo: newReferenceNo };
      return obj;
    });
  });
}

async function update(formData) {
  const newFormData = { ...formData };
  newFormData.updatedAt = getTime.serverTimestamp();
  return reportsRef.doc(formData.labSrNo).update(newFormData);
}

async function searchByName(query) {
  return reportsRef
    .where("fullName", ">=", query)
    .where("fullName", "<", `${query}z`)
    .limit(10)
    .get();
}

async function searchByPassportNo(query) {
  return reportsRef
    .where("passport", ">=", query)
    .where("passport", "<", `${query}z`)
    .limit(10)
    .get();
}

async function searchByExaminedDate(query) {
  return reportsRef
    .where("dateExamined", ">=", query)
    .where("dateExamined", "<", `${query}z`)
    .get();
}

async function searchByLabSrNo(query) {
  const newQuery = `MT_${query}`;
  return reportsRef
    .where("labSrNo", ">=", newQuery)
    .where("labSrNo", "<", `${newQuery}z`)
    .limit(5)
    .get();
}

async function getById(id) {
  let report;

  const doc = await reportsRef.doc(id).get();
  if (doc.exists) {
    const data = doc.data();
    report = formatFetchedData(data);
  } else {
    report = null;
  }

  return report;
}

async function upload(photo) {
  return new Promise((resolve, reject) => {
    if (!photo) {
      reject(new Error("Please select a photo !"));
    }
    if (!ALLOWED_EXTNS.exec(photo.name)) {
      reject(new Error("Please upload a .jpg or .jpeg file"));
    }

    const date = new Date().toISOString();
    const name = `${photo.name}_${date}`;

    const uploadTask = storage.ref(`images/${name}`).put(photo);
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        storage
          .ref("images")
          .child(name)
          .getDownloadURL()
          .then((url) => {
            resolve({ url, name });
          });
      }
    );
  });
}

// async function getCurrent() {
//   let res;
//   const querySnapshot = await currentRef.get();
//   querySnapshot.forEach((doc) => {
//     res = { id: doc.id, ...doc.data() };
//   });
//   return res;
// }

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
      // Set Reference No to Zero (0)
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
  // getCurrent,
  delete: deleteReportById,
  resetReference,
};

export default ReportsApi;
