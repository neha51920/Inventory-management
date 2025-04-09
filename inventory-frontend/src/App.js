import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddEditItem from "./pages/AddEditItem"; 
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/item/new" element={<AddEditItem />} />
        <Route path="/item/edit/:id" element={<AddEditItem />} />
        {/* Add a fallback route if needed */}
      </Routes>
    </Router>
  );
}

export default App;
