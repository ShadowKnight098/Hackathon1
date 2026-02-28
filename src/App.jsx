import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Record from "./pages/Record";
import Contact from "./pages/contact";
import Footer from "./components/footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login";
import Appointment from "./components/home/appointment/ap1";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route
            path="/records"
            element={
              <ProtectedRoute>
                <Record />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<Contact />} />
          <Route path="/appointment" element={<Appointment/>}/>
          <Route path="/login" element={<Login/> }/>
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
