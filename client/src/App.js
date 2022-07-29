import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";


function App() {
  let { user } = useContext(AuthContext);
  return (

    <Router>
      <Routes>

        <Route path="/login" element={!user ? <Login /> : <Home />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />


      </Routes>
    </Router>

  );
}

export default App;
