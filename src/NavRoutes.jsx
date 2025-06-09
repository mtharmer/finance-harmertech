import Home from "./components/Home";
import Calculators from "./components/Calculators";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import { Routes, Route } from "react-router";

export default function NavRoutes() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/calculators" element={<Calculators />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
