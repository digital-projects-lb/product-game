import React, { useState } from "react";
import { StageData } from "./Data";

const PRODUCT_GUIDES = [
  {
    id: "frameworks",
    tag: "Core Frameworks",
    title: "PMBOK, BABOK & Delivery Roles Guide",
    summary:
      "Plain-English takeaways from core delivery frameworks—when to use each and how they fit together.",
    sections: [
      {
        heading: "PMBOK (Project Management Body of Knowledge)",
        points: [
          "Focuses on HOW work gets delivered safely: scope, schedule, budget, dependencies, and risk control.",
          "Key Product habit: Lock baseline scope before sprints begin, log risks early, and keep senior sponsors updated on timeline health.",
        ],
      },
      {
        heading: "BABOK (Business Analysis Body of Knowledge)",
        points: [
          "Focuses on WHAT problem we are solving and WHY: requirements gathering, gap analysis, and acceptance rules.",
          "Key Product habit: Trace every user story back to a measurable business outcome so engineering never builds features without clear value.",
        ],
      },
      {
        heading: "Practical Squad Alignment Roles",
        points: [
          "Scrum Team: Product, UX, and Engineering building and shipping work day-to-day.",
          "Peer / Subject Matter Expert: Customer, Finance, or Operations giving specialist input.",
          "Sign-Off: SLT, Legal, or QA formally approving budget, risk, or launch readiness.",
        ],
      },
    ],
  },
  {
    id: "agile-dt",
    tag: "Process Map",
    title: "Design Thinking to Agile Delivery Map",
    summary:
      "How customer discovery flows into two-week Scrum sprints without losing sight of user value.",
    sections: [
      {
        heading: "Phase 1: Design Thinking (Discover the Right Thing)",
        points: [
          "1. Empathise & Define: Run customer interviews and support ticket reviews to frame a sharp Problem Statement.",
          "2. Ideate & Prototype: Sketch simple flows and clickable wireframes to test assumptions before writing code.",
        ],
      },
      {
        heading: "Phase 2: Agile Scrum (Build the Thing Right)",
        points: [
          "3. Backlog Refinement & Sprint Planning: Break tested prototypes into small user stories with clear acceptance rules.",
          "4. Daily Standups, Sprint Review & Retro: Ship working increments every two weeks, demo to stakeholders, and improve team workflow.",
        ],
      },
    ],
  },
  {
    id: "npv",
    tag: "Commercial Strategy",
    title: "Business Case & NPV Basics",
    summary:
      "How to justify investment to SLT using Net Present Value (NPV), payback period, and CLV:CAC.",
    sections: [
      {
        heading: "Net Present Value (NPV) in Plain English",
        points: [
          "A dollar earned today is worth more than a dollar earned in three years because of inflation and opportunity cost.",
          "NPV discounts future cash inflows back to today's value minus upfront build costs. Positive NPV (> $0) means the project creates net financial value.",
        ],
      },
      {
        heading: "What SLT Looks For in a Business Case",
        points: [
          "Payback Period & CLV:CAC Ratio: Show how many months until build cost is recovered and target a CLV:CAC ratio of 3:1 or higher.",
          "Retention & ARR Lift: Quantify expected gains in Customer Retention Rate (CRR) and Annual Recurring Revenue (ARR).",
        ],
      },
    ],
  },
  {
    id: "ai-chatbots",
    tag: "Applied AI Product",
    title: "Building AI Chatbots: Product Playbook",
    summary:
      "Practical steps for scoping, grounding, and safely launching conversational AI assistants.",
    sections: [
      {
        heading: "1. Use-Case Scoping & Intent Mapping",
        points: [
          "Start with high-volume, repetitive customer queries where fast answers cut support tickets and improve Time to Value (TTV).",
          "Define clear boundaries: what the assistant handles automatically versus when it hands off cleanly to a support agent.",
        ],
      },
      {
        heading: "2. Knowledge Grounding & Guardrails",
        points: [
          "Ground responses in verified company help docs rather than open model memory to prevent inaccurate answers.",
          "Set system prompt guardrails for tone, data privacy, and fallback responses when confidence is low.",
        ],
      },
      {
        heading: "3. Testing & Ongoing Tuning",
        points: [
          "Test against a benchmark set of real customer questions (including edge cases) before launch.",
          "Track containment rate, CSAT feedback, and fallback triggers post-launch to refine prompts and help articles.",
        ],
      },
    ],
  },
];

