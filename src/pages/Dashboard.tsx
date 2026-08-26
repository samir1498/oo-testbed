import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("testbed-user");

  if (!user) {
    return (
      <div data-testid="dashboard-locked">
        <h1>You are signed out</h1>
        <p className="lede">Sign in first to see the dashboard.</p>
        <button onClick={() => navigate("/login")} data-testid="go-to-login">
          Go to sign in
        </button>
      </div>
    );
  }

  return (
    <div data-testid="dashboard-page">
      <h1 data-testid="dashboard-heading">Dashboard</h1>
      <div className="banner ok" data-testid="dashboard-welcome">
        Signed in as {user}
      </div>
      <p className="lede">
        Nothing here does real work. It exists so a login test has a destination
        it can assert on.
      </p>
      <button
        className="secondary"
        data-testid="logout-button"
        onClick={() => {
          sessionStorage.removeItem("testbed-user");
          navigate("/login");
        }}
      >
        Sign out
      </button>
    </div>
  );
}
