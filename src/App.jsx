import "./App.css";
import RegistrationForm from "../src/component/state_section";
import StudentRegistrationForm from "./component/student_registratin_form";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="  ">
      <Routes>
        <Route path="/" element={<StudentRegistrationForm />} />
        <Route path="/first_form" element={<RegistrationForm />} />
      </Routes>
    </div>
  );
}

export default App;