export default function Resources({ onClose }) {
  const [activeTab, setActiveTab] = useState("guides");
  const [selectedGuideId, setSelectedGuideId] = useState("frameworks");
  const [selectedStageNum, setSelectedStageNum] = useState(1);

  const stageList = Object.entries(StageData.stages).map(([num, data]) => ({
    num: Number(num),
    ...data,
  }));

  const currentGuide =
    PRODUCT_GUIDES.find((g) => g.id === selectedGuideId) || PRODUCT_GUIDES[0];
  const currentStage =
    stageList.find((s) => s.num === selectedStageNum) || stageList[0];
  const printDocument = (title, badge, metaItems, bodyHtml) => {
    const win = window.open("", "_blank", "width=820,height=920");
    if (!win) return;
    const metaHtml = metaItems
      .map((item) => `<span class="meta-item">${item}</span>`)
      .join("");
    win.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${title} — Product Path</title>
          <link href="https://googleapis.com" rel="stylesheet" />
          <style>
            body { font-family: 'Raleway', sans-serif; font-weight: 300; colour: #3e2f26; padding: 36px; line-height: 1.65; }
            .header { background: #faf8f4; padding: 20px 24px; border: 1px solid #dcd6ca; border-top: 3px solid #dfc3a6; border-radius: 10px; margin-bottom: 22px; }
            .badge { colour: #8f7356; font-size: 11px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.09em; }
            h1 { font-size: 21px; font-weight: 400; margin: 6px 0 4px 0; colour: #3e2f26; }
            .meta-row { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 10px; }
            .meta-item { font-size: 12px; font-weight: 400; padding: 3px 2px; colour: #3e2f26; border-bottom: 1.5px solid rgba(199, 169, 138, 0.55); }
            h3 { font-size: 14px; font-weight: 400; colour: #3e2f26; margin: 20px 0 8px 0; }
            ul { padding-left: 18px; font-size: 13px; }
            li { margin-bottom: 8px; }
            .goal-box { background: #faf8f4; border: 1px solid #e8e3d9; border-left: 3px solid #cbb994; border-radius: 6px; padding: 12px 16px; font-size: 13px; margin-bottom: 16px; }
            pre { font-family: 'Raleway', sans-serif; font-weight: 300; white-space: pre-wrap; font-size: 13px; background: #faf8f4; border: 1px solid #dcd6ca; padding: 18px 20px; border-radius: 8px; }
            .footer { margin-top: 24px; padding: 8px 12px; background: #faf8f4; border: 1px solid #e8e3d9; border-left: 3px solid #97b09f; border-radius: 6px; font-size: 11px; colour: #756558; display: flex; justify-content: space-between; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="badge">${badge}</div>
            <h1>${title}</h1>
            <div class="meta-row">${metaHtml}</div>
          </div>
          ${bodyHtml}
          <div class="footer">
            <span>Product Path • Product Resource Library</span>
            <span>© 2026</span>
          </div>
          <script>window.onload = () => { setTimeout(() => window.print(), 300); };</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  const handlePrintGuide = () => {
    const html = currentGuide.sections
      .map(
        (sec) =>
          `<h3>${sec.heading}</h3><ul>${sec.points
            .map((pt) => `<li>${pt}</li>`)
            .join("")}</ul>`,
      )
      .join("");
    printDocument(
      currentGuide.title,
      `Product Reference Guide • ${currentGuide.tag}`,
      [currentGuide.summary],
      html,
    );
  };

  const handlePrintStageDoc = () => {
    const docTitle = currentStage.documents.join(" & ");
    const html = `<div class="goal-box">Stage OKR: ${currentStage.okr}</div><pre>${currentStage.template}</pre>`;
    printDocument(
      docTitle,
      `Stage Document • ${currentStage.label}`,
      [
        `Timeline: ${currentStage.timeline}`,
        `Window: ${currentStage.window}`,
        `Move: ${currentStage.move}`,
      ],
      html,
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-panel">
        <div className="modal-header">
          <div>
            <span className="modal-kicker">Product Path • Reference Hub</span>
            <h2 className="modal-title">Product Resources &amp; Templates</h2>
          </div>
          <button className="nav-link-clean" onClick={onClose}>
            ✕ Close
          </button>
        </div>

        <div className="modal-tabs">
          <button
            className={`light-tab oat ${activeTab === "guides" ? "active" : ""}`}
            onClick={() => setActiveTab("guides")}
          >
            Product Guides &amp; Playbooks ({PRODUCT_GUIDES.length})
          </button>
          <button
            className={`light-tab baltic ${activeTab === "templates" ? "active" : ""}`}
            onClick={() => setActiveTab("templates")}
          >
            All 10 Stage Documents
          </button>
        </div>

        <div className="resources-split">
          <div className="resources-sidebar">
            {activeTab === "guides"
              ? PRODUCT_GUIDES.map((guide) => (
                  <button
                    key={guide.id}
                    className={`sidebar-item-btn ${
                      selectedGuideId === guide.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedGuideId(guide.id)}
                  >
                    <div className="sidebar-item-tag">{guide.tag}</div>
                    <div className="sidebar-item-title">{guide.title}</div>
                  </button>
                ))
              : stageList.map((st) => (
                  <button
                    key={st.num}
                    className={`sidebar-item-btn ${
                      selectedStageNum === st.num ? "active" : ""
                    }`}
                    onClick={() => setSelectedStageNum(st.num)}
                  >
                    <div className="sidebar-item-tag">{st.label}</div>
                    <div className="sidebar-item-title">
                      {st.documents.join(" • ")}
                    </div>
                  </button>
                ))}
          </div>

          <div className="resources-content">
            {activeTab === "guides" ? (
              <>
                <div className="ref-header-row">
                  <div>
                    <span className="modal-kicker">{currentGuide.tag}</span>
                    <h3 className="detail-heading">{currentGuide.title}</h3>
                  </div>
                  <button className="nav-link-clean" onClick={handlePrintGuide}>
                    ⬇ Save PDF
                  </button>
                </div>

                <p className="ref-intro">{currentGuide.summary}</p>

                {currentGuide.sections.map((sec, idx) => (
                  <div key={idx} className="guide-section-card">
                    <h4>{sec.heading}</h4>
                    <ul>
                      {sec.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="ref-header-row">
                  <div>
                    <span className="modal-kicker">
                      {currentStage.label} • {currentStage.timeline}
                    </span>
                    <h3 className="detail-heading">
                      {currentStage.documents.join(" & ")}
                    </h3>
                  </div>
                  <button
                    className="nav-link-clean"
                    onClick={handlePrintStageDoc}
                  >
                    ⬇ Save PDF
                  </button>
                </div>

                <div className="pdf-meta-row" style={{ marginBottom: "16px" }}>
                  <span className="pdf-meta-item">
                    Timeline: {currentStage.timeline}
                  </span>
                  <span className="pdf-meta-item">
                    Window: {currentStage.window}
                  </span>
                  <span className="pdf-meta-item">
                    Move: {currentStage.move}
                  </span>
                </div>

                <p className="stage-goal-line">Stage OKR: {currentStage.okr}</p>

                <pre className="template-preview-box">
                  {currentStage.template}
                </pre>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
