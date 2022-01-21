import { useEffect } from "react";
import { useFormikContext } from "formik";
import { parse, differenceInYears } from "date-fns";

import { customParse } from "@Utils/date";
import TextField from "@Components/Form/TextField";

const Age = () => {
  const {
    values: { dob },
    touched,
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    const d = customParse(dob);
    const dateOfBirth = parse(d, "dd/MM/yyyy", new Date());
    let age = differenceInYears(new Date(), dateOfBirth);
    age = Number.isNaN(age) ? "" : age.toString();
    setFieldValue("age", age);
  }, [dob, setFieldValue, touched.dob]);

  return <TextField name="age" label="Age" />;
};

export default Age;
