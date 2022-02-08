import PropTypes from "prop-types";
import { Col, Card } from "react-bootstrap";

function COL(props) {
  const { title, children } = props;
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>

          {children}
        </Card.Body>
      </Card>
    </Col>
  );
}

COL.defaultProps = {
  title: "",
};

COL.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
};

export default COL;
