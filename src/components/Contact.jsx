import { useState } from "react";
import Section from "./Section.jsx";
import { profile } from "../data/portfolio.js";

const encode = (data) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", "bot-field": "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...form }),
      });
      if (!res.ok) throw new Error(res.statusText);
      setStatus("sent");
      setForm({ name: "", email: "", message: "", "bot-field": "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" command="ssh recruiter@diya" title="Let's Connect">
      <div className="contact-grid">
        <div className="contact-info">
          <p>
            I'm looking for a <span className="c-cyan">full-time DevOps Engineer</span> role. Whether you
            have an opportunity, a question about my work, or just want to talk cricket — my inbox is open.
          </p>
          <ul className="contact-links">
            <li>
              <span className="c-muted">email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <span className="c-muted">github</span>
              <a href={profile.github} target="_blank" rel="noreferrer">@{profile.githubUser}</a>
            </li>
            <li>
              <span className="c-muted">linkedin</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">Diya Singh</a>
            </li>
            <li>
              <span className="c-muted">location</span>
              <span>{profile.location}</span>
            </li>
          </ul>
          {profile.resume && (
            <a className="btn btn--primary" href={profile.resume} target="_blank" rel="noreferrer">
              ↓ download resume
            </a>
          )}
        </div>

        <form className="panel contact-form" name="contact" onSubmit={submit}>
          <p className="panel-label">new_message.sh</p>
          <p hidden>
            <label>
              Don't fill this out: <input name="bot-field" value={form["bot-field"]} onChange={update} />
            </label>
          </p>
          <label>
            <span>--name</span>
            <input name="name" required value={form.name} onChange={update} placeholder="Your name" />
          </label>
          <label>
            <span>--email</span>
            <input name="email" type="email" required value={form.email} onChange={update} placeholder="you@company.com" />
          </label>
          <label>
            <span>--message</span>
            <textarea name="message" rows="5" required value={form.message} onChange={update} placeholder="Hi Diya, ..." />
          </label>
          <button className="btn btn--primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "sending..." : "./send-message"}
          </button>
          {status === "sent" && <p className="form-msg c-green">✔ Message delivered. I'll get back to you soon!</p>}
          {status === "error" && (
            <p className="form-msg c-red">
              ✖ Something went wrong. Please email me directly at {profile.email}.
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}
