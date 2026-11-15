import { profile } from "../data/portfolio.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          <span className="c-green">●</span> build passing · built with React + Vite · shipped via GitHub
          Actions → Netlify
        </p>
        <p className="c-muted">
          © {new Date().getFullYear()} {profile.name} · made with ☕ and curiosity
        </p>
      </div>
    </footer>
  );
}
