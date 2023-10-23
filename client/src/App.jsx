import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getUserDataFirst } from "./redux/actions/userActions";

import Error404 from "./page/Error404";

import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./page/Contact";
import About from "./page/About";
import Dashboard from "./page/Dashboard";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getUserDataFirst());
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
