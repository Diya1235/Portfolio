import { useInView } from "../hooks/useInView.js";

/** Shared section wrapper with a terminal-style heading: `$ command` + title. */
export default function Section({ id, command, title, children }) {
  const [ref, inView] = useInView(0.1);
  return (
    <section id={id} ref={ref} className={`section ${inView ? "is-visible" : ""}`}>
      <div className="container">
        <header className="section-head">
          <p className="section-cmd">
            <span className="prompt">$</span> {command}
          </p>
          <h2 className="section-title">{title}</h2>
        </header>
        {children}
      </div>
    </section>
  );
}
