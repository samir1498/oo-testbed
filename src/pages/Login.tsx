import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const EMAIL = "demo@observeone.com";
const PASSWORD = "Passw0rd!";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [rejected, setRejected] = useState(false);
  const [pending, setPending] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setRejected(false);

    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!email.includes("@")) next.email = "That is not an email address.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setPending(true);
    // A visible in-flight state, so a generated test has something to wait on
    // rather than racing an instant transition.
    window.setTimeout(() => {
      setPending(false);
      if (email.trim().toLowerCase() === EMAIL && password === PASSWORD) {
        sessionStorage.setItem("testbed-user", email.trim());
        navigate("/dashboard");
      } else {
        setRejected(true);
      }
    }, 400);
  }

  return (
    <div data-testid="login-page">
      <h1 data-testid="login-heading">Sign in</h1>
      <p className="lede">
        Use <code>demo@observeone.com</code> / <code>Passw0rd!</code>. Anything
        else is refused.
      </p>

      {rejected && (
        <div className="banner bad" data-testid="login-error" role="alert">
          Those details do not match an account.
        </div>
      )}

      <form onSubmit={onSubmit} noValidate data-testid="login-form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="login-email"
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email && (
            <div className="error" data-testid="login-email-error">
              {errors.email}
            </div>
          )}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="login-password"
            aria-invalid={errors.password ? true : undefined}
          />
          {errors.password && (
            <div className="error" data-testid="login-password-error">
              {errors.password}
            </div>
          )}
        </div>

        <button type="submit" data-testid="login-submit" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
