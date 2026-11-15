import { useEffect, useRef, useState } from "react";
import {
  profile,
  about,
  skills,
  projects,
  experience,
  certifications,
  poems,
  cricketLines,
} from "../data/portfolio.js";
import { prefersReducedMotion, scrollToSection } from "../hooks/useInView.js";

const BOOT = [
  "Booting diya-os v1.0 ...",
  <><span className="ok">[  OK  ]</span> Loaded profile: {profile.name}</>,
  <><span className="ok">[  OK  ]</span> Started docker.service</>,
  <><span className="ok">[  OK  ]</span> Connected to kubernetes cluster</>,
  <><span className="ok">[  OK  ]</span> Pipeline status: <span className="c-green">passing</span></>,
  <>Type <span className="kw">help</span> to see what I can do. Try <span className="kw">sudo hire-diya</span> 😉</>,
];

const SECTIONS = ["about", "skills", "projects", "experience", "certifications", "poetry", "contact"];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const COMMANDS = {
  help: {
    desc: "list available commands",
    run: () => (
      <div className="term-help">
        {Object.entries(COMMANDS).map(([name, c]) => (
          <div key={name}>
            <span className="kw">{name.padEnd(16, " ")}</span>
            <span className="c-muted">{c.desc}</span>
          </div>
        ))}
      </div>
    ),
  },
  whoami: {
    desc: "who is Diya?",
    run: () => `${profile.name} — ${profile.title} | ${profile.role}`,
  },
  about: { desc: "short bio", run: () => about.paragraphs[2] },
  skills: {
    desc: "my tech stack",
    run: () =>
      skills.map((g) => (
        <div key={g.group}>
          <span className="c-cyan">{g.group.padEnd(11, " ")}</span>
          {g.items.map((s) => s.name + (s.level === "learning" ? "*" : "")).join(", ")}
        </div>
      )).concat(<div key="note" className="c-muted">* currently learning</div>),
  },
  projects: {
    desc: "things I've built",
    run: () =>
      projects.map((p) => (
        <div key={p.name}>
          <span className={p.status === "shipped" ? "c-green" : "c-yellow"}>
            {p.status === "shipped" ? "✔" : "◐"}
          </span>{" "}
          {p.name} <span className="c-muted">— {p.stack.slice(0, 3).join(", ")}</span>
        </div>
      )),
  },
  experience: {
    desc: "career pipeline",
    run: () =>
      experience.map((e) => (
        <div key={e.title}>
          <span className="c-cyan">[{e.stage}]</span> {e.title} @ {e.org}{" "}
          <span className="c-muted">({e.period})</span>
        </div>
      )),
  },
  certs: {
    desc: "certifications",
    run: () => certifications.map((c) => <div key={c.name}>🏅 {c.name} <span className="c-muted">— {c.issuer}</span></div>),
  },
  contact: {
    desc: "how to reach me",
    run: () => (
      <>
        <div>email    <a href={`mailto:${profile.email}`}>{profile.email}</a></div>
        <div>github   <a href={profile.github} target="_blank" rel="noreferrer">{profile.github}</a></div>
        <div>linkedin <a href={profile.linkedin} target="_blank" rel="noreferrer">{profile.linkedin}</a></div>
      </>
    ),
  },
  "docker ps": {
    desc: "running containers",
    run: () => (
      <pre className="term-pre">{`CONTAINER ID   IMAGE              STATUS        NAMES
a1b2c3d4e5f6   diya/laravel:dev   Up 3 months   enjay-crm
f6e5d4c3b2a1   diya/mern:1.0      Up            techguide
9z8y7x6w5v4u   diya/k8s:learning  Restarting    kubernetes-journey
c0ff33c0ff33   diya/poet:latest   Up always     poetry-corner`}</pre>
    ),
  },
  "kubectl get pods": {
    desc: "pods in my cluster",
    run: () => (
      <pre className="term-pre">{`NAME                      READY   STATUS    RESTARTS
curiosity-7f9c8d          1/1     Running   0
laravel-dev-5d6b7c        1/1     Running   0
devops-learning-8a9b0c    1/1     Running   ∞ (never stops)
cricket-fan-1c2d3e        1/1     Running   0`}</pre>
    ),
  },
  cricket: { desc: "🏏 a cricket thought", run: () => pick(cricketLines) },
  poem: {
    desc: "✍️ a random poem",
    run: () => {
      const p = pick(poems);
      return (
        <div>
          <div className="c-cyan">~ {p.title} ~</div>
          {p.lines.map((l, i) => <div key={i}><em>{l}</em></div>)}
        </div>
      );
    },
  },
  "sudo hire-diya": {
    desc: "you know you want to",
    run: () => {
      setTimeout(() => scrollToSection("contact"), 1200);
      return (
        <>
          <div>[sudo] password for recruiter: ********</div>
          <div className="c-green">✔ Access granted. Excellent decision.</div>
          <div className="c-muted">Redirecting to ./contact ...</div>
        </>
      );
    },
  },
  "cd <section>": {
    desc: `jump to: ${SECTIONS.join(", ")}`,
    run: () => "usage: cd projects",
  },
  github: {
    desc: "open my GitHub",
    run: () => {
      window.open(profile.github, "_blank", "noopener");
      return "Opening GitHub ↗";
    },
  },
  resume: {
    desc: "download my resume",
    run: () => {
      const a = document.createElement("a");
      a.href = profile.resume;
      a.download = "Diya_Singh_Resume.pdf";
      a.click();
      return <>Downloading <span className="kw">Diya_Singh_Resume.pdf</span> ... ✔</>;
    },
  },
  linkedin: {
    desc: "open my LinkedIn",
    run: () => {
      window.open(profile.linkedin, "_blank", "noopener");
      return "Opening LinkedIn ↗";
    },
  },
  "copy email": {
    desc: "copy my email to clipboard",
    run: () => {
      navigator.clipboard?.writeText(profile.email).catch(() => {});
      return <>📋 Copied <span className="kw">{profile.email}</span> to clipboard</>;
    },
  },
  clear: { desc: "clear the screen", run: () => null },
};

