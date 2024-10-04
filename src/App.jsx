import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Fashion from "./Components/Fashion";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";

function App() {
  return (
    <>

    <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fashion" element={<Fashion />} />
      </Routes>
    </Router>
    {/* <Footer /> */}
    </>
  );
}

export default App;