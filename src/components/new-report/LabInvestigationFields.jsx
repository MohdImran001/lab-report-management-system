import { Row } from "react-bootstrap";

import COL from "@Layouts/Col";
import { Heading } from "@Components/global";
import { TextField, TextFieldWithUnit, SelectField } from "@Form/Fields";

export default function LabInvestigationFields() {
  return (
    <>
      <Heading>LAB INVESTIGATION</Heading>
      <Row>
        <COL title="URINE">
          <TextField name="sugar" label="Sugar" />
          <TextField name="albumin" label="Albumin" />
          {/* <TextField name="urineBilharziasis" label="Bilharziasis" /> */}
          <TextField name="urineOthers" label="Others" />
        </COL>
        <COL title="BLOOD">
          <TextFieldWithUnit name="hemoglobin" label="Hemoglobin" unit="gm %" />
          <TextField name="malariaFilm" label="Malaria Rapid" />
          <SelectField name="microFilaria" label="Micro Filaria">
            <option value="">-- Select --</option>
            <option value="Reactive">Reactive</option>
            <option value="Non-Reactive">Non-Reactive</option>
          </SelectField>
          <SelectField name="bloodGroup" label="Blood Group">
            <option value="">-- Select --</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O-">O-</option>
            <option value="B-">B-</option>
            <option value="A-">A-</option>
          </SelectField>
          <TextField name="bloodOthers" label="Others" />
        </COL>
        <COL title="STOOL">
          <TextField name="helminths" label="Helminths" />
          <TextField name="stoolBilharziasis" label="Bilharziasis" />
          <TextField name="salmonellaShigella" label="Salmonella/Shigella" />
          <TextField name="cholera" label="V. Cholera" />
        </COL>
      </Row>
      <br />
      <Row>
        <COL title="SEROLOGY">
          <SelectField name="hiv" label="HIV">
            <option value="">-- Select --</option>
            <option value="Reactive">Reactive</option>
            <option value="Non-Reactive">Non-Reactive</option>
          </SelectField>
          <SelectField name="hbsag" label="HBsAg">
            <option value="">-- Select --</option>
            <option value="Reactive">Reactive</option>
            <option value="Non-Reactive">Non-Reactive</option>
          </SelectField>
          <SelectField name="antiHCV" label="Anti HCV">
            <option value="">-- Select --</option>
            <option value="Reactive">Reactive</option>
            <option value="Non-Reactive">Non-Reactive</option>
          </SelectField>
          <TextField name="lft" label="L.F.T" />
        </COL>
        <COL title="SEROLOGY ELISA">
          <TextFieldWithUnit name="urea" label="Urea" unit="mg/dl" />
          <TextFieldWithUnit
            name="creatinine"
            label="Creatinine"
            unit="mg/dl"
          />
          <TextFieldWithUnit
            name="bloodSugar"
            label="Blood Sugar"
            unit="mg/dl"
          />
          <TextField name="kft" label="K.F.T" />
        </COL>
      </Row>
    </>
  );
}
