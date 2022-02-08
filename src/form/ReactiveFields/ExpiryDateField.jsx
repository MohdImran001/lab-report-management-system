import { useEffect } from "react";
import { useField, useFormikContext } from "formik";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { getExpiryDate } from "@Utils/date";

const ExpiryDateField = (props) => {
  const { label, name } = props;

  const {
    values: { dateExamined },
    touched,
    setFieldValue,
  } = useFormikContext();

  const [field, meta] = useField(props);

  useEffect(() => {
    if (touched.dateExamined && dateExamined.length > 0) {
      setFieldValue(name, getExpiryDate(dateExamined));
    }
  }, [dateExamined, touched.dateExamined, setFieldValue, name]);

  return (
    <Form.Group>
      <Form.Label htmlFor={name}>{label}</Form.Label>

      <Form.Control type="date" {...field} {...props} />

      {meta.touched && meta.error ? (
        <Form.Text style={{ color: "red" }}> {meta.error} </Form.Text>
      ) : null}
    </Form.Group>
  );
};

ExpiryDateField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ExpiryDateField;
