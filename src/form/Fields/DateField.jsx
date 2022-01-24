import { useField } from "formik";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const DateField = (props) => {
  const [field, meta] = useField(props);
  const { label, name, ...rest } = props;
  return (
    <Form.Group>
      <Form.Label htmlFor={name}>{label}</Form.Label>

      <Form.Control type="date" {...field} {...rest} />

      {meta.touched && meta.error ? (
        <Form.Text style={{ color: "red" }}> {meta.error} </Form.Text>
      ) : null}
    </Form.Group>
  );
};

DateField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default DateField;
