import { useState } from "react";
import { useFormikContext } from "formik";
import { Button, Form, Alert } from "react-bootstrap";
import toast from "react-hot-toast";

import { ALLOWED_EXTNS } from "@Utils/constants";
import ReportsApi from "@Services/reports.api";

const FileUpload = () => {
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { setFieldValue } = useFormikContext();

  async function uploadFile() {
    if (!photo) {
      setMsg("");
      setError("Please select a photo !");
      return;
    }
    if (!ALLOWED_EXTNS.exec(photo.name)) {
      setMsg("");
      setError("Please upload a .jpg or .jpeg file");
      return;
    }

    setLoading(true);
    const id = toast.loading("Uploading file ...");

    try {
      const { url, name } = await ReportsApi.upload(photo);
      // Update values
      setFieldValue("photoName", name);
      setFieldValue("candidatePhoto", url);

      // Handle success
      setError("");
      setMsg("Photo uploaded");
      toast.success("File Upload Successfull", { id });
    } catch (err) {
      setMsg("");
      setError(err.message);
      toast.dismiss(id);
    }

    setLoading(false);
  }

  return (
    <>
      <Form.File
        id="photo"
        accept="image/*"
        onChange={(e) => {
          setPhoto(e.target.files[0]);
        }}
      />
      <br />
      <Button type="button" onClick={uploadFile} disabled={loading}>
        Upload
      </Button>
      <br />
      <div style={{ marginTop: "1rem" }}>
        {error.length > 0 && <Alert variant="danger">{error}</Alert>}
        {msg.length > 0 && <Alert variant="success">{msg}</Alert>}
      </div>
      <p>Upload .jpg or .jpeg files</p>
    </>
  );
};

export default FileUpload;
