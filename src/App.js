import "./App.css";
import Login from "./Login";
import UserDashboard from "./UserDashBoard";
import Error from "./Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes location="/login">
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard userId={1} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
