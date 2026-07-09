import { useState, useEffect, useRef, useCallback } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  FileDown,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* data                                                                */
/* ------------------------------------------------------------------ */

const LINKS = {
  github: "https://github.com/jasleeeen",
  linkedin: "https://linkedin.com/in/jasleen-kaur-sohal-286117271",
  email: "mailto:jasleen7904@gmail.com",
  resume: "/resume.pdf", // put your PDF at portfolio/public/resume.pdf
};

// Add `liveUrl` when a project is deployed. Until then the button
// renders as a quiet "Coming soon" ghost.
const PROJECTS = [
  {
    title: "Diabetic Retinopathy Detection",
    badge: "Published Research",
    blurb:
      "CNN + transfer learning on augmented retinal fundus images, trained to grade referable retinopathy. Published at the 4th ICASET, 2025.",
    metric: "94.2% accuracy",
    tech: ["TensorFlow", "Keras", "CNNs", "Transfer Learning", "OpenCV"],
    repo: "https://github.com/jasleeeen/Diabetic-Retinopathy-Detection",
    liveUrl: undefined,
    visual: "eyecnn",
  },
  {
    title: "Video → 3D Reconstruction Pipeline",
    badge: "Current work",
    blurb:
      "End-to-end pipeline at Auriga IT: sharpness-curated frame extraction, promptable video object segmentation with cross-frame mask propagation, transformer-based multi-view metric reconstruction.",
    metric: "SAM2 · MapAnything",
    tech: ["PyTorch", "Segmentation", "Transformers", "FastAPI"],
    repo: undefined,
    liveUrl: undefined,
    visual: "mesh",
  },
  {
    title: "Driver Drowsiness Detection",
    blurb:
      "Real-time fatigue monitoring from facial landmarks. Eye and mouth aspect ratios drive an alert threshold and a running fatigue score, served as a Streamlit app.",
    metric: "EAR / MAR, live video",
    tech: ["OpenCV", "MediaPipe", "Streamlit", "Python"],
    repo: "https://github.com/jasleeeen/drowsiness-detection",
    liveUrl: undefined,
    visual: "face",
  },
  {
    title: "Clinic Management System",
    badge: "Client project",
    blurb:
      "Production platform for a real clinic: role-based access control, JWT and OTP authentication, SLA tracking and medicine-fulfilment logic, covered by tests.",
    metric: "RBAC · JWT/OTP",
    tech: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Pytest"],
    repo: undefined,
    liveUrl: undefined,
    visual: "clinic",
  },
  {
    title: "Cross-Modal Learning",
    blurb:
      "Image and text pushed into a shared embedding space with Transformer-based encoders, then aligned and retrieved across modalities.",
    metric: "image ⇄ text embeddings",
    tech: ["Hugging Face", "Transformers", "NLP", "Embeddings"],
    repo: undefined,
    liveUrl: undefined,
    visual: "xmodal",
  },
  {
    title: "E-Commerce Platform",
    blurb:
      "Full-stack storefront built during the Capgemini Exceller Edge Fellowship — ASP.NET MVC and Web API, JWT auth, Razorpay checkout.",
    metric: "Razorpay checkout",
    tech: ["C#", "ASP.NET MVC", "Web API", "SQL Server"],
    repo: "https://github.com/jasleeeen/ECommerce",
    liveUrl: undefined,
    visual: "cart",
  },
];

const EXPERIENCE = [
  {
    role: "Machine Learning Intern",
    org: "Auriga IT Consulting, Jaipur",
    when: "Jun 2026 — Present",
    points: [
      "Built an end-to-end video-to-3D reconstruction pipeline: automated frame extraction with sharpness-based curation, promptable video object segmentation with cross-frame mask propagation, and transformer-based multi-view metric reconstruction — turning ordinary handheld video into a usable 3D representation.",
      "Traced and worked around real-world failure modes along the way — noisy mask edges, low-parallax shots, and moving objects — to keep reconstructions stable across messy, varied footage.",
      "Wrote Python RESTful APIs with FastAPI and SQLAlchemy to serve the pipeline end to end, covering data preprocessing, model integration, and the request/response layer around each stage.",
    ],
  },
  {
    role: ".NET with Azure — Fellow",
    org: "Capgemini Exceller Edge Fellowship",
    when: "Jan — May 2026",
    points: [
      "Built REST APIs with JWT-secured endpoints over SQL Server, with hands-on exposure to Microsoft Azure cloud services.",
      "Shipped a full-stack e-commerce platform as the capstone — ASP.NET MVC with secure authentication and a Razorpay payment gateway backed by SQL Server.",
    ],
  },
  {
    role: "Python with Data Science — Trainee",
    org: "Auribises Technologies, Ludhiana",
    when: "Jun — Jul 2024",
    points: [
      "Worked hands-on with Python for data cleaning, preprocessing, and exploratory data analysis on real datasets.",
      "Implemented backend logic for application features, connecting the data work to a functioning app.",
    ],
  },
];

const SKILLS = [
  { group: "Languages", items: ["Python", "C++", "Java", "C#", "R"] },
  {
    group: "Machine learning",
    items: [
      "Supervised learning",
      "Unsupervised learning",
      "Feature engineering",
      "Model evaluation",
      "EDA",
    ],
  },
  {
    group: "Deep learning",
    items: [
      "CNNs",
      "Transfer learning",
      "Transformers",
      "Multimodal learning",
      "Video segmentation",
      "3D reconstruction",
    ],
  },
  {
    group: "Frameworks",
    items: [
      "NumPy",
      "Pandas",
      "scikit-learn",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "FastAPI",
      "SQLAlchemy",
      "LangChain",
      "LangGraph",
      "Gradio",
    ],
  },
  { group: "Databases", items: ["MySQL", "SQL Server", "MongoDB"] },
  { group: "Tools", items: ["Git", "Docker", "Azure", "Power BI"] },
];

const CERTS = [
  ["Deep Learning", "IIT Kharagpur · NPTEL", "2025"],
  ["Introduction to Machine Learning", "IIT Kharagpur · NPTEL", "2024"],
  ["Complete Machine Learning & Data Science", "GeeksforGeeks", "2026"],
  ["Python for Data Science, AI, and Development", "Coursera", "2024"],
];

const CONTACT_CARDS = [
  { label: "GitHub", sub: "jasleeeen — the code behind all of it", href: LINKS.github, Icon: Github },
  { label: "LinkedIn", sub: "Let's connect", href: LINKS.linkedin, Icon: Linkedin },
  { label: "Email", sub: "jasleen7904@gmail.com", href: LINKS.email, Icon: Mail },
  { label: "Résumé", sub: "One page, PDF", href: LINKS.resume, Icon: FileDown },
];

const ROTATING = ["Machine Learning", "Deep Learning", "Computer Vision", "3D Reconstruction", "Exploring Agentic AI"];

// About-section rotator — a live "what I'm on right now" line.
const CURRENTLY = [
  "building: Video→3D Reconstruction",
  "exploring: Agentic AI",
  "building: Freelance Projects",
  "shipping: FastAPI Backends",
];

/* ------------------------------------------------------------------ */
/* hooks                                                               */
/* ------------------------------------------------------------------ */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desktop;
}

// Spring-ish pointer tracking. Returns a ref holding smoothed -1..1 values.
function usePointer(enabled) {
  const target = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0, dotX: 0, dotY: 0, auraX: 0, auraY: 0 });
  const raw = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      raw.current = { x: e.clientX, y: e.clientY };
      target.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled]);

  return { target, smooth, raw };
}

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShown(true),
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

// Writes overall page scroll progress (0..1) to a CSS var on <html>,
// rAF-throttled, so styles anywhere can react to scroll: var(--sp).
function useScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = root.scrollHeight - window.innerHeight;
      const sp = max > 0 ? Math.min((window.scrollY || root.scrollTop) / max, 1) : 0;
      root.style.setProperty("--sp", sp.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* ML mini-visuals                                                     */
/* ------------------------------------------------------------------ */

function NeuralNet() {
  const layers = [3, 5, 5, 2];
  const w = 200;
  const h = 200;
  const nodes = layers.map((count, li) =>
    Array.from({ length: count }, (_, ni) => ({
      x: 28 + (li * (w - 56)) / (layers.length - 1),
      y: (h / (count + 1)) * (ni + 1),
    }))
  );
  const edges = [];
  for (let l = 0; l < nodes.length - 1; l++)
    nodes[l].forEach((a, i) =>
      nodes[l + 1].forEach((b, j) => edges.push({ a, b, k: `${l}-${i}-${j}` }))
    );

  return (
    <svg viewBox="0 0 200 200" className="viz">
      {edges.map((e, i) => (
        <line
          key={e.k}
          x1={e.a.x}
          y1={e.a.y}
          x2={e.b.x}
          y2={e.b.y}
          className="net-edge"
          style={{ animationDelay: `${(i % 11) * 0.24}s` }}
        />
      ))}
      {nodes.flat().map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="3.4"
          className="net-node"
          style={{ animationDelay: `${(i % 7) * 0.3}s` }}
        />
      ))}
    </svg>
  );
}

function RetinaScan() {
  const lesions = [
    [122, 74],
    [78, 118],
    [136, 132],
    [92, 66],
    [108, 142],
  ];
  return (
    <svg viewBox="0 0 200 200" className="viz">
      <defs>
        <radialGradient id="fundus" cx="42%" cy="42%">
          <stop offset="0%" stopColor="var(--accent-warm)" stopOpacity="0.55" />
          <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.05" />
        </radialGradient>
        <clipPath id="eye">
          <circle cx="100" cy="100" r="68" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="68" fill="url(#fundus)" />
      <g clipPath="url(#eye)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M 84 84 Q ${60 + i * 18} ${40 + i * 22} ${20 + i * 30} ${170 - i * 12}`}
            className="vessel"
          />
        ))}
        <rect x="0" y="0" width="200" height="200" className="sweep" />
      </g>
      <circle cx="100" cy="100" r="68" className="eye-ring" />
      <circle cx="84" cy="84" r="12" className="optic-disc" />
      {lesions.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" className="lesion" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}
    </svg>
  );
}

