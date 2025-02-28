import  { useState } from "react";
import StudentRegistrationForm from "./component/student_registratin_form";
import Successfully from "./component/successfully_registrationForm";

// import StudentRegistrationForm from "./StudentRegistrationForm"; // Ensure correct import

function form() {
  const [data, setData] = useState(null); // Initial empty object
    
  console.log("The data is", data); // Logging the whole object

  return (
    <>
      {/* Assuming StudentRegistrationForm calls setData with an object */}
      {/* <StudentRegistrationForm studentData={setData} /> */}

      {/* Example of rendering some data */}
      {/* {!data ? <StudentRegistrationForm /> : <Successfully />} */}

      {!data ? (
        <StudentRegistrationForm studentData={setData} />
      ) : (
        <Successfully submittedData={data} />
      )}
    </>
  );
}

export default form;
