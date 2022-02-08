import { Row } from "react-bootstrap";

import COL from "@Layouts/Col";
import { Heading } from "@Components/global";
import { Pregnancy } from "@Form/ReactiveFields";
import { TextField, TextFieldWithUnit, SelectField } from "@Form/Fields";

export default function MedicalExaminationFields() {
  return (
    <>
      <Heading>Medical examination</Heading>
      <Row>
        <COL title="EYES">
          <SelectField name="visionRightEye" label="Vision Right Eye">
            <option value="">-- Select --</option>
            <option value="6/6">6/6</option>
            <option value="6/9">6/9</option>
            <option value="6/18">6/18</option>
          </SelectField>
          <SelectField name="visionLeftEye" label="Vision Left Eye">
            <option value="">-- Select --</option>
            <option value="6/6">6/6</option>
            <option value="6/9">6/9</option>
            <option value="6/18">6/18</option>
          </SelectField>
        </COL>
        <COL title="EARS">
          <TextField name="rightEar" label="Right Ear" />
          <TextField name="leftEar" label="Left Ear" />
        </COL>
        <COL title="SYSTEMATIC EXAM">
          <TextFieldWithUnit
            name="bloodPressure"
            label="Blood Pressure"
            unit="mm Hg"
          />
          <TextField name="heart" label="Heart-Rate" />
          <TextField name="lungs" label="Lungs" />
          <TextField name="abdomen" label="Abdomen" />
          <SelectField name="hydrocil" label="Hydrocil">
            <option value="Not Seen">Not Seen</option>
            <option value="Seen">Seen</option>
            <option value="">-- Select --</option>
          </SelectField>
        </COL>
      </Row>
      <br />
      <Row>
        <COL title="VENEREAL DISEASES (CLINICAL)">
          <SelectField name="VDRLorTPHA" label="VDRL/TPHA">
            <option value="">-- Select --</option>
            <option value="Reactive">Reactive</option>
            <option value="Non-Reactive">Non-Reactive</option>
          </SelectField>
        </COL>
        <COL title="CHEST X-RAY">
          <TextField name="chest" label="" />
        </COL>
        <COL title="PREGNANCY">
          <Pregnancy />
        </COL>
      </Row>
    </>
  );
}
