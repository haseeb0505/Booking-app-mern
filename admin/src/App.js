import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
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
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoutes>
                }
              />
            </Route>
            <Route path="/hotels">
              <Route index element={<ProtectedRoutes><List columns={hotelColumns} /></ProtectedRoutes>} />
              <Route path=":hotelId" element={<ProtectedRoutes><Single /></ProtectedRoutes>} />
              <Route
                path="new"
                element={<ProtectedRoutes><New inputs={hotelInputs} title="Add New Hotel" /></ProtectedRoutes>}
              />
            </Route>
            <Route path="/rooms">
              <Route index element={<ProtectedRoutes><List columns={roomColumns} /></ProtectedRoutes>} />
              <Route path=":roomId" element={<ProtectedRoutes><Single /></ProtectedRoutes>} />
              <Route
                path="new"
                element={<ProtectedRoutes><New inputs={roomInputs} title="Add New Room" /></ProtectedRoutes>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
