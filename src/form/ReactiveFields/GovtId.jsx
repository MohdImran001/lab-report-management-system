import { useEffect, useState } from "react";
import { useFormikContext } from "formik";

import { TextField } from "@Form/Fields";

const GovtId = () => {
  const [showPassport, setShowPassport] = useState(true);

  const {
    values: { govtId },
    touched,
  } = useFormikContext();

  useEffect(() => {
    if (govtId === "Passport") {
      setShowPassport(true);
    } else if (govtId === "Aadhaar") {
      setShowPassport(false);
    }
  }, [govtId, touched.govtId]);

  if (!showPassport) {
    return <TextField name="aadhaar" label="Aadhaar No." />;
  }
  return <TextField name="passport" label="Passport No." />;
};

export default GovtId;
