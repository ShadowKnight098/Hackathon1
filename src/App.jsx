import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Record from "./pages/Record";
import Contact from "./pages/contact";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/records" element={<Record />} />
        <Route path="/dashboard" element={<Contact />} />
        <Route path="/login" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;