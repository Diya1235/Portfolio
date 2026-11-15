// ============================================================
//  ALL PORTFOLIO CONTENT LIVES HERE.
//  Edit this file to update the site — no component changes needed.
//  Search for "TODO" to find details that still need filling in.
// ============================================================

export const profile = {
  name: "Diya Singh",
  firstName: "Diya",
  title: "Aspiring DevOps Engineer",
  role: "Laravel Developer @ Enjay IT Solutions",
  location: "Mumbai, Maharashtra",
  email: "diyasingh20041@gmail.com",
  github: "https://github.com/Diya1235",
  githubUser: "Diya1235",
  linkedin: "https://www.linkedin.com/in/DiyaSingh45",
  // TODO: put your resume in /public/resume.pdf, then change this to "/resume.pdf"
  resume: null,
  tagline: "From localhost to production — I love what happens in between.",
  openTo: "Full-time DevOps Engineer roles",
};

export const about = {
  paragraphs: [
    "I'm a Laravel Developer at Enjay IT Solutions, Vapi, where I build CRM products, automation scripts and API integrations that keep business data flowing.",
    "I studied B.Sc. IT at St. John College (University of Mumbai) with a 9.9 CGPA. Along the way I kept asking one question — what actually happens to my code after it leaves my local machine? That curiosity is what made me fall in love with DevOps.",
    "Today I'm most excited about Docker, Kubernetes and system design: packaging apps, orchestrating them, and designing systems that scale. I'm looking for a full-time DevOps Engineer role where I can do that every day.",
  ],
  facts: [
    { key: "location", value: "Mumbai, Maharashtra" },
    { key: "current_role", value: "Laravel Developer @ Enjay IT" },
    { key: "education", value: "B.Sc. IT · CGPA 9.9" },
    { key: "focus", value: "Docker · Kubernetes · System Design" },
    { key: "open_to", value: "Full-time DevOps roles" },
  ],
};

// level: "proficient" | "learning"
export const skills = [
  {
    group: "languages",
    items: [
      { name: "PHP", level: "proficient" },
      { name: "JavaScript", level: "proficient" },
      { name: "Python", level: "learning" },
      { name: "C", level: "learning" },
      { name: "C++", level: "learning" },
    ],
  },
  {
    group: "frameworks",
    items: [
      { name: "Laravel", level: "proficient" },
      { name: "React", level: "learning" },
      { name: "Node.js", level: "learning" },
      { name: "Express", level: "learning" },
    ],
  },
  {
    group: "databases",
    items: [
      { name: "MySQL", level: "proficient" },
      { name: "Redis", level: "proficient" },
      { name: "MongoDB", level: "learning" },
    ],
  },
  {
    group: "devops",
    items: [
      { name: "Docker", level: "proficient" },
      { name: "Linux", level: "proficient" },
      { name: "GitHub Actions", level: "proficient" },
      { name: "Kubernetes", level: "learning" },
    ],
  },
  {
    group: "tools",
    items: [
      { name: "Git", level: "proficient" },
      { name: "Postman", level: "proficient" },
      { name: "Playwright", level: "proficient" },
    ],
  },
];

