import React, { useState } from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import StateSection from "../component/state_section"
import Forms from "../form.jsx"

function router() {
  // const [test, setTest] = useState(true);
  return (
    <Routes>
      <Route path="/" element={<Forms/>} />
      <Route path="/first_form" element={<StateSection/>} />
    </Routes>
  );
}


export default router;