function FaceMesh() {
  const dots = [
    [70, 78], [86, 70], [102, 78], [86, 86],
    [130, 78], [146, 70], [162, 78], [146, 86],
    [116, 108], [104, 122], [128, 122],
    [86, 148], [116, 156], [146, 148],
    [58, 60], [174, 60], [56, 130], [176, 130], [116, 176],
  ];
  const lids = [
    "M 70 78 Q 86 64 102 78 Q 86 92 70 78",
    "M 130 78 Q 146 64 162 78 Q 146 92 130 78",
  ];
  return (
    <svg viewBox="0 0 232 210" className="viz">
      <path d="M 116 26 Q 186 40 190 112 Q 192 176 116 192 Q 40 176 42 112 Q 46 40 116 26" className="face-outline" />
      {lids.map((d, i) => (
        <path key={i} d={d} className="lid" style={{ transformOrigin: i === 0 ? "86px 78px" : "146px 78px" }} />
      ))}
      <path d="M 86 148 Q 116 168 146 148 Q 116 158 86 148" className="mouth" />
      <path d="M 116 100 L 106 128 L 126 128 Z" className="face-outline" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" className="landmark" style={{ animationDelay: `${(i % 6) * 0.25}s` }} />
      ))}
      <text x="16" y="202" className="mono-tick">EAR 0.21</text>
      <text x="164" y="202" className="mono-tick">MAR 0.68</text>
    </svg>
  );
}

function PointCloud({ reduced }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const size = 220;
    cv.width = size * dpr;
    cv.height = size * dpr;
    ctx.scale(dpr, dpr);

    // sparse torus-knot-ish cloud so it reads as a scanned object
    const pts = Array.from({ length: 260 }, () => {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      const R = 46 + Math.random() * 3;
      const r = 17 + Math.random() * 3;
      return {
        x: (R + r * Math.cos(v)) * Math.cos(u),
        y: (R + r * Math.cos(v)) * Math.sin(u),
        z: r * Math.sin(v) + Math.sin(u * 3) * 14,
      };
    });

    let angle = 0;
    let raf;
    let visible = true;
    const accent = getComputedStyle(cv).getPropertyValue("--accent").trim() || "#8b7cf6";

    // stop animating while the canvas is scrolled out of view
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !reduced && !raf) raf = requestAnimationFrame(draw);
      },
      { threshold: 0 }
    );
    io.observe(cv);

    const draw = () => {
      raf = 0;
      ctx.clearRect(0, 0, size, size);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const projected = pts.map((p) => {
        const x = p.x * cos - p.z * sin;
        const z = p.x * sin + p.z * cos;
        const y = p.y * 0.62 + z * 0.18;
        const scale = 260 / (260 + z);
        return { sx: size / 2 + x * scale, sy: size / 2 + y * scale, z, scale };
      });
      projected.sort((a, b) => a.z - b.z);
      for (const p of projected) {
        const depth = (p.z + 70) / 140;
        ctx.globalAlpha = 0.18 + depth * 0.72;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 0.8 + p.scale * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduced && visible) {
        angle += 0.0042;
        raf = requestAnimationFrame(draw);
      }
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="viz cloud-canvas" aria-hidden="true" />;
}

function TokenStream() {
  const toks = ["▁retina", "▁splat", "0x1f", "▁agent", "[CLS]", "▁depth", "##ion", "▁rag"];
  return (
    <div className="tokens" aria-hidden="true">
      {toks.map((t, i) => (
        <span key={t} className="token" style={{ animationDelay: `${i * 0.55}s`, left: `${8 + (i % 4) * 22}%` }}>
          {t}
        </span>
      ))}
    </div>
  );
}

function LossCurve() {
  return (
    <svg viewBox="0 0 200 140" className="viz">
      <line x1="24" y1="118" x2="184" y2="118" className="axis" />
      <line x1="24" y1="16" x2="24" y2="118" className="axis" />
      <path
        d="M 24 24 C 52 96, 66 104, 88 108 C 116 113, 140 110, 184 112"
        className="loss-line"
      />
      <path
        d="M 24 34 C 54 100, 70 110, 92 113 C 120 117, 144 115, 184 116"
        className="loss-line loss-line--val"
      />
      <circle cx="184" cy="112" r="3" className="loss-dot" />
      <text x="30" y="136" className="mono-tick">loss 0.0031</text>
    </svg>
  );
}

/* --- project-card visuals v2 --- */

// retinopathy: fundus in → conv layers → grade bar filling to 94.2%
function EyeCNN() {
  return (
    <svg viewBox="0 0 220 160" className="viz">
      <defs>
        <radialGradient id="fundus2" cx="42%" cy="40%">
          <stop offset="0%" stopColor="var(--accent-warm)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08" />
        </radialGradient>
      </defs>
      <circle cx="44" cy="80" r="26" fill="url(#fundus2)" />
      <circle cx="44" cy="80" r="26" className="eye-ring" />
      <path d="M 36 72 Q 28 88 40 100" className="vessel" />
      <path d="M 50 68 Q 62 82 54 98" className="vessel" />
      <circle cx="52" cy="88" r="2.6" className="lesion" />
      <rect x="92" y="52" width="11" height="56" rx="3" className="cnn-layer" />
      <rect x="112" y="60" width="11" height="40" rx="3" className="cnn-layer" style={{ animationDelay: "0.3s" }} />
      <rect x="132" y="68" width="11" height="24" rx="3" className="cnn-layer" style={{ animationDelay: "0.6s" }} />
      {[0, 0.75, 1.5].map((d) => (
        <circle key={d} cx="74" cy="80" r="2.6" className="flow-dot" style={{ "--fx": "82px", animationDelay: `${d}s` }} />
      ))}
      <rect x="168" y="50" width="14" height="60" rx="4" className="grade-track" />
      <rect x="171" y="53" width="8" height="54" rx="3" className="grade-fill" />
      <text x="150" y="132" className="mono-tick">acc 94.2%</text>
      <text x="22" y="132" className="mono-tick">fundus in</text>
    </svg>
  );
}

