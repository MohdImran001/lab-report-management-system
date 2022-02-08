import { useField } from "formik";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const TextArea = (props) => {
  const { label, name } = props;

  const [field, meta] = useField(props);

  return (
    <Form.Group>
      <Form.Label htmlFor={name}>{label}</Form.Label>

      <Form.Control type="textarea" rows={2} {...field} {...props} />

      {meta.touched && meta.error ? (
        <Form.Text style={{ color: "red" }}> {meta.error} </Form.Text>
      ) : null}
    </Form.Group>
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TextArea;
