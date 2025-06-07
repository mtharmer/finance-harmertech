import Home from "./components/Home";
import Calculators from "./components/Calculators";
import { Routes, Route } from "react-router";

export default function NavRoutes() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/calculators" element={<Calculators />} />
    </Routes>
  );
}