// video→3D: filmstrip frames flowing into a wireframe metric mesh
function FramesToMesh() {
  const edges = [
    "M 128 62 L 176 62", "M 176 62 L 176 110", "M 176 110 L 128 110", "M 128 110 L 128 62",
    "M 146 46 L 194 46", "M 194 46 L 194 94", "M 194 94 L 146 94", "M 146 94 L 146 46",
    "M 128 62 L 146 46", "M 176 62 L 194 46", "M 176 110 L 194 94", "M 128 110 L 146 94",
  ];
  const verts = [
    [128, 62], [176, 62], [176, 110], [128, 110],
    [146, 46], [194, 46], [194, 94], [146, 94],
  ];
  return (
    <svg viewBox="0 0 220 160" className="viz">
      <g className="film">
        <rect x="34" y="66" width="46" height="34" rx="4" className="film-frame f3" />
        <rect x="27" y="59" width="46" height="34" rx="4" className="film-frame f2" />
        <rect x="20" y="52" width="46" height="34" rx="4" className="film-frame" />
        <path d="M 38 61 L 38 77 L 51 69 Z" className="film-play" />
      </g>
      {[0, 0.75, 1.5].map((d) => (
        <circle key={d} cx="86" cy="80" r="2.6" className="flow-dot" style={{ "--fx": "34px", animationDelay: `${d}s` }} />
      ))}
      {edges.map((d, i) => (
        <path key={d} d={d} className="mesh-edge" style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
      {verts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.8" className="net-node" style={{ animationDelay: `${(i % 5) * 0.3}s` }} />
      ))}
      <text x="20" y="128" className="mono-tick">frames</text>
      <text x="142" y="140" className="mono-tick">metric mesh</text>
    </svg>
  );
}

// clinic: doctor with stethoscope, med cross, live ECG trace
function ClinicVisit() {
  return (
    <svg viewBox="0 0 220 160" className="viz">
      <circle cx="62" cy="52" r="15" className="doc-line" />
      <path d="M 32 106 Q 62 76 92 106" className="doc-line" />
      <path d="M 52 66 Q 50 88 62 92 Q 74 88 72 66" className="steth" />
      <line x1="62" y1="92" x2="62" y2="100" className="steth" />
      <circle cx="62" cy="105" r="5" className="steth-chest" />
      <g className="cross-pulse">
        <rect x="152" y="30" width="32" height="32" rx="9" className="cross-card" />
        <path d="M 168 38 L 168 54 M 160 46 L 176 46" className="cross-mark" />
      </g>
      <polyline points="108,112 128,112 136,96 146,126 156,104 162,112 196,112" className="ecg" />
      <text x="108" y="140" className="mono-tick">appointments · rx · otp</text>
    </svg>
  );
}

// cross-modal: image panel ⇄ text panel with dots looping both ways
function CrossModalLoop() {
  return (
    <svg viewBox="0 0 220 160" className="viz">
      <g>
        <rect x="18" y="50" width="66" height="56" rx="10" className="xm-panel xm-glow-a" />
        <circle cx="38" cy="66" r="5.5" className="xm-sun" />
        <path d="M 24 98 L 44 74 L 56 88 L 64 78 L 78 98" className="xm-mtn" />
      </g>
      <g>
        <rect x="136" y="50" width="66" height="56" rx="10" className="xm-panel xm-glow-b" />
        <rect x="146" y="62" width="46" height="5" rx="2.5" className="xm-line" />
        <rect x="146" y="74" width="34" height="5" rx="2.5" className="xm-line" style={{ animationDelay: "0.25s" }} />
        <rect x="146" y="86" width="42" height="5" rx="2.5" className="xm-line" style={{ animationDelay: "0.5s" }} />
      </g>
      <path d="M 88 58 C 100 42, 120 42, 132 58" className="xm-arc" />
      <path d="M 132 100 C 120 116, 100 116, 88 100" className="xm-arc" />
      <circle cx="88" cy="54" r="3" className="xm-dot-go" />
      <circle cx="132" cy="102" r="3" className="xm-dot-back" />
      <text x="76" y="140" className="mono-tick">image ⇄ text</text>
    </svg>
  );
}

// e-commerce: a cart zooms across, pauses at checkout, dashes off
function CartDash() {
  return (
    <svg viewBox="0 0 220 160" className="viz">
      {[54, 74, 94].map((y, i) => (
        <line key={y} x1="16" y1={y} x2="64" y2={y} className="speed-line" style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
      <g className="cart-g">
        <g className="tag-bob">
          <rect x="128" y="28" width="30" height="19" rx="5" className="tag-card" />
          <text x="138" y="42" className="tag-txt">₹</text>
        </g>
        <path d="M 58 52 L 74 54 L 84 94 L 144 94 L 154 64 L 78 64" className="cart-line" />
        <circle cx="104" cy="58" r="6" className="cart-item" />
        <rect x="116" y="50" width="12" height="12" rx="3" className="cart-item2" />
        <g className="wheel-spin">
          <circle cx="94" cy="108" r="7" className="cart-line" />
          <line x1="94" y1="101" x2="94" y2="115" className="cart-line" />
        </g>
        <g className="wheel-spin">
          <circle cx="136" cy="108" r="7" className="cart-line" />
          <line x1="136" y1="101" x2="136" y2="115" className="cart-line" />
        </g>
      </g>
      <text x="146" y="140" className="mono-tick">checkout ✓</text>
    </svg>
  );
}

const VISUALS = {
  net: NeuralNet,
  retina: RetinaScan,
  face: FaceMesh,
  cloud: PointCloud,
  tokens: TokenStream,
  loss: LossCurve,
  graph: NeuralNet,
  eyecnn: EyeCNN,
  mesh: FramesToMesh,
  clinic: ClinicVisit,
  xmodal: CrossModalLoop,
  cart: CartDash,
};

function Visual({ name, reduced }) {
  const C = VISUALS[name] || NeuralNet;
  return <C reduced={reduced} />;
}

/* ------------------------------------------------------------------ */
/* shiny button — conic-gradient border that spins up on hover         */
/* ------------------------------------------------------------------ */

function ShinyButton({ children, onClick, href, external = false, disabled = false, className = "" }) {
  const inner = <span className="shiny-label">{children}</span>;
  if (disabled) {
    return (
      <span className={`shiny-cta is-disabled ${className}`} aria-disabled="true">
        {inner}
      </span>
    );
  }
  if (href) {
    return (
      <a
        className={`shiny-cta ${className}`}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={`shiny-cta ${className}`} onClick={onClick}>
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* hero pieces                                                         */
/* ------------------------------------------------------------------ */

const FLOATERS = [
  // the big one: sits dead-center behind the hero panel; its edges peek out
  // around the glass and the rest shows through the panel's backdrop blur
  { visual: "cloud", shape: "blob-a", top: "34%", left: "36%", size: 520, dur: 12.5, rot: 2, note: "points 214k", big: true },

  // main ring
  { visual: "retina", shape: "blob-a", top: "10%", left: "10%", size: 230, dur: 7.4, rot: -4, note: "accuracy 94.2%" },
  { visual: "cloud", shape: "blob-b", top: "56%", left: "14%", size: 220, dur: 8.6, rot: 5, note: "points 214k" },
  { visual: "face", shape: "blob-c", top: "12%", left: "66%", size: 240, dur: 7.9, rot: 3, note: "EAR 0.21" },
  { visual: "net", shape: "blob-d", top: "60%", left: "64%", size: 210, dur: 9.1, rot: -6, note: "epoch 42/100" },
  { visual: "loss", shape: "blob-b", top: "36%", left: "84%", size: 170, dur: 8.1, rot: 4, note: "loss ↓" },
  { visual: "tokens", shape: "blob-c", top: "80%", left: "40%", size: 180, dur: 7.2, rot: -3, note: "d_model 768" },

  // small satellites
  { visual: "net", shape: "blob-a", top: "26%", left: "30%", size: 110, dur: 6.2, rot: 6, mini: true },
  { visual: "loss", shape: "blob-c", top: "22%", left: "48%", size: 96, dur: 5.6, rot: -5, mini: true },
  { visual: "tokens", shape: "blob-b", top: "66%", left: "34%", size: 104, dur: 6.8, rot: 4, mini: true },
  { visual: "face", shape: "blob-d", top: "52%", left: "52%", size: 100, dur: 5.9, rot: -7, mini: true },
  { visual: "retina", shape: "blob-a", top: "78%", left: "72%", size: 112, dur: 6.5, rot: 3, mini: true },
  { visual: "net", shape: "blob-b", top: "8%", left: "42%", size: 92, dur: 5.4, rot: -4, mini: true },
];

function FloatingCards({ reduced }) {
  return (
    <>
      {FLOATERS.map((f) => (
        <div
          key={f.visual + f.top + f.left}
          className={`floater ${f.shape} ${f.big ? "floater-big" : ""} ${f.mini ? "floater-mini" : ""}`}
          style={{
            top: f.top,
            left: f.left,
            width: f.size,
            height: f.size,
            animationDuration: `${f.dur}s`,
            "--rot": `${f.rot}deg`,
          }}
        >
          <div className="floater-inner">
            <Visual name={f.visual} reduced={reduced} />
          </div>
          {f.note && <span className="floater-note">{f.note}</span>}
        </div>
      ))}
    </>
  );
}

function Typewriter({ words = ROTATING }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [erasing, setErasing] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    const full = words[i];
    if (!erasing && text === full) {
      const t = setTimeout(() => setErasing(true), 1700);
      return () => clearTimeout(t);
    }
    if (erasing && text === "") {
      setErasing(false);
      setI((n) => (n + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => setText(erasing ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
      erasing ? 34 : 62
    );
    return () => clearTimeout(t);
  }, [text, erasing, i, reduced, words]);

  return (
    <span className="typer">
      {text}
      <i className="caret" aria-hidden="true" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* lamp header — CSS recreation of the Aceternity lamp, theme accents  */
/* ------------------------------------------------------------------ */

function LampTitle({ eyebrow, children }) {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} className={`lamp ${shown ? "is-lit" : ""}`}>
      <div className="lamp-stage" aria-hidden="true">
        <div className="lamp-halo" />
        <div className="lamp-cone lamp-cone-l" />
        <div className="lamp-cone lamp-cone-r" />
        <div className="lamp-spark" />
        <div className="lamp-line" />
      </div>
      <div className="lamp-copy">
        <span className="mono eyebrow">{eyebrow}</span>
        <h2 className="section-title">{children}</h2>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* sections                                                            */
/* ------------------------------------------------------------------ */

const NAV = [
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Skills", "skills"],
  ["Contact", "contact"],
];

function goTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Nav({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <button className="mono monogram" onClick={() => goTo("top")}>
        JKS<span className="dot" />
      </button>

      <div className="nav-links">
        {NAV.map(([label, id]) => (
          <button key={id} className="nav-link" onClick={() => goTo(id)}>
            {label}
          </button>
        ))}
        <a className="icon-btn" href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Github size={16} />
        </a>
        <a className="icon-btn" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin size={16} />
        </a>
        <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      <div className="nav-mobile">
        <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="icon-btn" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open && (
        <div className="sheet">
          {NAV.map(([label, id]) => (
            <button
              key={id}
              className="sheet-link"
              onClick={() => {
                setOpen(false);
                goTo(id);
              }}
            >
              {label} <ArrowRight size={15} />
            </button>
          ))}
          <a className="sheet-link" href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub <Github size={15} />
          </a>
          <a className="sheet-link" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <Linkedin size={15} />
          </a>
        </div>
      )}
    </nav>
  );
}

function ProjectCard({ p, reduced, i }) {
  return (
    <Reveal as="article" className="card project" delay={(i % 2) * 90}>
      <div className="project-art" aria-hidden="true">
        <Visual name={p.visual} reduced={reduced} />
      </div>
      <div className="project-body">
        <div className="project-head">
          <h3>{p.title}</h3>
          {p.badge && <span className="badge">{p.badge}</span>}
        </div>
        <p className="project-blurb">{p.blurb}</p>
        <p className="mono metric">{p.metric}</p>
        <ul className="chips">
          {p.tech.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        <div className="project-links">
          {p.repo ? (
            <ShinyButton href={p.repo} external className="shiny-sm">
              <Github size={15} /> Code
            </ShinyButton>
          ) : (
            <ShinyButton disabled className="shiny-sm">
              <Github size={15} /> Private
            </ShinyButton>
          )}
          {p.liveUrl ? (
            <ShinyButton href={p.liveUrl} external className="shiny-sm">
              <ExternalLink size={15} /> Live demo
            </ShinyButton>
          ) : (
            <ShinyButton disabled className="shiny-sm">
              <ExternalLink size={15} /> Demo soon
            </ShinyButton>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function ContactStack() {
  const [open, setOpen] = useState(false);
  return (
    <div className={`stack ${open ? "is-open" : ""}`} onClick={() => setOpen(true)}>
      {CONTACT_CARDS.map((c, i) => (
        <a
          key={c.label}
          className="stack-card"
          href={c.href}
          target={c.href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          style={{ "--i": i, zIndex: 10 - i }}
          onClick={(e) => !open && e.preventDefault()}
        >
          <span className="stack-icon">
            <c.Icon size={20} />
          </span>
          <span className="stack-text">
            <strong>{c.label}</strong>
            <em>{c.sub}</em>
          </span>
          <ArrowRight size={16} className="stack-arrow" />
        </a>
      ))}
      <div className="stack-foot">
        {open ? (
          <ShinyButton
            className="shiny-sm"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            Show less
          </ShinyButton>
        ) : (
          <span className="mono hint">tap to expand</span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* about — keyword ignition + rotator + spotlight                      */
/* ------------------------------------------------------------------ */

function About({ spotlight }) {
  const panelRef = useRef(null);
  const [shown, setShown] = useState(false);

  // reveal-on-scroll (same threshold as the shared Reveal helper)
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShown(true),
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // pointer-tracked spotlight — reuses the panel's own bounds
  const onMove = (e) => {
    const el = panelRef.current;
    if (!spotlight || !el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section className="section narrow">
      <div
        ref={panelRef}
        onMouseMove={onMove}
        className={`panel about about-panel reveal ${shown ? "is-in" : ""} ${
          spotlight ? "has-spot" : ""
        }`}
      >
        {spotlight && <span className="about-spot" aria-hidden="true" />}
        <span className="mono eyebrow">About</span>
        <p className="about-copy">
          Computer Science Engineering graduate with hands-on experience building AI/ML systems in
          Python — <span className="kw" style={{ "--kd": "140ms" }}>deep learning</span>,{" "}
          <span className="kw" style={{ "--kd": "300ms" }}>computer vision</span>, and{" "}
          <span className="kw" style={{ "--kd": "460ms" }}>multimodal AI</span>. I write FastAPI and
          SQLAlchemy backends to put models somewhere they can actually be used, work with Hugging
          Face Transformers, and I'm steadily moving toward{" "}
          <span className="kw" style={{ "--kd": "620ms" }}>agentic AI</span>, LLM pipelines, and{" "}
          <span className="kw" style={{ "--kd": "780ms" }}>RAG</span> architectures.
        </p>
        <p className="mono rotator about-now">
          <span className="rot-label">currently:</span> <Typewriter words={CURRENTLY} />
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  const parallaxOn = desktop && !reduced;
  useScrollProgress();

  const canvasRef = useRef(null);
  const panelRef = useRef(null);
  const dotRef = useRef(null);
  const auraRef = useRef(null);
  const { target, smooth, raw } = usePointer(parallaxOn);
  const rawSmooth = useRef({ x: 0, y: 0, ax: 0, ay: 0 });

  useEffect(() => {
    if (!parallaxOn) return;
    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      const s = smooth.current;
      s.x = lerp(s.x, target.current.x, 0.06);
      s.y = lerp(s.y, target.current.y, 0.06);
      if (canvasRef.current)
        canvasRef.current.style.transform = `translate3d(${-s.x * 130}px, ${-s.y * 130}px, 0)`;
      if (panelRef.current)
        panelRef.current.style.transform = `translate3d(${s.x * 16}px, ${s.y * 16}px, 0)`;

      const r = rawSmooth.current;
      r.x = lerp(r.x, raw.current.x, 0.28);
      r.y = lerp(r.y, raw.current.y, 0.28);
      r.ax = lerp(r.ax, raw.current.x, 0.1);
      r.ay = lerp(r.ay, raw.current.y, 0.1);
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${r.x}px, ${r.y}px, 0) translate(-50%, -50%)`;
      if (auraRef.current) auraRef.current.style.transform = `translate3d(${r.ax}px, ${r.ay}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [parallaxOn, target, smooth, raw]);

  return (
    <div className={`root ${dark ? "theme-dark" : "theme-light"} ${parallaxOn ? "cursor-hidden" : ""}`} id="top">
      <style>{CSS}</style>

      {/* scroll progress rail */}
      <div className="scroll-rail" aria-hidden="true"><span /></div>

      {/* ambient gradient field — drifts and parallaxes with scroll */}
      <div className="blobs" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
        <span className="blob blob-4" />
      </div>
      {/* contrast scrim keeps text readable over the warm lower blobs */}
      <div className="scrim" aria-hidden="true" />

      <Nav dark={dark} setDark={setDark} />

      {/* ---------------- hero ---------------- */}
      <header className="hero">
        <div className="hero-canvas" ref={canvasRef} aria-hidden="true">
          <FloatingCards reduced={reduced} />
        </div>

        <div className="hero-panel-wrap" ref={panelRef}>
          <div className="panel hero-panel">
            <span className="mono eyebrow">Auriga IT · Chandigarh University, CSE ’26 · India</span>
            <h1>
              Jasleen
              <br />
              Kaur Sohal
            </h1>
            <p className="lede">
              AI/ML engineer. I build systems that see, reconstruct, and reason.
            </p>
            <p className="mono rotator">
              <span className="rot-label">focus:</span> <Typewriter />
            </p>
            <div className="hero-cta">
              <ShinyButton onClick={() => goTo("projects")}>
                View projects <ArrowRight size={15} />
              </ShinyButton>
              <ShinyButton href={LINKS.github} external>
                <Github size={15} /> GitHub
              </ShinyButton>
              <ShinyButton href={LINKS.resume} external>
                <FileDown size={15} /> Résumé
              </ShinyButton>
            </div>
          </div>
        </div>

        <div className="hero-fade" aria-hidden="true" />
      </header>

      <main>
        {/* ---------------- about ---------------- */}
        <About spotlight={parallaxOn} />

        {/* ---------------- experience ---------------- */}
        <section className="section" id="experience">
          <Reveal>
            <span className="mono eyebrow">Experience</span>
            <h2 className="section-title">Where I've been building</h2>
          </Reveal>
          <div className="timeline">
            {EXPERIENCE.map((e, i) => (
              <Reveal as="div" key={e.org} className="panel tl-item" delay={i * 80}>
                <div className="tl-head">
                  <div>
                    <h3>{e.role}</h3>
                    <p className="tl-org">{e.org}</p>
                  </div>
                  <span className="mono tl-when">{e.when}</span>
                </div>
                <ul className="tl-points">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- projects ---------------- */}
        <section className="section" id="projects">
          <Reveal>
            <span className="mono eyebrow">Selected work</span>
            <h2 className="section-title">Things I Built</h2>
          </Reveal>
          <div className="grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} p={p} reduced={reduced} i={i} />
            ))}
          </div>
        </section>

        {/* ---------------- skills ---------------- */}
        <section className="section" id="skills">
          <LampTitle eyebrow="Toolkit">What I reach for</LampTitle>
          <div className="skills">
            {SKILLS.map((s, i) => (
              <Reveal as="div" key={s.group} className="panel skill-group" delay={i * 60}>
                <h3 className="mono skill-title">{s.group}</h3>
                <ul className="chips">
                  {s.items.map((it) => (
                    <li key={it} className="chip chip-lift">
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- certifications ---------------- */}
        <section className="section narrow">
          <Reveal>
            <span className="mono eyebrow">Credentials</span>
            <h2 className="section-title">Certifications</h2>
          </Reveal>
          <Reveal className="panel certs">
            {CERTS.map(([name, org, year], i) => (
              <div key={name} className="cert" style={{ "--cd": `${i * 170}ms` }}>
                <svg viewBox="0 0 32 32" className="cert-seal" aria-hidden="true">
                  <circle cx="16" cy="16" r="13" className="seal-ring" />
                  <path d="M 10.5 16.5 L 14.5 20.5 L 22 12" className="seal-check" />
                </svg>
                <span className="cert-name">{name}</span>
                <span className="cert-org">{org}</span>
                <span className="mono cert-year">{year}</span>
              </div>
            ))}
          </Reveal>
        </section>

        {/* ---------------- contact ---------------- */}
        <section className="section contact" id="contact">
          <Reveal className="contact-copy">
            <span className="mono eyebrow">Contact</span>
            <h2 className="section-title">Open to ML engineering roles</h2>
            <p className="lede-sm">
              If you're building something that has to perceive the world or reason about it, I'd like to
              hear about it.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ContactStack />
          </Reveal>
        </section>
      </main>

      <footer className="footer mono">
        <span className="footer-links">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">github</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">linkedin</a>
          <a href={LINKS.email}>email</a>
        </span>
      </footer>

      {parallaxOn && (
        <>
          <div className="cursor-aura" ref={auraRef} aria-hidden="true" />
          <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* styles                                                              */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;600;800&family=JetBrains+Mono:wght@400;500&display=swap');

/* page reset — lives here so it applies even if index.css isn't imported,
   and overrides Vite's template defaults (#root max-width/padding, body flex) */
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #08080b; }
#root { max-width: none; margin: 0; padding: 0; min-height: 100vh; text-align: left; display: block; }

.root {
  --bg: #08080b;
  --fg: #f2f2f5;
  --muted: #9a9aa6;
  --line: rgba(255,255,255,0.09);
  --glass: rgba(255,255,255,0.05);
  --glass-hi: rgba(255,255,255,0.13);
  --edge: rgba(255,255,255,0.16);
  --accent: #8b7cf6;
  --accent-2: #38bdf8;
  --accent-warm: #fbbf24;
  --shadow: 0 24px 60px -24px rgba(0,0,0,0.7);
  --inner: inset 0 1px 0 rgba(255,255,255,0.10);
  --blob-blend: screen;
  --blob-op: 0.26;

  background: var(--bg);
  color: var(--fg);
  font-family: 'Sora', ui-sans-serif, system-ui, sans-serif;
  font-weight: 300;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  transition: background 500ms ease, color 500ms ease;
}
.root.theme-light {
  --bg: #f7f7f9;
  --fg: #16161a;
  --muted: #6b6b76;
  --line: rgba(0,0,0,0.08);
  --glass: rgba(255,255,255,0.55);
  --glass-hi: rgba(255,255,255,0.75);
  --edge: rgba(255,255,255,0.8);
  --accent: #6d5ae0;
  --accent-2: #0284c7;
  --accent-warm: #d97706;
  --shadow: 0 24px 60px -28px rgba(20,20,40,0.28);
  --inner: inset 0 1px 0 rgba(255,255,255,0.9);
  --blob-blend: multiply;
  --blob-op: 0.34;
}
.root.cursor-hidden, .root.cursor-hidden * { cursor: none; }
.root a, .root button { -webkit-tap-highlight-color: transparent; }
.root :focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 10px;
}
.mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

/* ---- ambient blobs ---- */
.blobs {
  position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
  /* gentle scroll parallax — translate only (cheap: the blurred layers are
     cached textures; no re-blur, unlike the old scale effect) */
  transform: translate3d(0, calc(var(--sp, 0) * -16vh), 0);
  transition: transform 200ms ease-out;
}
.blob {
  position: absolute; border-radius: 999px; display: block;
  filter: blur(64px);
  mix-blend-mode: var(--blob-blend);
  opacity: var(--blob-op);
  transition: opacity 500ms ease;
}
/* motion is translate-based: visibly wandering, but never re-rasterizes the blur */
.blob-1 { top: -14%; left: -10%; width: 58vw; height: 58vw; background: #8b7cf6; animation: wander1 26s ease-in-out infinite; }
.blob-2 { top: 14%; right: -12%; width: 48vw; height: 48vw; background: #38bdf8; animation: wander2 30s ease-in-out infinite; }
.blob-3 { bottom: -22%; left: 16%; width: 66vw; height: 66vw; background: #b45309; animation: wander1 36s ease-in-out infinite reverse; opacity: calc(var(--blob-op) * 0.45); }
.blob-4 { bottom: -8%; right: 8%; width: 40vw; height: 40vw; background: #fb7185; animation: wander2 24s ease-in-out infinite reverse; opacity: calc(var(--blob-op) * 0.5); }
.theme-light .blob-3 { background: #fbbf24; opacity: calc(var(--blob-op) * 0.7); }
.theme-light .blob-4 { opacity: calc(var(--blob-op) * 0.7); }
@media (min-width: 768px) { .blob { filter: blur(90px); } }
@keyframes wander1 {
  0%,100% { transform: translate3d(0,0,0); }
  33% { transform: translate3d(9vw, 6vh, 0); }
  66% { transform: translate3d(-6vw, -8vh, 0); }
}
@keyframes wander2 {
  0%,100% { transform: translate3d(0,0,0); }
  33% { transform: translate3d(-10vw, 7vh, 0); }
  66% { transform: translate3d(7vw, -6vh, 0); }
}
/* contrast scrim: darkens progressively down the page so text stays readable
   over the warm lower blobs; disabled in light theme */
.scrim {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background: linear-gradient(to bottom, transparent 30%, rgba(5,5,9,0.42) 68%, rgba(5,5,9,0.6));
}
.theme-light .scrim { display: none; }

/* ---- nav ---- */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 60;
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 18px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid transparent;
}
.monogram {
  background: none; border: 0; color: var(--fg);
  font-size: 13px; letter-spacing: 0.22em; font-weight: 500;
  display: inline-flex; align-items: center; gap: 6px; padding: 6px 4px;
}
.monogram .dot { width: 5px; height: 5px; border-radius: 999px; background: var(--accent); display: inline-block; }
.nav-links { display: none; align-items: center; gap: 4px; }
@media (min-width: 768px) { .nav-links { display: flex; } .nav-mobile { display: none !important; } }
.nav-mobile { display: flex; gap: 6px; }
.nav-link {
  background: none; border: 0; color: var(--muted); font: inherit; font-size: 13px;
  padding: 8px 12px; border-radius: 999px; transition: color 200ms, background 200ms;
}
.nav-link:hover { color: var(--fg); background: var(--glass); }
.icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; border-radius: 999px;
  background: linear-gradient(165deg, rgba(255,255,255,0.06), rgba(14,14,20,0.25) 65%);
  border: 1px solid rgba(255,255,255,0.14);
  border-top-color: rgba(255,255,255,0.30); color: var(--muted);
  transition: color 200ms, background 200ms, transform 200ms;
}
.icon-btn:hover { color: var(--fg); background: var(--glass-hi); transform: translateY(-1px); }
.sheet {
  position: absolute; top: 62px; left: 12px; right: 12px;
  display: flex; flex-direction: column; gap: 2px; padding: 8px;
  background: var(--glass-hi); border: 1px solid var(--line);
  border-radius: 20px; backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  box-shadow: var(--shadow);
}
.sheet-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 14px; border-radius: 14px; background: none; border: 0;
  color: var(--fg); font: inherit; font-size: 15px; min-height: 44px;
}
.sheet-link:hover { background: var(--glass); }

/* ---- hero ---- */
.hero {
  position: relative; z-index: 1;
  min-height: 100svh; display: grid; place-items: center;
  overflow: hidden; padding: 96px 16px 40px;
}
.hero-canvas {
  position: absolute; top: -40vh; left: -40vw;
  width: 180vw; height: 180vh; z-index: 0; pointer-events: none;
  will-change: transform;
}
@media (max-width: 767px) {
  .hero-canvas { top: -10vh; left: 0; width: 100vw; height: 120vh; opacity: 0.5; }
}
.floater {
  position: absolute; overflow: hidden;
  background: linear-gradient(150deg, rgba(255,255,255,0.05), rgba(14,14,20,0.22) 60%);
  border: 1px solid rgba(255,255,255,0.14);
  border-top-color: rgba(255,255,255,0.30);
  box-shadow: var(--shadow);
  backdrop-filter: blur(3px) saturate(140%);
  -webkit-backdrop-filter: blur(3px) saturate(140%);
  display: grid; place-items: center;
  animation-name: bob; animation-iteration-count: infinite; animation-timing-function: ease-in-out;
  transform: rotate(var(--rot));
}
@media (max-width: 767px) {
  .floater { width: 42vw !important; height: 42vw !important; }
  .floater:nth-child(n+6), .floater-mini { display: none; }
  .floater-big { width: 88vw !important; height: 88vw !important; opacity: 0.7; }
}
.floater-big { opacity: 0.95; }
.floater-big .floater-inner { opacity: 0.95; }
.floater-mini .floater-inner { width: 66%; height: 66%; opacity: 0.7; }
.floater-mini { animation-name: bobSm; }
@keyframes bobSm {
  0%,100% { transform: translate3d(0,0,0) rotate(var(--rot)); }
  50% { transform: translate3d(-10px,-20px,0) rotate(calc(var(--rot) - 4deg)); }
}
.floater-inner { width: 78%; height: 78%; display: grid; place-items: center; opacity: 0.85; }
.floater-note {
  position: absolute; bottom: 12px; font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: 0.08em; color: var(--muted); opacity: 0.75;
}
.blob-a { border-radius: 999px; }
.blob-b { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; }
.blob-c { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
.blob-d { border-radius: 44px; }
@keyframes bob {
  0%,100% { transform: translate3d(0,0,0) rotate(var(--rot)); }
  50% { transform: translate3d(16px,-34px,0) rotate(calc(var(--rot) + 5deg)); }
}

.hero-panel-wrap { position: relative; z-index: 2; width: 100%; max-width: 560px; will-change: transform; }
/* ---- smoked lens glass ----
   Dark, near-clear pane. Objects and light behind pass straight through
   (low blur, high saturation). The only edge treatment is a single crisp
   1px line, brighter where the light hits (top) and fading down the sides.
   No rim bands, no frames. */
.panel {
  background: linear-gradient(170deg, rgba(255,255,255,0.055), rgba(16,16,22,0.28) 55%);
  border: 1px solid transparent;
  border-radius: 28px;
  backdrop-filter: blur(5px) saturate(140%);
  -webkit-backdrop-filter: blur(5px) saturate(140%);
  box-shadow: var(--shadow);
  position: relative;
  background-clip: padding-box;
  transition: background 500ms ease, border-color 500ms ease;
}
.theme-light .panel {
  background: linear-gradient(170deg, rgba(255,255,255,0.6), rgba(240,240,246,0.3) 55%);
}

/* the hairline: 1px gradient edge, bright at top, nearly gone at bottom */
.panel::after {
  content: ''; position: absolute; inset: -1px; border-radius: inherit; pointer-events: none;
  padding: 1px;
  background: linear-gradient(175deg,
    rgba(255,255,255,0.45) 0%,
    rgba(255,255,255,0.14) 28%,
    rgba(255,255,255,0.05) 65%,
    rgba(255,255,255,0.10) 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
}
.theme-light .panel::after {
  background: linear-gradient(175deg,
    rgba(255,255,255,1) 0%,
    rgba(255,255,255,0.6) 28%,
    rgba(150,150,170,0.3) 65%,
    rgba(255,255,255,0.7) 100%);
}

/* whisper of top-light — no hard sheet, just glass catching the room */
.panel::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: linear-gradient(to bottom, rgba(255,255,255,0.09), transparent 26%);
  z-index: 1;
}
.theme-light .panel::before {
  background: linear-gradient(to bottom, rgba(255,255,255,0.7), transparent 30%);
}
.panel > * { position: relative; z-index: 2; }
.hero-panel { padding: 26px 22px 24px; text-align: center; }
.hero-panel.panel {
  backdrop-filter: blur(6px) saturate(150%);
  -webkit-backdrop-filter: blur(6px) saturate(150%);
}
@media (min-width: 640px) { .hero-panel { padding: 36px 36px 32px; border-radius: 36px; } }
.eyebrow {
  display: inline-block; font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--muted); margin-bottom: 14px;
}
.hero-panel h1 {
  font-size: clamp(2.1rem, 7.5vw, 3.9rem);
  line-height: 0.95; font-weight: 800; letter-spacing: -0.04em; margin: 0 0 14px;
  background: linear-gradient(180deg, var(--fg), color-mix(in srgb, var(--fg) 45%, transparent));
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.lede { font-size: clamp(0.92rem, 2vw, 1.05rem); color: var(--muted); max-width: 36ch; margin: 0 auto 14px; line-height: 1.55; }
.lede-sm { color: var(--muted); line-height: 1.65; max-width: 46ch; }
.rotator { font-size: 12px; color: var(--fg); margin: 0 0 20px; letter-spacing: 0.02em; }
.rot-label { color: var(--muted); }
.typer { color: var(--accent); }
.caret { display: inline-block; width: 1px; height: 1em; background: var(--accent); margin-left: 3px; vertical-align: -2px; animation: blink 1s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }
.hero-cta { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
.hero-fade {
  position: absolute; bottom: 0; left: 0; right: 0; height: 32vh; z-index: 1; pointer-events: none;
  background: linear-gradient(to bottom, transparent, var(--bg));
}

/* ---- buttons ---- */
@media (max-width: 480px) { .project-links .shiny-cta { flex: 1 1 100%; } }

/* ---- shiny cta ---- */
/* Rest: a bare glass pill with a hairline border — nothing else.
   Hover/focus: the full shiny CTA — black pill, blue conic border,
   white dot matrix, inner shimmer, breathing glow. All of it fades up. */
@property --gradient-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
@property --gradient-angle-offset { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
@property --gradient-percent { syntax: "<percentage>"; initial-value: 0%; inherits: false; }
@property --gradient-shine { syntax: "<color>"; initial-value: transparent; inherits: false; }
/* registered so the pill can fade from transparent glass to solid black */
@property --pill-fill { syntax: "<color>"; initial-value: transparent; inherits: false; }

.shiny-cta {
  --shiny-bg: #000000;
  --shiny-bg-subtle: #1a1818;
  --shiny-highlight: #1d4ed8;
  --shiny-highlight-subtle: #8484ff;
  --spin: gradient-angle linear infinite;
  --duration: 3s;
  --shadow-size: 2px;
  --shiny-transition: 700ms cubic-bezier(0.25, 1, 0.5, 1);

  /* dormant */
  --gradient-percent: 0%;
  --gradient-angle-offset: 0deg;
  --gradient-shine: transparent;
  --pill-fill: transparent;

  isolation: isolate;
  position: relative;
  overflow: hidden;
  outline-offset: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 22px;
  font-family: inherit;
  font-size: 13.5px;
  line-height: 1.2;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 360px;
  color: var(--fg);
  background:
    linear-gradient(var(--pill-fill), var(--pill-fill)) padding-box,
    conic-gradient(
      from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
      transparent,
      var(--shiny-highlight) var(--gradient-percent),
      var(--gradient-shine) calc(var(--gradient-percent) * 2),
      var(--shiny-highlight) calc(var(--gradient-percent) * 3),
      transparent calc(var(--gradient-percent) * 4)
    ) border-box;
  background-color: var(--glass);
  backdrop-filter: blur(12px) saturate(170%);
  -webkit-backdrop-filter: blur(12px) saturate(170%);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.13), inset 0 1px 0 rgba(255,255,255,0.26);
  transition: var(--shiny-transition);
  transition-property: --gradient-angle-offset, --gradient-percent, --gradient-shine,
    --pill-fill, color, translate, box-shadow;
}
.shiny-sm { min-height: 40px; padding: 0 18px; font-size: 12.5px; }
.shiny-cta.is-disabled { opacity: 0.35; pointer-events: none; }

.shiny-cta::before,
.shiny-cta::after,
.shiny-cta .shiny-label::before {
  content: "";
  pointer-events: none;
  position: absolute;
  inset-inline-start: 50%;
  inset-block-start: 50%;
  translate: -50% -50%;
  z-index: -1;
}
.shiny-cta:active { translate: 0 1px; }

/* dot matrix, revealed through a rotating conic mask */
.shiny-cta::before {
  --size: calc(100% - var(--shadow-size) * 3);
  --position: 2px;
  --space: calc(var(--position) * 2);
  width: var(--size);
  height: var(--size);
  background: radial-gradient(
    circle at var(--position) var(--position),
    white calc(var(--position) / 4),
    transparent 0
  ) padding-box;
  background-size: var(--space) var(--space);
  background-repeat: space;
  mask-image: conic-gradient(from calc(var(--gradient-angle) + 45deg), black, transparent 10% 90%, black);
  -webkit-mask-image: conic-gradient(from calc(var(--gradient-angle) + 45deg), black, transparent 10% 90%, black);
  border-radius: inherit;
  opacity: 0;
  transition: opacity var(--shiny-transition);
  z-index: -1;
}

/* inner shimmer */
.shiny-cta::after {
  --spin: shimmer linear infinite;
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(-50deg, transparent, var(--shiny-highlight), transparent);
  mask-image: radial-gradient(circle at bottom, transparent 40%, black);
  -webkit-mask-image: radial-gradient(circle at bottom, transparent 40%, black);
  opacity: 0;
  transition: opacity var(--shiny-transition);
}

.shiny-cta .shiny-label { z-index: 1; display: inline-flex; align-items: center; gap: 8px; }
.shiny-cta .shiny-label::before {
  --size: calc(100% + 1rem);
  width: var(--size);
  height: var(--size);
  box-shadow: inset 0 -1ex 2rem 4px var(--shiny-highlight);
  opacity: 0;
  transition: opacity var(--shiny-transition);
  animation: calc(var(--duration) * 1.5) breathe linear infinite paused;
}

/* every animation is paused; hover/focus is the only thing that starts them */
.shiny-cta,
.shiny-cta::before,
.shiny-cta::after {
  animation: var(--spin) var(--duration) paused, var(--spin) calc(var(--duration) / 0.4) reverse paused;
  animation-composition: add;
}

.shiny-cta:is(:hover, :focus-visible) {
  --gradient-percent: 20%;
  --gradient-angle-offset: 95deg;
  --gradient-shine: var(--shiny-highlight-subtle);
  --pill-fill: var(--shiny-bg);
  color: #ffffff;
  box-shadow: inset 0 0 0 1px var(--shiny-bg-subtle);
}
.shiny-cta:is(:hover, :focus-visible),
.shiny-cta:is(:hover, :focus-visible)::before,
.shiny-cta:is(:hover, :focus-visible)::after,
.shiny-cta:is(:hover, :focus-visible) .shiny-label::before { animation-play-state: running; }
.shiny-cta:is(:hover, :focus-visible)::before { opacity: 0.4; }
.shiny-cta:is(:hover, :focus-visible)::after { opacity: 0.6; }
.shiny-cta:is(:hover, :focus-visible) .shiny-label::before { opacity: 1; }

@keyframes gradient-angle { to { --gradient-angle: 360deg; } }
@keyframes shimmer { to { rotate: 360deg; } }
@keyframes breathe { from, to { scale: 1; } 50% { scale: 1.2; } }

/* ---- layout ---- */
.section { position: relative; z-index: 1; max-width: 1120px; margin: 0 auto; padding: 88px 16px; }
@media (min-width: 768px) { .section { padding: 128px 32px; } }
.section.narrow { max-width: 760px; }
.section-title {
  font-size: clamp(1.7rem, 4.6vw, 2.9rem); font-weight: 600; letter-spacing: -0.03em;
  margin: 0 0 44px; line-height: 1.1; position: relative;
}
/* a hairline that draws left→right once the heading scrolls in */
.section-title::after {
  content: ""; position: absolute; left: 0; bottom: -16px; height: 1px; width: min(220px, 60%);
  background: linear-gradient(90deg, var(--accent), var(--accent-2) 55%, transparent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 900ms cubic-bezier(0.16,1,0.3,1) 180ms;
}
.reveal.is-in .section-title::after { transform: scaleX(1); }

/* ---- lamp header ---- */
.lamp {
  --lamp-w: min(480px, 78vw);
  --cone-w: min(260px, 38vw);
  position: relative; display: flex; flex-direction: column; align-items: center;
  text-align: center; margin-bottom: 24px;
}
.lamp-stage { position: relative; width: 100%; height: 150px; pointer-events: none; }
.lamp-stage > * { position: absolute; left: 50%; }
/* wide soft ambience above the line */
.lamp-halo {
  top: 26px; width: 300px; height: 130px; margin-left: -150px; border-radius: 999px;
  background: var(--accent); filter: blur(56px);
  opacity: 0; transition: opacity 1000ms ease 150ms;
}
.lamp.is-lit .lamp-halo { opacity: 0.32; }
/* the light cones fanning down from the line */
.lamp-cone {
  top: 92px; width: var(--cone-w); height: 170px;
  opacity: 0; transform: scaleY(0.55); transform-origin: center top;
  transition: opacity 900ms ease 120ms, transform 1100ms cubic-bezier(0.16,1,0.3,1) 120ms;
}
.lamp-cone-l {
  margin-left: calc(-1 * var(--cone-w));
  background: conic-gradient(from 180deg at 100% 0%, color-mix(in srgb, var(--accent) 55%, transparent) 0deg, transparent 62deg);
  -webkit-mask-image: radial-gradient(130% 130% at 100% 0%, #000 28%, transparent 76%);
  mask-image: radial-gradient(130% 130% at 100% 0%, #000 28%, transparent 76%);
}
.lamp-cone-r {
  background: conic-gradient(from 90deg at 0% 0%, transparent 28deg, color-mix(in srgb, var(--accent) 55%, transparent) 90deg);
  -webkit-mask-image: radial-gradient(130% 130% at 0% 0%, #000 28%, transparent 76%);
  mask-image: radial-gradient(130% 130% at 0% 0%, #000 28%, transparent 76%);
}
.lamp.is-lit .lamp-cone { opacity: 0.75; transform: scaleY(1); }
/* hot core just under the line */
.lamp-spark {
  top: 72px; width: 230px; height: 56px; margin-left: -115px; border-radius: 999px;
  background: var(--accent-2); filter: blur(26px);
  opacity: 0; transition: opacity 900ms ease 200ms;
}
.lamp.is-lit .lamp-spark { opacity: 0.45; }
/* the lamp tube itself — expands when lit */
.lamp-line {
  top: 90px; height: 2px; width: var(--lamp-w); margin-left: calc(var(--lamp-w) / -2);
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, var(--accent-2) 22%, var(--accent) 50%, var(--accent-2) 78%, transparent);
  box-shadow: 0 0 18px var(--accent-2), 0 0 44px color-mix(in srgb, var(--accent) 55%, transparent);
  opacity: 0.35; transform: scaleX(0.4);
  transition: opacity 900ms ease, transform 1100ms cubic-bezier(0.16,1,0.3,1);
}
.lamp.is-lit .lamp-line { opacity: 1; transform: scaleX(1); }
/* title rises into the light */
.lamp-copy {
  position: relative; z-index: 1; margin-top: -34px;
  opacity: 0; transform: translateY(26px);
  transition: opacity 800ms ease 260ms, transform 900ms cubic-bezier(0.16,1,0.3,1) 260ms;
}
.lamp.is-lit .lamp-copy { opacity: 1; transform: none; }
.lamp .section-title { margin-bottom: 0; }
.lamp .section-title::after { display: none; }
.theme-light .lamp-halo { filter: blur(64px); }
.theme-light .lamp.is-lit .lamp-halo { opacity: 0.2; }
.theme-light .lamp.is-lit .lamp-spark { opacity: 0.3; }
.reveal { opacity: 0; transform: translateY(42px) scale(0.975); transition: opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1); }
.reveal.is-in { opacity: 1; transform: none; }

/* ---- scroll-driven atmosphere ---- */
.scroll-rail { position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 70; pointer-events: none; }
.scroll-rail span {
  display: block; height: 100%; transform-origin: left; transform: scaleX(var(--sp, 0));
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 60%, transparent);
}

.about { padding: 32px 24px; }
@media (min-width: 640px) { .about { padding: 44px 44px; } }
.about p { margin: 0; font-size: clamp(1rem, 2.1vw, 1.2rem); line-height: 1.75; color: var(--fg); }

/* ---- about: dynamic bits ---- */
.about-panel { overflow: hidden; }

/* keyword ignition: load-bearing terms warm to accent, staggered, on reveal */
.about-copy .kw {
  color: var(--fg); font-weight: 400; white-space: nowrap;
  transition: color 620ms cubic-bezier(0.16,1,0.3,1), text-shadow 620ms cubic-bezier(0.16,1,0.3,1);
  transition-delay: 0ms;
}
.about.is-in .about-copy .kw {
  color: var(--accent);
  text-shadow: 0 0 20px color-mix(in srgb, var(--accent) 42%, transparent);
  transition-delay: var(--kd, 0ms);
}

/* the "currently:" rotator — beats the generic .about p size */
.about-now { margin: 22px 0 0; }
.about .about-now { font-size: 12px; letter-spacing: 0.02em; color: var(--fg); line-height: 1.5; }

/* cursor-follow spotlight (desktop, motion allowed) */
.about-spot {
  position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  opacity: 0; transition: opacity 420ms ease;
  background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%),
    color-mix(in srgb, var(--accent) 15%, transparent), transparent 62%);
}
.about-panel.has-spot:hover .about-spot { opacity: 1; }

/* ---- timeline ---- */
.timeline { display: grid; gap: 16px; }
.tl-item { padding: 26px 22px; }
.tl-head { display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; align-items: baseline; margin-bottom: 14px; }
.tl-item h3 { margin: 0; font-size: 1.08rem; font-weight: 600; letter-spacing: -0.01em; }
.tl-org { margin: 4px 0 0; color: var(--accent); font-size: 0.9rem; }
.tl-when { font-size: 11px; color: var(--muted); letter-spacing: 0.06em; }
.tl-points { margin: 0; padding-left: 18px; display: grid; gap: 8px; }
.tl-points li { color: var(--muted); line-height: 1.65; font-size: 0.94rem; }
.tl-points li::marker { color: var(--accent); }

/* ---- projects ---- */
.grid { display: grid; gap: 18px; }
@media (min-width: 860px) { .grid { grid-template-columns: 1fr 1fr; } }
.project { display: flex; flex-direction: column; overflow: hidden; }
.project:hover .project-art { transform: scale(1.04); }
.project-art {
  height: 240px; display: grid; place-items: center; overflow: hidden;
  border-bottom: 1px solid var(--line);
  background: radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 72%);
  transition: transform 700ms cubic-bezier(0.16,1,0.3,1);
}
/* size by height so the whole viewBox is always visible — never cropped */
.project-art .viz { width: auto; height: 90%; max-width: 94%; }
.project-body { padding: 22px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.project-head { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.project-head h3 { margin: 0; font-size: 1.12rem; font-weight: 600; letter-spacing: -0.015em; }
.badge {
  font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 4px 9px; border-radius: 999px; color: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}
.project-blurb { margin: 0; color: var(--muted); line-height: 1.65; font-size: 0.93rem; }
.metric { font-size: 11px; color: var(--accent-2); letter-spacing: 0.04em; margin: 0; }
.chips { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; padding: 0; margin: 0; }
.chip {
  font-size: 11px; padding: 5px 10px; border-radius: 999px;
  border: 1px solid var(--line); background: var(--glass); color: var(--muted);
  transition: transform 200ms, color 200ms, background 200ms, border-color 200ms, box-shadow 200ms;
}
.chip:hover {
  color: var(--fg); background: var(--glass-hi);
  border-color: color-mix(in srgb, var(--accent) 45%, transparent);
}
.chip-lift:hover {
  transform: translateY(-2px); color: var(--fg);
  border-color: color-mix(in srgb, var(--accent) 50%, transparent);
  box-shadow: 0 6px 18px -8px var(--accent);
}
.project-links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; padding-top: 6px; }

/* ---- skills ---- */
.skills { display: grid; gap: 16px; }
@media (min-width: 720px) { .skills { grid-template-columns: 1fr 1fr; } }
.skill-group { padding: 22px; }
.skill-group .chip { font-weight: 600; color: var(--fg); }
.skill-title { font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); font-weight: 500; margin: 0 0 14px; }

/* ---- certs ---- */
.certs { padding: 8px 22px; }
.cert {
  position: relative; overflow: hidden;
  display: flex; flex-wrap: wrap; align-items: center; gap: 4px 12px;
  padding: 18px 0; border-bottom: 1px solid var(--line);
  opacity: 0; transform: translateX(-18px);
  transition: opacity 600ms ease var(--cd, 0ms), transform 700ms cubic-bezier(0.16,1,0.3,1) var(--cd, 0ms);
}
.reveal.is-in .cert { opacity: 1; transform: none; }
.cert:last-child { border-bottom: 0; }
.cert-name { font-size: 0.98rem; transition: color 250ms ease; }
.cert:hover .cert-name { color: var(--accent); }
.cert-org { color: var(--muted); font-size: 0.85rem; flex: 1; }
.cert-year { color: var(--muted); font-size: 11px; }
/* verified seal: ring draws, then the check strokes in */
.cert-seal { width: 22px; height: 22px; flex: none; }
.seal-ring {
  fill: none; stroke: color-mix(in srgb, var(--accent) 65%, transparent); stroke-width: 2;
  stroke-dasharray: 82; stroke-dashoffset: 82; transform: rotate(-90deg); transform-origin: center;
}
.seal-check {
  fill: none; stroke: var(--accent-2); stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round;
  stroke-dasharray: 20; stroke-dashoffset: 20;
}
.reveal.is-in .seal-ring { animation: sealDraw 700ms ease forwards; animation-delay: calc(var(--cd, 0ms) + 200ms); }
.reveal.is-in .seal-check { animation: sealDraw 420ms ease forwards; animation-delay: calc(var(--cd, 0ms) + 780ms); }
@keyframes sealDraw { to { stroke-dashoffset: 0; } }
/* shine sweep on hover */
.cert::after {
  content: ""; position: absolute; top: 0; bottom: 0; left: -60%; width: 40%;
  background: linear-gradient(100deg, transparent, color-mix(in srgb, var(--accent) 16%, transparent), transparent);
  transform: skewX(-18deg); pointer-events: none; transition: left 650ms ease;
}
.cert:hover::after { left: 120%; }

/* ---- contact ---- */
.contact { display: grid; gap: 48px; align-items: start; }
@media (min-width: 900px) { .contact { grid-template-columns: 1fr 1fr; gap: 64px; } }
.contact-copy .section-title { margin-bottom: 16px; }
.stack { position: relative; height: 470px; width: 100%; max-width: 420px; margin: 0 auto; cursor: pointer; }
@media (max-width: 480px) { .stack { height: 440px; } }
.stack-card {
  position: absolute; left: 0; right: 0;
  display: flex; align-items: center; gap: 14px;
  height: 92px; padding: 16px 18px; border-radius: 20px;
  background: linear-gradient(155deg, rgba(255,255,255,0.05), rgba(14,14,20,0.30) 60%);
  border: 1px solid rgba(255,255,255,0.14);
  border-top-color: rgba(255,255,255,0.32);
  backdrop-filter: blur(6px) saturate(150%);
  -webkit-backdrop-filter: blur(6px) saturate(150%);
  box-shadow: var(--shadow);
  color: var(--fg); text-decoration: none;
  top: calc(var(--i) * 14px);
  transform: scale(calc(1 - var(--i) * 0.02));
  pointer-events: none;
  transition: top 1000ms cubic-bezier(0.075,0.82,0.165,1), transform 1000ms cubic-bezier(0.075,0.82,0.165,1), background 300ms;
}
.stack.is-open .stack-card {
  top: calc(var(--i) * 104px);
  transform: none;
  pointer-events: auto;
}
.stack.is-open .stack-card:hover { background: var(--glass-hi); }
.stack-icon {
  display: grid; place-items: center; width: 52px; height: 52px; flex: none;
  border-radius: 16px; background: var(--glass-hi); border: 1px solid var(--line); color: var(--accent);
}
.stack-text { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.stack-text strong { font-weight: 600; font-size: 0.98rem; }
.stack-text em { font-style: normal; color: var(--muted); font-size: 0.82rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.stack-arrow { color: var(--muted); margin-left: auto; flex: none; }
.stack-foot { position: absolute; top: 428px; left: 0; right: 0; display: flex; justify-content: center; }
@media (max-width: 480px) { .stack-foot { top: 400px; } }
.hint { font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); opacity: 0.6; }

/* ---- footer ---- */
.footer {
  position: relative; z-index: 1; border-top: 1px solid var(--line);
  max-width: 1120px; margin: 0 auto; padding: 30px 20px 44px;
  display: flex; flex-wrap: wrap; gap: 14px; justify-content: space-between;
  font-size: 11px; color: var(--muted); letter-spacing: 0.04em;
}
.footer-links { display: flex; gap: 16px; }
.footer-links a { color: var(--muted); text-decoration: none; }
.footer-links a:hover { color: var(--accent); }

/* ---- cursor ---- */
.cursor-dot {
  position: fixed; top: 0; left: 0; width: 9px; height: 9px; border-radius: 999px;
  background: var(--accent); z-index: 100; pointer-events: none;
}
.cursor-aura {
  position: fixed; top: 0; left: 0; width: 130px; height: 130px; border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  filter: blur(28px); z-index: 99; pointer-events: none;
}

/* ---- ML visuals ---- */
.viz { width: 100%; height: 100%; max-height: 100%; overflow: visible; }
.cloud-canvas { width: 100%; height: 100%; }
.net-edge { stroke: var(--accent); stroke-width: 0.6; opacity: 0.18; animation: edgePulse 3.2s ease-in-out infinite; }
.net-node { fill: var(--accent); animation: nodePulse 2.6s ease-in-out infinite; }
@keyframes edgePulse { 0%,100% { opacity: 0.1; } 50% { opacity: 0.5; stroke: var(--accent-2); } }
@keyframes nodePulse { 0%,100% { r: 3.2; opacity: 0.75; } 50% { r: 4.4; opacity: 1; } }

.vessel { stroke: var(--accent-warm); stroke-width: 1.3; fill: none; opacity: 0.35; }
.eye-ring { fill: none; stroke: var(--edge); stroke-width: 1; }
.optic-disc { fill: var(--accent-warm); opacity: 0.5; }
.lesion { fill: #fb7185; animation: ping 2.4s ease-out infinite; }
@keyframes ping { 0% { r: 2; opacity: 1; } 70% { r: 7; opacity: 0; } 100% { opacity: 0; } }
.sweep {
  fill: url(#none); fill: color-mix(in srgb, var(--accent-2) 22%, transparent);
  transform-origin: 100px 100px; animation: sweep 4.5s linear infinite;
  clip-path: polygon(100px 100px, 200px 60px, 200px 140px);
}
@keyframes sweep { to { transform: rotate(360deg); } }

.face-outline { fill: none; stroke: var(--accent-2); stroke-width: 1; opacity: 0.4; }
.lid { fill: none; stroke: var(--accent); stroke-width: 1.4; animation: blinkEye 4.2s ease-in-out infinite; }
@keyframes blinkEye { 0%,90%,100% { transform: scaleY(1); } 95% { transform: scaleY(0.12); } }
.mouth { fill: none; stroke: var(--accent); stroke-width: 1.4; opacity: 0.8; }
.landmark { fill: var(--fg); opacity: 0.8; animation: nodePulse 3s ease-in-out infinite; }
.mono-tick { font-family: 'JetBrains Mono', monospace; font-size: 9px; fill: var(--muted); }

.tokens { position: relative; width: 100%; height: 100%; overflow: hidden; }
.token {
  position: absolute; bottom: -14%; font-family: 'JetBrains Mono', monospace; font-size: 11px;
  color: var(--accent); opacity: 0; animation: rise 4.4s linear infinite; white-space: nowrap;
}
@keyframes rise {
  0% { transform: translateY(0); opacity: 0; }
  15% { opacity: 0.9; }
  85% { opacity: 0.9; }
  100% { transform: translateY(-260px); opacity: 0; }
}

.axis { stroke: var(--line); stroke-width: 1; }
.loss-line { fill: none; stroke: var(--accent); stroke-width: 2; stroke-dasharray: 260; stroke-dashoffset: 260; animation: draw 3.4s ease-out infinite; }
.loss-line--val { stroke: var(--accent-2); opacity: 0.55; animation-delay: 0.3s; }
.loss-dot { fill: var(--accent); animation: nodePulse 2s ease-in-out infinite; }
@keyframes draw { 0% { stroke-dashoffset: 260; } 55%,100% { stroke-dashoffset: 0; } }

/* ---- project card visuals v2 ---- */
.flow-dot { fill: var(--accent-2); opacity: 0; animation: flowX 2.3s linear infinite; }
@keyframes flowX {
  0% { transform: translateX(0); opacity: 0; }
  18% { opacity: 0.9; }
  82% { opacity: 0.9; }
  100% { transform: translateX(var(--fx, 70px)); opacity: 0; }
}

/* retinopathy */
.cnn-layer { fill: var(--accent); fill-opacity: 0.3; stroke: var(--accent); stroke-width: 1.2; animation: layerPulse 2.4s ease-in-out infinite; }
@keyframes layerPulse { 0%,100% { fill-opacity: 0.25; } 50% { fill-opacity: 0.7; } }
.grade-track { fill: none; stroke: var(--line); stroke-width: 1.4; }
.grade-fill { fill: var(--accent-2); transform-box: fill-box; transform-origin: center bottom; animation: gradeFill 3.4s ease-in-out infinite; }
@keyframes gradeFill { 0% { transform: scaleY(0.05); } 45%,85% { transform: scaleY(0.94); } 100% { transform: scaleY(0.05); } }

/* video → 3D */
.film-frame { fill: var(--glass); stroke: var(--edge); stroke-width: 1.2; }
.film-frame.f2 { opacity: 0.6; }
.film-frame.f3 { opacity: 0.3; }
.film-play { fill: var(--accent); opacity: 0.85; }
.film { animation: filmSlide 3.4s ease-in-out infinite; }
@keyframes filmSlide { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
.mesh-edge { stroke: var(--accent); stroke-width: 1.4; fill: none; stroke-dasharray: 70; stroke-dashoffset: 70; animation: meshDraw 3.4s ease-in-out infinite; }
@keyframes meshDraw {
  0% { stroke-dashoffset: 70; opacity: 0.15; }
  40%,72% { stroke-dashoffset: 0; opacity: 0.85; }
  100% { stroke-dashoffset: 70; opacity: 0.15; }
}

/* clinic */
.doc-line { stroke: var(--accent); stroke-width: 2; fill: none; stroke-linecap: round; opacity: 0.85; }
.steth { stroke: var(--accent-2); stroke-width: 1.8; fill: none; stroke-linecap: round; }
.steth-chest { fill: var(--accent-2); animation: nodePulse 2.2s ease-in-out infinite; }
.cross-card { fill: var(--accent); fill-opacity: 0.14; stroke: color-mix(in srgb, var(--accent) 45%, transparent); }
.cross-mark { stroke: var(--accent); stroke-width: 2.6; stroke-linecap: round; fill: none; }
.cross-pulse { transform-box: fill-box; transform-origin: center; animation: crossPulse 2.6s ease-in-out infinite; }
@keyframes crossPulse { 0%,100% { transform: scale(1); opacity: 0.85; } 50% { transform: scale(1.07); opacity: 1; } }
.ecg { fill: none; stroke: var(--accent-2); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 200; stroke-dashoffset: 200; animation: ecgDraw 2.8s linear infinite; }
@keyframes ecgDraw {
  0% { stroke-dashoffset: 200; opacity: 1; }
  68% { stroke-dashoffset: 0; opacity: 1; }
  84% { opacity: 0; }
  100% { stroke-dashoffset: 200; opacity: 0; }
}

/* cross-modal */
.xm-panel { fill: var(--glass); stroke: var(--line); stroke-width: 1.2; }
.xm-sun { fill: var(--accent-warm); opacity: 0.85; }
.xm-mtn { fill: none; stroke: var(--accent); stroke-width: 1.8; stroke-linejoin: round; }
.xm-line { fill: var(--accent-2); opacity: 0.85; transform-box: fill-box; transform-origin: left center; animation: xmType 4.8s ease-in-out infinite; }
@keyframes xmType { 0%,8% { transform: scaleX(0); } 26%,74% { transform: scaleX(1); } 90%,100% { transform: scaleX(0); } }
.xm-arc { fill: none; stroke: var(--line); stroke-width: 1; stroke-dasharray: 3 5; }
.xm-dot-go { fill: var(--accent); animation: xmGo 2.4s ease-in-out infinite; }
.xm-dot-back { fill: var(--accent-2); animation: xmBack 2.4s ease-in-out infinite; animation-delay: 1.2s; }
@keyframes xmGo {
  0% { transform: translate(0,0); opacity: 0; }
  12% { opacity: 1; }
  50% { transform: translate(22px,-13px); }
  88% { opacity: 1; }
  100% { transform: translate(44px,0); opacity: 0; }
}
@keyframes xmBack {
  0% { transform: translate(0,0); opacity: 0; }
  12% { opacity: 1; }
  50% { transform: translate(-22px,13px); }
  88% { opacity: 1; }
  100% { transform: translate(-44px,0); opacity: 0; }
}
.xm-glow-a { animation: xmGlow 4.8s ease-in-out infinite; }
.xm-glow-b { animation: xmGlow 4.8s ease-in-out infinite; animation-delay: 2.4s; }
@keyframes xmGlow { 0%,40%,100% { stroke: var(--line); } 10%,26% { stroke: var(--accent); } }

/* e-commerce cart */
.cart-g { animation: cartZoom 5s cubic-bezier(0.45,0,0.25,1) infinite; }
@keyframes cartZoom {
  0% { transform: translateX(-200px); }
  40% { transform: translateX(0); }
  62% { transform: translateX(4px); }
  100% { transform: translateX(250px); }
}
.cart-line { stroke: var(--accent); stroke-width: 2.2; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.cart-item { fill: var(--accent-2); opacity: 0.8; }
.cart-item2 { fill: var(--accent-warm); opacity: 0.7; }
.wheel-spin { transform-box: fill-box; transform-origin: center; animation: spin360 0.8s linear infinite; }
@keyframes spin360 { to { transform: rotate(360deg); } }
.speed-line { stroke: var(--accent-2); stroke-width: 1.5; stroke-linecap: round; opacity: 0; animation: speedFlash 5s linear infinite; }
@keyframes speedFlash { 0%,34% { opacity: 0; } 44%,58% { opacity: 0.6; } 70%,100% { opacity: 0; } }
.tag-card { fill: var(--accent); fill-opacity: 0.15; stroke: color-mix(in srgb, var(--accent) 45%, transparent); }
.tag-txt { font-family: 'JetBrains Mono', monospace; font-size: 12px; fill: var(--accent); }
.tag-bob { animation: bobTag 2.2s ease-in-out infinite; }
@keyframes bobTag { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

@media (prefers-reduced-motion: reduce) {
  .root *, .root *::before, .root *::after {
    animation: none !important;
    transition-duration: 1ms !important;
  }
  .reveal { opacity: 1; transform: none; }
  .shiny-cta { --gradient-percent: 20%; }
  .shiny-cta::before, .shiny-cta::after { display: none; }
  /* keep scroll-reactive layers still; the progress rail may still track */
  .blobs { transform: none !important; }
  .cert { opacity: 1; transform: none; }
  .seal-ring, .seal-check { stroke-dashoffset: 0 !important; }
  .section-title::after { transform: scaleX(1); }
}
`;