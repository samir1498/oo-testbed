import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Wizard from "./pages/Wizard";
import Products from "./pages/Products";

export default function App() {
  return (
    <>
      <nav data-testid="main-nav">
        <Link to="/" data-testid="nav-home">
          Home
        </Link>
        <Link to="/login" data-testid="nav-login">
          Sign in
        </Link>
        <Link to="/products" data-testid="nav-products">
          Products
        </Link>
        <Link to="/wizard" data-testid="nav-wizard">
          Sign up
        </Link>
        <Link to="/contact" data-testid="nav-contact">
          Contact
        </Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wizard" element={<Wizard />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="*"
            element={
              <div data-testid="not-found">
                <h1>Page not found</h1>
                <p className="lede">
                  Nothing lives at this address. <Link to="/">Go home</Link>.
                </p>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}
