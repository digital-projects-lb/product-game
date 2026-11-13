import React, { useState } from "react";
import { MetricsMatrix } from "./metrics";

const RESOURCES = [
  {
    id: "frameworks",
    tag: "Core Frameworks",
    title: "PMBOK, BABOK & RACI Reference Guide",
    summary:
      "Plain-English takeaways from the three core delivery frameworks—when to use each and how they fit together.",
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
          "Focuses on WHAT problem we are solving and WHY: requirements elicitation, gap analysis, and acceptance criteria.",
          "Key Product habit: Trace every user story back to a measurable business outcome so engineering never builds features without clear value.",
        ],
      },
      {
        heading: "RACI Decision Matrix",
        points: [
          "Responsible (R): The team executing the work. Accountable (A): The single decision-maker who signs off (never more than one A).",
          "Consulted (C): Subject-matter experts giving two-way input before sign-off. Informed (I): Stakeholders kept updated on progress.",
        ],
      },
    ],
  },
  {
    id: "agile-dt",
    tag: "Process Map",
    title: "Design Thinking to Agile Delivery Map",
    summary:
      "How customer discovery flows seamlessly into iterative Scrum sprints without losing sight of user value.",
    sections: [
      {
        heading: "Phase 1: Design Thinking (Discover the Right Thing)",
        points: [
          "1. Empathise & Define: Run customer interviews and analytics reviews to frame a sharp Problem Statement.",
          "2. Ideate & Prototype: Sketch low-cost flows and clickable wireframes to test assumptions before writing production code.",
        ],
      },
      {
        heading: "Phase 2: Agile Scrum (Build the Thing Right)",
        points: [
          "3. Backlog Refinement & Sprint Planning: Break validated prototypes into small, vertical user stories with clear acceptance criteria.",
          "4. Daily Standups, Sprint Review & Retro: Ship working increments every 1–2 weeks, demo to stakeholders, and improve team workflow.",
        ],
      },
    ],
  },
  {
    id: "npv",
    tag: "Commercial Strategy",
    title: "Business Case & NPV Basics",
    summary:
      "How to justify investment to Senior Leadership using Net Present Value (NPV), payback period, and commercial sizing.",
    sections: [
      {
        heading: "Net Present Value (NPV) in Plain English",
        points: [
          "A dollar earned today is worth more than a dollar earned in three years because of inflation and opportunity cost.",
          "NPV discounts future cash inflows back to today's value minus upfront build costs. Positive NPV (> $0) means the initiative creates net financial value.",
        ],
      },
      {
        heading: "What Sponsors Look For in a Business Case",
        points: [
          "Revenue Uplift or Cost Reduction: Quantify conversion gains, retention lift, or manual hours saved per month.",
          "Payback Period & Opportunity Cost: Show how many months until the build cost is recovered—and what happens if we do nothing.",
        ],
      },
    ],
  },
  {
    id: "ai-chatbots",
    tag: "Applied AI Product",
    title: "Building AI Chatbots: Product Playbook",
    summary:
      "Practical end-to-end steps for scoping, grounding, and safely launching conversational AI assistants.",
    sections: [
      {
        heading: "1. Use-Case Scoping & Intent Mapping",
        points: [
          "Start with high-volume, repetitive customer or internal queries where fast answers cut support load or boost conversion.",
          "Define clear boundaries: what the assistant handles automatically vs. when it hands off cleanly to a human agent.",
        ],
      },
      {
        heading: "2. Knowledge Grounding & Guardrails",
        points: [
          "Ground responses in verified company docs (RAG) rather than relying on open model memory to prevent hallucinations.",
          "Set system prompt guardrails for tone, data privacy, and fallback responses when confidence is low.",
        ],
      },
      {
        heading: "3. Evaluation & Continuous Tuning",
        points: [
          "Test against a golden dataset of real user questions (including edge cases) before launch.",
          "Track containment rate, thumbs-up/down feedback, and fallback triggers post-launch to refine prompts and knowledge articles.",
        ],
      },
    ],
  },
];
export default function Resources({ onClose }) {
  const [activeTab, setActiveTab] = useState("guides");
  const [selectedId, setSelectedId] = useState("frameworks");
  const [selectedStage, setSelectedStage] = useState(1);

  const phases = Object.entries(MetricsMatrix.phases).map(([num, data]) => ({
    num: Number(num),
    ...data,
  }));

  const currentGuide =
    RESOURCES.find((r) => r.id === selectedId) || RESOURCES[0];
  const currentPhase = phases.find((p) => p.num === selectedStage) || phases[0];

  const printResource = (title, badge, subtitle, bodyHtml) => {
    const win = window.open("", "_blank", "width=820,height=920");
    if (!win) return;
    win.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${title} — Product Path</title>
          <link href="https://googleapis.com" rel="stylesheet" />
          <style>
            body { font-family: 'Raleway', sans-serif; color: #3e2f26; padding: 36px; line-height: 1.65; }
            .header { background: #faf8f5; padding: 22px 26px; border: 1px solid #ece5dd; border-left: 5px solid #cbb26a; border-radius: 6px; margin-bottom: 20px; }
            .badge { color: #7c6527; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
            h1 { font-size: 22px; font-weight: 500; margin: 6px 0 4px 0; color: #2c211b; }
            .sub { font-size: 12px; color: #8c7a6b; }
            h3 { font-size: 14px; font-weight: 600; color: #3e2f26; margin: 18px 0 8px 0; }
            ul { padding-left: 20px; font-size: 13px; }
            li { margin-bottom: 8px; }
            pre { font-family: 'Raleway', sans-serif; white-space: pre-wrap; font-size: 13px; background: #faf8f5; border: 1px solid #ece5dd; padding: 16px 20px; border-radius: 6px; }
            .footer { margin-top: 24px; font-size: 11px; color: #8c7a6b; text-align: right; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="badge">${badge}</div>
            <h1>${title}</h1>
            <div class="sub">${subtitle}</div>
          </div>
          ${bodyHtml}
          <div class="footer">Product Path • Product Resource Library</div>
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
          `<h3>${sec.heading}</h3><ul>${sec.points.map((pt) => `<li>${pt}</li>`).join("")}</ul>`,
      )
      .join("");
    printResource(
      currentGuide.title,
      `Product Reference Guide • ${currentGuide.tag}`,
      currentGuide.summary,
      html,
    );
  };

  const handlePrintTemplate = () => {
    const html = `<p style="font-size:13px;"><strong>Stage Goal:</strong> ${currentPhase.desc}</p><pre>${currentPhase.docText}</pre>`;
    printResource(
      currentPhase.asset,
      `Stage Template • ${currentPhase.name}`,
      `Timeline: ${currentPhase.duration} • Deliverable: ${currentPhase.correctBlock}`,
      html,
    );
  };

  return (
    <div
      className="tour-overlay"
      style={{
        alignItems: "flex-start",
        overflowY: "auto",
        padding: "32px 16px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #ece5dd",
          borderRadius: "14px",
          width: "100%",
          maxWidth: "880px",
          boxShadow: "0 16px 40px rgba(62, 47, 38, 0.16)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#faf8f5",
            borderBottom: "2px solid #cbb26a",
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#7c6527",
              }}
            >
              Product Path • Reference Hub
            </span>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 500,
                color: "#3e2f26",
                margin: "2px 0 0 0",
              }}
            >
              Product Resources &amp; Templates
            </h2>
          </div>

          <button
            className="btn"
            onClick={onClose}
            style={{
              background: "#ffffff",
              border: "1px solid #d5c7b8",
              color: "#3e2f26",
              padding: "7px 16px",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            ✕ Close
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "14px 24px",
            background: "#f3ece4",
            borderBottom: "1px solid #e2d5c7",
          }}
        >
          <button
            className="btn"
            onClick={() => setActiveTab("guides")}
            style={{
              background: activeTab === "guides" ? "#f9f5e3" : "#ffffff",
              border:
                activeTab === "guides"
                  ? "1.5px solid #cbb26a"
                  : "1px solid #d5c7b8",
              color: "#3e2f26",
              padding: "7px 16px",
              fontSize: "12.5px",
              fontWeight: 600,
            }}
          >
            Product Guides &amp; Playbooks ({RESOURCES.length})
          </button>
          <button
            className="btn"
            onClick={() => setActiveTab("templates")}
            style={{
              background: activeTab === "templates" ? "#f9f5e3" : "#ffffff",
              border:
                activeTab === "templates"
                  ? "1.5px solid #cbb26a"
                  : "1px solid #d5c7b8",
              color: "#3e2f26",
              padding: "7px 16px",
              fontSize: "12.5px",
              fontWeight: 600,
            }}
          >
            All 10 Stage Templates
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "250px 1fr",
            minHeight: "420px",
          }}
        >
          <div
            style={{
              background: "#faf8f5",
              borderRight: "1px solid #ece5dd",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {activeTab === "guides"
              ? RESOURCES.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    style={{
                      textAlign: "left",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border:
                        selectedId === item.id
                          ? "1.5px solid #cbb26a"
                          : "1px solid #ece5dd",
                      background:
                        selectedId === item.id ? "#f9f5e3" : "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "#7c6527",
                      }}
                    >
                      {item.tag}
                    </div>
                    <div
                      style={{
                        fontSize: "12.5px",
                        fontWeight: 600,
                        color: "#3e2f26",
                        marginTop: "2px",
                      }}
                    >
                      {item.title}
                    </div>
                  </button>
                ))
              : phases.map((p) => (
                  <button
                    key={p.num}
                    onClick={() => setSelectedStage(p.num)}
                    style={{
                      textAlign: "left",
                      padding: "9px 12px",
                      borderRadius: "8px",
                      border:
                        selectedStage === p.num
                          ? "1.5px solid #cbb26a"
                          : "1px solid #ece5dd",
                      background:
                        selectedStage === p.num ? "#f9f5e3" : "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "#7c6527",
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#3e2f26",
                        marginTop: "2px",
                      }}
                    >
                      {p.asset}
                    </div>
                  </button>
                ))}
          </div>

          <div style={{ padding: "24px 28px" }}>
            {activeTab === "guides" ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "12px",
                    marginBottom: "14px",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "#7c6527",
                      }}
                    >
                      {currentGuide.tag}
                    </span>
                    <h3
                      style={{
                        fontSize: "19px",
                        fontWeight: 500,
                        color: "#3e2f26",
                        marginTop: "2px",
                      }}
                    >
                      {currentGuide.title}
                    </h3>
                  </div>
                  <button
                    className="btn"
                    onClick={handlePrintGuide}
                    style={{
                      background: "#f9f5e3",
                      border: "1px solid #cbb26a",
                      color: "#3e2f26",
                      padding: "7px 14px",
                      fontSize: "12px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ⬇ Save PDF
                  </button>
                </div>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#8c7a6b",
                    marginBottom: "18px",
                  }}
                >
                  {currentGuide.summary}
                </p>

                {currentGuide.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "#faf8f5",
                      border: "1px solid #ece5dd",
                      borderLeft: "4px solid #cbb26a",
                      borderRadius: "6px",
                      padding: "14px 16px",
                      marginBottom: "14px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "13.5px",
                        fontWeight: 600,
                        color: "#3e2f26",
                        marginBottom: "8px",
                      }}
                    >
                      {sec.heading}
                    </h4>
                    <ul
                      style={{
                        paddingLeft: "18px",
                        fontSize: "12.5px",
                        color: "#3e2f26",
                        lineHeight: "1.6",
                      }}
                    >
                      {sec.points.map((pt, pIdx) => (
                        <li key={pIdx} style={{ marginBottom: "6px" }}>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "12px",
                    marginBottom: "14px",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "#7c6527",
                      }}
                    >
                      {currentPhase.name} • {currentPhase.duration}
                    </span>
                    <h3
                      style={{
                        fontSize: "19px",
                        fontWeight: 500,
                        color: "#3e2f26",
                        marginTop: "2px",
                      }}
                    >
                      {currentPhase.asset}
                    </h3>
                  </div>
                  <button
                    className="btn"
                    onClick={handlePrintTemplate}
                    style={{
                      background: "#f9f5e3",
                      border: "1px solid #cbb26a",
                      color: "#3e2f26",
                      padding: "7px 14px",
                      fontSize: "12px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ⬇ Save PDF
                  </button>
                </div>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#3e2f26",
                    marginBottom: "14px",
                  }}
                >
                  <strong>Stage Goal:</strong> {currentPhase.desc}
                </p>

                <pre
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "12.5px",
                    lineHeight: "1.65",
                    whiteSpace: "pre-wrap",
                    background: "#faf8f5",
                    border: "1px solid #ece5dd",
                    borderRadius: "6px",
                    padding: "16px",
                    color: "#3e2f26",
                  }}
                >
                  {currentPhase.docText}
                </pre>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
