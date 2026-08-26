import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div data-testid="home-page">
      <h1 data-testid="home-heading">ObserveOne Testbed</h1>
      <p className="lede">
        A deliberately ordinary web app, kept here so Autopilot has something
        real to plan against, generate tests for, and heal when a selector
        moves.
      </p>

      <h2>What is here</h2>
      <ul>
        <li>
          <Link to="/login">Sign in</Link> — validation, a wrong-password error,
          and a redirect on success.
        </li>
        <li>
          <Link to="/products">Products</Link> — a searchable, sortable table
          with a cart counter.
        </li>
        <li>
          <Link to="/wizard">Sign up</Link> — three steps that carry state
          forward and can go back.
        </li>
        <li>
          <Link to="/contact">Contact</Link> — a form with required fields and a
          success banner.
        </li>
      </ul>

      <h2>Demo credentials</h2>
      <p data-testid="demo-credentials">
        Email <code>demo@observeone.com</code>, password <code>Passw0rd!</code>
      </p>
    </div>
  );
}
