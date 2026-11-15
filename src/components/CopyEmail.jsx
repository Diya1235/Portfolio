import { useState } from "react";
import { profile } from "../data/portfolio.js";

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / non-secure contexts
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }
}

/** One-tap "copy email" button — works even when no mail app is set up. */
export default function CopyEmail({ className = "", label = "copy email" }) {
  const [state, setState] = useState("idle"); // idle | copied | failed

  const onClick = async () => {
    const ok = await copyText(profile.email);
    setState(ok ? "copied" : "failed");
    setTimeout(() => setState("idle"), 2000);
  };

  return (
    <button type="button" className={`copy-btn ${className}`} onClick={onClick} aria-live="polite">
      {state === "copied" ? "✔ copied!" : state === "failed" ? profile.email : `📋 ${label}`}
    </button>
  );
}
