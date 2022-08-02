import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import NewUser from "./pages/new user/NewUser";
import NewRoom from "./pages/new room/NewRoom";
import NewHotel from "./pages/new hotel/NewHotel";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { roomInputs, userInputs, hotelInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoutes = ({ children }) => {
    const { user } = useContext(AuthContext)

    if (!user) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            } />
            <Route path="/users">
              <Route index element={
                <ProtectedRoutes>
                  <List columns={userColumns} />
                </ProtectedRoutes>
              } />
              <Route path=":userId" element={
                <ProtectedRoutes>
                  <Single />
                </ProtectedRoutes>} />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <NewUser inputs={userInputs} title="Add New User" />
                  </ProtectedRoutes>
                }
              />
            </Route>
            <Route path="/hotels">
              <Route index element={<ProtectedRoutes><List columns={hotelColumns} /></ProtectedRoutes>} />
              <Route path=":hotelId" element={<ProtectedRoutes><Single /></ProtectedRoutes>} />
              <Route
                path="new"
                element={<ProtectedRoutes><NewHotel inputs={hotelInputs} title="Add New Hotel" /></ProtectedRoutes>}
              />
            </Route>
            <Route path="/rooms">
              <Route index element={<ProtectedRoutes><List columns={roomColumns} /></ProtectedRoutes>} />
              <Route path=":roomId" element={<ProtectedRoutes><Single /></ProtectedRoutes>} />
              <Route
                path="new"
                element={<ProtectedRoutes><NewRoom inputs={roomInputs} title="Add New Room" /></ProtectedRoutes>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
