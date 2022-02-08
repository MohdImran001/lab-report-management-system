import Row from "react-bootstrap/Row";

import COL from "@Layouts/Col";
import { TextField } from "@Form/Fields";

export default function SerialNoFields() {
  return (
    <Row>
      <COL>
        <TextField name="labSrNo" label="Lab Sr No." disabled />
      </COL>
      <COL>
        <TextField name="refrenceNo" label="Reference No." disabled />
      </COL>
    </Row>
  );
}
