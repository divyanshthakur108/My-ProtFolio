import { Routes, Route } from "react-router-dom";
import "./index.css";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <>
      <CustomCursor />
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
