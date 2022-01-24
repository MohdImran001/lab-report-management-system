import { useEffect } from "react";
import { useFormikContext } from "formik";

import { TextField } from "@Form/Fields";

const Pregnancy = () => {
  const {
    values: { gender },
    touched,
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    if (gender === "Female") {
      setFieldValue("pregnancy", "APPLICABLE");
    } else if (gender === "Male" || gender === "Others") {
      setFieldValue("pregnancy", "NOT APPLICABLE");
    }
  }, [gender, setFieldValue, touched.gender]);

  return <TextField name="pregnancy" label="" />;
};

export default Pregnancy;
