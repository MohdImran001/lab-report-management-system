import { Row } from "react-bootstrap";

import {
  DateField,
  FileUpload,
  TextField,
  TextFieldWithUnit,
  SelectField,
} from "@Form/Fields";

import { ExpiryDateField, DisplayPhoto, Age } from "@Form/ReactiveFields";

import COL from "@Layouts/Col";
import { Heading } from "@Components/global";

export default function CandidateInfoFields() {
  return (
    <>
      <Heading> Candidate Information </Heading>
      <Row>
        <COL title="Date">
          <DateField name="dateExamined" label="Examined Date" />
          <ExpiryDateField name="dateExpiry" label="Expiry Date" disabled />
        </COL>
        <COL title="Upload Photo">
          <FileUpload />
        </COL>
        <COL title="Candidate Photo">
          <DisplayPhoto />
        </COL>
      </Row>
      <br />
      <br />
      <Row>
        <COL>
          <TextField name="fullName" label="Full Name" />
          <Age />
          <SelectField name="gender" label="Gender">
            <option value="">-- Select --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </SelectField>
          <TextFieldWithUnit name="height" label="Height" unit="cm" />
        </COL>
        <COL>
          <TextFieldWithUnit name="weight" label="Weight" unit="kg" />
          <SelectField name="maritalStatus" label="Marital Status">
            <option value="">-- Select --</option>
            <option value="Married"> Married </option>
            <option value="Unmarried"> Unmarried </option>
          </SelectField>
          <DateField name="dob" label="Date of Birth" />
          <DateField name="doi" label="Date of Issue" />
        </COL>
        <COL>
          <TextField name="poi" label="Place of Issue" />
          <TextField name="nationality" label="Nationality" />
          <TextField name="passport" label="Passport No." />
          <TextField name="aadhaar" label="Aadhaar No." />
          <TextField name="post" label="Post applied for." />
        </COL>
      </Row>
    </>
  );
}
