import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout"; 
import AdminUsers from "./pages/AdminUsers";
import AdminBooks from "./pages/AdminBooks";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/usuarios" element={<AdminUsers />} />
          <Route path="/livros" element={<AdminBooks />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