function execute(raw) {
  const input = raw.trim().replace(/\s+/g, " ");
  const cmd = input.toLowerCase();
  if (!cmd) return "";
  if (cmd.startsWith("cd ")) {
    const target = cmd.slice(3).replace(/^\.?\/?/, "");
    const id = target === "pipeline" ? "experience" : target === "certs" ? "certifications" : target;
    if (SECTIONS.includes(id)) {
      setTimeout(() => scrollToSection(id), 300);
      return `→ navigating to ./${id}`;
    }
    return `cd: no such section: ${target}`;
  }
  if (cmd === "ls") return SECTIONS.map((s) => s + "/").join("  ");
  if (cmd.startsWith("echo ")) return input.slice(5);
  if (cmd === "date") return new Date().toString();
  if (cmd === "pwd") return "/home/diya/portfolio";
  if (cmd === "sudo" || cmd.startsWith("sudo ")) return "Nice try. Only `sudo hire-diya` is allowed here 😄";
  if (cmd === "exit") return "There is no exit. Only more deployments. 🚀";
  const entry = COMMANDS[cmd];
  if (entry) return entry.run();
  return (
    <>
      command not found: <span className="c-red">{input}</span>. Type <span className="kw">help</span>.
    </>
  );
}

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Boot sequence
  useEffect(() => {
    setLines([]);
    if (prefersReducedMotion()) {
      setLines(BOOT.map((content) => ({ type: "out", content })));
      return;
    }
    const timers = BOOT.map((content, i) =>
      setTimeout(() => setLines((l) => [...l, { type: "out", content }]), 350 * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Keep the terminal (not the page) scrolled to the latest line
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const submit = (e) => {
    e.preventDefault();
    const cmd = value;
    setValue("");
    setHIndex(-1);
    if (cmd.trim()) setHistory((h) => [cmd, ...h]);
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    const out = execute(cmd);
    setLines((l) => [...l, { type: "in", content: cmd }, ...(out ? [{ type: "out", content: out }] : [])]);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = Math.min(hIndex + 1, history.length - 1);
      setHIndex(i);
      setValue(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIndex - 1;
      setHIndex(Math.max(i, -1));
      setValue(i >= 0 ? history[i] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const v = value.toLowerCase();
      const match = [...Object.keys(COMMANDS).filter((k) => !k.includes("<")), "ls", ...SECTIONS.map((s) => "cd " + s)]
        .find((k) => v && k.startsWith(v));
      if (match) setValue(match);
    }
  };

  const quick = ["help", "whoami", "skills", "docker ps", "resume", "sudo hire-diya"];

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div className="terminal-bar">
        <span className="tdot tdot--r" />
        <span className="tdot tdot--y" />
        <span className="tdot tdot--g" />
        <span className="terminal-title">diya@devops: ~/portfolio</span>
      </div>
      <div className="terminal-body" ref={bodyRef} aria-live="polite">
        {lines.map((line, i) =>
          line.type === "in" ? (
            <div key={i} className="term-line">
              <span className="prompt">diya@devops:~$</span> {line.content}
            </div>
          ) : (
            <div key={i} className="term-line term-out">{line.content}</div>
          )
        )}
        <form onSubmit={submit} className="term-line term-input-row">
          <label htmlFor="term-input" className="prompt">diya@devops:~$</label>
          <input
            id="term-input"
            ref={inputRef}
            className="term-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Terminal command input"
          />
        </form>
      </div>
      <div className="terminal-quick">
        {quick.map((q) => (
          <button
            key={q}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const out = execute(q);
              setLines((l) => [...l, { type: "in", content: q }, { type: "out", content: out }]);
            }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
