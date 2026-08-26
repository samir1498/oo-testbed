import { useState, type FormEvent } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    const next: Record<string, string> = {};
    if (!name) next.name = "Tell us your name.";
    if (!email) next.email = "Enter your email address.";
    else if (!email.includes("@")) next.email = "That is not an email address.";
    if (message.length < 10)
      next.message = "Say a little more — at least 10 characters.";

    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      e.currentTarget.reset();
    }
  }

  return (
    <div data-testid="contact-page">
      <h1 data-testid="contact-heading">Contact us</h1>
      <p className="lede">
        Nothing is sent anywhere. The form validates and confirms, which is all
        a generated test needs.
      </p>

      {sent && (
        <div className="banner ok" data-testid="contact-success" role="status">
          Thanks — your message has been received.
        </div>
      )}

      <form onSubmit={onSubmit} noValidate data-testid="contact-form">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" data-testid="contact-name" />
          {errors.name && (
            <div className="error" data-testid="contact-name-error">
              {errors.name}
            </div>
          )}
        </div>

        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            data-testid="contact-email"
          />
          {errors.email && (
            <div className="error" data-testid="contact-email-error">
              {errors.email}
            </div>
          )}
        </div>

        <div className="field">
          <label htmlFor="subject">Subject</label>
          <select id="subject" name="subject" data-testid="contact-subject">
            <option>General question</option>
            <option>Billing</option>
            <option>Report a bug</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            data-testid="contact-message"
          />
          {errors.message && (
            <div className="error" data-testid="contact-message-error">
              {errors.message}
            </div>
          )}
        </div>

        <button type="submit" data-testid="contact-submit">
          Send message
        </button>
      </form>
    </div>
  );
}
