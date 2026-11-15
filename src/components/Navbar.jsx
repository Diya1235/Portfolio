import { useEffect, useState } from "react";
import { scrollToSection } from "../hooks/useInView.js";

const links = [
  ["about", "about"],
  ["skills", "skills"],
  ["projects", "projects"],
  ["experience", "pipeline"],
  ["certifications", "certs"],
  ["poetry", "poetry"],
  ["contact", "contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#home" className="nav-logo" onClick={(e) => go(e, "home")}>
          <span className="c-blue">diya</span>@<span className="c-cyan">devops</span>:~$
          <span className="cursor" aria-hidden="true" />
        </a>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
        </button>
        <ul className={`nav-links ${open ? "is-open" : ""}`}>
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => go(e, id)}>
                <span className="c-muted">./</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
