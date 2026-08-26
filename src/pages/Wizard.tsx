import { useState } from "react";

const STEPS = ["Account", "Company", "Confirm"];

export default function Wizard() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [size, setSize] = useState("1-10");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (done) {
    return (
      <div data-testid="wizard-done">
        <h1>Account created</h1>
        <div className="banner ok" data-testid="wizard-success" role="status">
          Welcome aboard, {email} — {company} is set up.
        </div>
      </div>
    );
  }

  function next() {
    setError(null);
    if (step === 0) {
      if (!email.includes("@")) {
        setError("Enter a valid email address to continue.");
        return;
      }
    }
    if (step === 1 && company.trim().length < 2) {
      setError("Enter your company name to continue.");
      return;
    }
    setStep((s) => s + 1);
  }

  return (
    <div data-testid="wizard-page">
      <h1 data-testid="wizard-heading">Create your account</h1>

      <div className="steps" data-testid="wizard-steps">
        {STEPS.map((label, i) => (
          <span key={label} className={i === step ? "on" : undefined}>
            {i + 1}. {label}
          </span>
        ))}
      </div>

      {error && (
        <div className="banner bad" data-testid="wizard-error" role="alert">
          {error}
        </div>
      )}

      {step === 0 && (
        <div className="field" data-testid="wizard-step-account">
          <label htmlFor="wizard-email">Work email</label>
          <input
            id="wizard-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="wizard-email"
          />
        </div>
      )}

      {step === 1 && (
        <div data-testid="wizard-step-company">
          <div className="field">
            <label htmlFor="wizard-company">Company name</label>
            <input
              id="wizard-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              data-testid="wizard-company"
            />
          </div>
          <div className="field">
            <label htmlFor="wizard-size">Team size</label>
            <select
              id="wizard-size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              data-testid="wizard-size"
            >
              <option>1-10</option>
              <option>11-50</option>
              <option>51-200</option>
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div data-testid="wizard-step-confirm">
          <p>Check these details before we finish.</p>
          <table>
            <tbody>
              <tr>
                <th>Email</th>
                <td data-testid="confirm-email">{email}</td>
              </tr>
              <tr>
                <th>Company</th>
                <td data-testid="confirm-company">{company}</td>
              </tr>
              <tr>
                <th>Team size</th>
                <td data-testid="confirm-size">{size}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="row" style={{ marginTop: "1.5rem" }}>
        {step > 0 && (
          <button
            className="secondary"
            onClick={() => setStep((s) => s - 1)}
            data-testid="wizard-back"
          >
            Back
          </button>
        )}
        {step < 2 ? (
          <button onClick={next} data-testid="wizard-next">
            Continue
          </button>
        ) : (
          <button onClick={() => setDone(true)} data-testid="wizard-finish">
            Create account
          </button>
        )}
      </div>
    </div>
  );
}