// status: "shipped" | "in-progress"
export const projects = [
  {
    name: "TechGuide",
    description:
      "A one-stop platform for tech students: build ATS-friendly resumes, generate cover letters, and find project ideas matched to your tech stack.",
    stack: ["MongoDB", "Express", "React", "Node.js", "REST APIs"],
    devops: null,
    status: "shipped",
    repo: null, // TODO: add GitHub repo URL if public
    live: null, // TODO: add live demo URL if deployed
  },
  {
    name: "SIP Automation",
    description:
      "Automation scripts that log into investment platforms, extract SIP data and sync it straight into clients' CRMs — no more manual data entry.",
    stack: ["Laravel", "Playwright", "PHP"],
    devops: "Headless browser automation running on a schedule",
    status: "shipped",
    repo: null,
    live: null,
  },
  {
    name: "CRM API Integration",
    description:
      "Scheduler-driven integrations that call external APIs on a cadence and bring the data into the CRM reliably.",
    stack: ["Laravel", "Task Scheduler", "REST APIs", "MySQL"],
    devops: "Cron-based jobs with retries and logging",
    status: "shipped",
    repo: null,
    live: null,
  },
  {
    name: "Sanchay CRM & Sangam CRM",
    description:
      "Product engineering on two CRM products — shipping new features and resolving bugs reported by customers.",
    stack: ["Laravel", "PHP", "MySQL", "Redis"],
    devops: null,
    status: "shipped",
    repo: null,
    live: null,
  },
  {
    name: "Portfolio CI/CD Pipeline",
    description:
      "This very website! Every push to main triggers a GitHub Actions pipeline that installs, builds and deploys the site to Netlify automatically.",
    stack: ["React", "Vite", "GitHub Actions", "Netlify"],
    devops: "CI on every PR · automated production deploys",
    status: "in-progress",
    repo: null, // TODO: add this repo's URL once pushed to GitHub
    live: null,
  },
  {
    name: "Dockerized TechGuide",
    description:
      "Containerising TechGuide with multi-stage Docker builds and docker-compose, plus a pipeline that pushes images to GHCR and deploys to AWS EC2 behind Nginx.",
    stack: ["Docker", "Docker Compose", "GitHub Actions", "AWS EC2", "Nginx"],
    devops: "Multi-stage builds · image registry · cloud deploy",
    status: "in-progress",
    repo: null,
    live: null,
  },
];

// Ordered oldest → newest. The pipeline animates through these stages.
export const experience = [
  {
    stage: "build",
    title: "B.Sc. Information Technology",
    org: "St. John College of Humanities & Sciences, Palghar",
    meta: "University of Mumbai",
    period: "20XX – 20XX", // TODO: add your degree years
    highlight: "CGPA 9.9 / 10",
    points: ["Graduated with a CGPA of 9.9 / 10"],
  },
  {
    stage: "test",
    title: "Intern (Virtual)", // TODO: add your exact internship role
    org: "CodSoft",
    meta: "Remote · 1 month",
    period: "TODO", // TODO: add month & year
    highlight: null,
    points: ["TODO: one line about what you built during the internship"],
  },
  {
    stage: "deploy",
    title: "Laravel Developer",
    org: "Enjay IT Solutions, Vapi",
    meta: "Full-time",
    period: "Aug 2026 – Present",
    highlight: null,
    points: [
      "Building features and fixing bugs across Sanchay CRM and Sangam CRM",
      "Automating SIP data sync from investment platforms with Laravel + Playwright",
      "Building scheduler-driven API integrations into the CRM",
    ],
  },
  {
    stage: "next",
    title: "DevOps Engineer",
    org: "Your team?",
    meta: "Full-time",
    period: "Next",
    highlight: null,
    points: ["Looking for my first full-time DevOps role — let's talk!"],
    running: true,
  },
];

export const certifications = [
  { name: "Linux", issuer: "TODO: issuer", url: null },
  { name: "Data Visualization", issuer: "Tata Group", url: null },
  { name: "Software Engineering", issuer: "Electronic Arts", url: null },
  { name: "Data Science", issuer: "IBM", url: null },
  { name: "CRM Fundamentals", issuer: "Enjay Gurukul", url: null },
  { name: "Claude Course", issuer: "Code with Mosh", url: null },
  { name: "Python & IoT", issuer: "ExcelR", url: null },
];

export const hobbies = [
  { icon: "✍️", name: "Composing poems" },
  { icon: "💭", name: "Writing my thoughts" },
  { icon: "🏏", name: "Watching cricket" },
];

// TODO: replace with your own poems / thoughts
export const poems = [
  {
    title: "Your first poem",
    lines: [
      "Replace this with one of your poems —",
      "open src/data/portfolio.js",
      "and paste your words in here.",
    ],
  },
  {
    title: "A thought",
    lines: ["Add short thoughts here too.", "Each one becomes a new card."],
  },
];

export const cricketLines = [
  "Deployments are like Test cricket — patience in the pipeline, then a big finish. 🏏",
  "A green pipeline feels exactly like a last-ball six. 🟢",
  "Rollbacks are just DRS for production. 📺",
  "My uptime target? Not out, all day. 💯",
  "Flaky tests are like rain delays — nobody asked for them. 🌧️",
];
