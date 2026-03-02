const STYLES = {
  "All": { accent: "linear-gradient(135deg, rgba(119,73,255,1), rgba(0,255,209,1))" },
  "Aerospace": { accent: "linear-gradient(135deg, rgba(70,140,255,1), rgba(119,73,255,1))" },
  "Robotics": { accent: "linear-gradient(135deg, rgba(55,255,165,1), rgba(158,255,79,1))" },
  "Additive": { accent: "linear-gradient(135deg, rgba(255,138,76,1), rgba(255,80,160,1))" },
  "Structures": { accent: "linear-gradient(135deg, rgba(255,70,85,1), rgba(255,0,190,1))" },
  "Controls": { accent: "linear-gradient(135deg, rgba(255,230,90,1), rgba(255,162,0,1))" },
  "Software": { accent: "linear-gradient(135deg, rgba(170,85,255,1), rgba(80,140,255,1))" },
  "Testing": { accent: "linear-gradient(135deg, rgba(0,240,255,1), rgba(0,190,140,1))" }
};

const PROJECTS = [
  {
    title: "Lambert Transfer Visualizer + Δv Toolkit",
    style: "Aerospace",
    blurb: "Trajectory design tool with modular solvers, transfer modes, and clean visual outputs.",
    meta: ["Python", "Orbital mechanics", "Visualization"],
    tags: ["Simulation", "Tooling"]
  },
  {
    title: "Hexacopter High-Speed Payload Platform",
    style: "Robotics",
    blurb: "Propulsion + energy sizing for sustained speed with payload constraints and margins.",
    meta: ["Sizing", "Power", "Flight performance"],
    tags: ["Design", "Analysis"]
  },
  {
    title: "Microgravity SLA/SLS Printer Concept",
    style: "Additive",
    blurb: "Containment-first architecture for resin and powder processes in sealed environments.",
    meta: ["Systems", "Risk", "Materials"],
    tags: ["Concept", "Requirements"]
  },
  {
    title: "Reliability-Based Spar Optimization",
    style: "Structures",
    blurb: "Uncertainty-aware design using conservative stress envelopes and statistics.",
    meta: ["Optimization", "Beam theory", "RBDO"],
    tags: ["Math", "Design"]
  },
  {
    title: "PID/State-Space Controller Studies",
    style: "Controls",
    blurb: "Controller design and stability trade studies with validation plots.",
    meta: ["MATLAB", "Control design", "Validation"],
    tags: ["Modeling", "Tuning"]
  },
  {
    title: "Visualization Performance Refactor",
    style: "Software",
    blurb: "Rendering pipeline optimization while preserving geometry and outlines.",
    meta: ["Performance", "Rendering", "UX"],
    tags: ["Refactor", "Speed"]
  }
];

const filtersEl = document.getElementById("filters");
const gridEl = document.getElementById("grid");

let active = "All";

function pill(name){
  const b = document.createElement("button");
  b.className = "pill";
  b.type = "button";
  b.textContent = name;
  b.setAttribute("aria-pressed", String(name === active));
  b.addEventListener("click", () => {
    active = name;
    [...filtersEl.children].forEach(c => c.setAttribute("aria-pressed", String(c.textContent === active)));
    render();
  });
  return b;
}

function card(p){
  const c = document.createElement("a");
  c.className = "card";
  c.href = "#"; // link to project detail
  c.style.setProperty("--accent", STYLES[p.style]?.accent || STYLES["All"].accent);
  c.dataset.style = p.style;

  c.innerHTML = `
    <div class="inner">
      <div class="tagrow">
        <span class="tag style">${p.style}</span>
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <h3 class="title">${p.title}</h3>
      <p class="desc">${p.blurb}</p>
      <div class="meta">
        ${p.meta.map((m,i)=> `${i?'<span class="dot">•</span>':''}<span>${m}</span>`).join("")}
      </div>
    </div>
  `;
  return c;
}

function render(){
  gridEl.innerHTML = "";
  const shown = active === "All" ? PROJECTS : PROJECTS.filter(p => p.style === active);
  shown.forEach(p => gridEl.appendChild(card(p)));
}

Object.keys(STYLES).forEach(name => filtersEl.appendChild(pill(name)));
render();