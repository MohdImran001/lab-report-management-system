import { useField } from "formik";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const TextFieldWithUnit = (props) => {
  const { label, name, unit } = props;
  const [field, meta] = useField(props);

  return (
    <Form.Group>
      <Form.Label htmlFor={name}>
        {label} ({unit})
      </Form.Label>

      <Form.Control
        type="text"
        {...field}
        {...props}
        style={{ display: "inline" }}
      />
      <span style={{ marginLeft: "-4rem" }}>{unit}</span>

      {meta.touched && meta.error ? (
        <Form.Text style={{ color: "red" }}> {meta.error} </Form.Text>
      ) : null}
    </Form.Group>
  );
};

TextFieldWithUnit.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
};

export default TextFieldWithUnit;
