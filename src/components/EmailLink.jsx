import { useState } from "react";
import { profile } from "../data/portfolio.js";
import { scrollToSection } from "../hooks/useInView.js";

// Phones/tablets: mail apps (e.g. Gmail on Android) can crash or be missing,
// so on touch devices we never fire a mailto: link.
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  (window.matchMedia?.("(pointer: coarse)").matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

/**
 * Desktop: normal mailto link.
 * Mobile:  mode="form" → scrolls to the contact form
 *          mode="copy" → copies the address to the clipboard
 */
export default function EmailLink({ children, mode = "form", className = "" }) {
  const [copied, setCopied] = useState(false);

  const onClick = async (e) => {
    if (!isTouchDevice()) return; // let mailto work on desktop
    e.preventDefault();
    if (mode === "copy") {
      try {
        await navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        scrollToSection("contact");
      }
    } else {
      scrollToSection("contact");
      setTimeout(() => document.querySelector('.contact-form input[name="name"]')?.focus({ preventScroll: true }), 700);
    }
  };

  return (
    <a href={`mailto:${profile.email}`} onClick={onClick} className={className}>
      {copied ? "✔ copied!" : children}
    </a>
  );
}
