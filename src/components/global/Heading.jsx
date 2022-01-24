import PropTypes from "prop-types";

function Heading(props) {
  const { children } = props;
  return (
    <h4
      style={{ textTransform: "uppercase" }}
      className="text-center pt-4 pb-4"
    >
      {children}
    </h4>
  );
}

Heading.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Heading;
