import { useFormikContext } from "formik";

const DisplayPhoto = () => {
  const {
    values: { candidatePhoto },
  } = useFormikContext();

  return (
    <>
      {candidatePhoto.length > 0 && (
        <img src={candidatePhoto} alt="candidate" style={{ width: "5.9rem" }} />
      )}
    </>
  );
};

export default DisplayPhoto;
