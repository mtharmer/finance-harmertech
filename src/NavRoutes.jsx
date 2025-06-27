import Home from "./components/Home";
import Calculators from "./components/calculators/Calculators";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import { Routes, Route, Navigate } from "react-router";
import Debts from "./components/debts/Debts";
import hasSession from "./utility/hasSession";
import MonthlyExpenses from "./components/monthlyExpenses/MonthlyExpenses";
import ChangePassword from "./components/auth/ChangePassword";
import Mortgage from "./components/mortgage/Mortgage";

export default function NavRoutes() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/calculators" element={<Calculators />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/debts" element={hasSession() ? <Debts /> : <Navigate to='/'/>} />
      <Route path="/monthlyexpenses" element={hasSession() ? <MonthlyExpenses /> : <Navigate to='/' />} />
      <Route path='/changepassword' element={hasSession() ? <ChangePassword /> : <Navigate to='/' />} />
      <Route path='/mortgage' element={hasSession() ? <Mortgage /> : <Navigate to='/' />} />
    </Routes>
  );
}
