import React, { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user, dispatch } = useContext(AuthContext)
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <span className="logo" >HZ Booking</span>
        </Link>
        {user ?
          <>
            <button className="navButton" onClick={handleLogout}>Logout</button>

          </>
          : (
            <>

              <div className="navItems">
                <button className="navButton">Register</button>
                <Link to="/login">
                  <button className="navButton">Login</button>
                </Link>
              </div>
            </>
          )}

      </div>
    </div>
  );
}

export default Navbar;
