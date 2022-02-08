import React, { useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

// Firebase Service
import ReportsApi from "@Services/reports.api";

function UpdateReferenceModal(props) {
  const { show, closeModal } = props;

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  async function updateRefrence() {
    setLoading(true);
    const id = toast.loading("Updating reference ...");

    try {
      await ReportsApi.resetReference();
      toast.success("Reference updated successfully", { id });
    } catch (err) {
      console.log(err);
      toast.error("An error occurred", { id });
    }

    closeModal();
    history.push("/dashboard");
    setLoading(false);
  }

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Reset Refrence</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you really want to reset refrence value to 0? This action can't be
        reversed !
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={updateRefrence} disabled={loading}>
          Reset Reference
        </Button>
        <Button variant="primary" onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

UpdateReferenceModal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default UpdateReferenceModal;
