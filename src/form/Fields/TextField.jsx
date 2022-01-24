import { useField } from "formik";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const TextField = (props) => {
  const { label, name } = props;
  const [field, meta] = useField(props);

  return (
    <Form.Group>
      <Form.Label htmlFor={name}>{label}</Form.Label>

      <Form.Control type="text" {...field} {...props} />

      {meta.touched && meta.error ? (
        <Form.Text style={{ color: "red" }}> {meta.error} </Form.Text>
      ) : null}
    </Form.Group>
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TextField;
