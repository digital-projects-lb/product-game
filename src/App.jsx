import React, { useState, useEffect } from "react";
import { MetricsMatrix } from "./metrics.js";
import Resources from "./Resources";

export default function App() {
  const [viewPage, setViewPage] = useState("overview");
  const [activeStage, setActiveStage] = useState(1);
  const [maxUnlockedStage, setMaxUnlockedStage] = useState(1);
  const [droppedBlock, setDroppedBlock] = useState(null);
  const [stakeholders, setStakeholders] = useState({
    product: "None",
    slt: "None",
    sponsor: "None",
    ux: "None",
    dev: "None",
    legal: "None",
    risk: "None",
  });
  const [tickerAlert, setTickerAlert] = useState("");

  const [tourStep, setTourStep] = useState(() => {
    return localStorage.getItem("lifecycle_tour_seen") ? null : 0;
  });

  const [showResources, setShowResources] = useState(false);

  const tourSlides = [
    {
      badge: "Welcome • Product Path",
      title: "Guide a Product from Concept to Launch",
      text: "This interactive simulation walks through 10 real-world product delivery stages. To unlock each stage along the road, assign the right team roles and match the required deliverable.",
    },
    {
      badge: "Step 1 of 3 • Overview & RACI Tab",
      title: "Assign Team Roles (RACI)",
      text: "Read the stage overview and sticky-note clue on the left. Then use the dropdowns on the right to set Responsible (R), Accountable (A), Consulted (C), or Informed (I) roles.",
    },
    {
      badge: "Step 2 of 3 • Deliverables Tab",
      title: "Match the Stage Deliverable",
      text: "Switch to the Deliverables tab. Drag the matching deliverable pill from the list on the left and drop it into the box on the right.",
    },
    {
      badge: "Step 3 of 3 • Documents Tab",
      title: "Review Document & Advance",
      text: "Once your team roles and deliverable are both complete, open the Documents tab to view your template, save it as a PDF, and click 'Commit & Move' to advance.",
    },
  ];

  const closeTour = () => {
    localStorage.setItem("lifecycle_tour_seen", "true");
    setTourStep(null);
  };

  useEffect(() => {
    const cache = localStorage.getItem("lifecycle_react_highway_state");
    if (cache) {
      try {
        const parsed = JSON.parse(cache);
        if (parsed.viewPage) setViewPage(parsed.viewPage);
        if (parsed.activeStage) setActiveStage(parsed.activeStage);
        if (parsed.maxUnlockedStage)
          setMaxUnlockedStage(parsed.maxUnlockedStage);
        if (parsed.droppedBlock) setDroppedBlock(parsed.droppedBlock);
        if (parsed.stakeholders) setStakeholders(parsed.stakeholders);
      } catch (e) {
        console.error("Cache processing exception ignored:", e);
      }
    }
  }, []);

  const saveState = (updated) => {
    localStorage.setItem(
      "lifecycle_react_highway_state",
      JSON.stringify({
        viewPage,
        activeStage,
        maxUnlockedStage,
        droppedBlock,
        stakeholders,
        ...updated,
      }),
    );
  };

  const handleNodeClick = (sNum) => {
    if (sNum <= maxUnlockedStage) {
      setActiveStage(sNum);
      setDroppedBlock(null);
      setStakeholders({
        product: "None",
        slt: "None",
        sponsor: "None",
        ux: "None",
        dev: "None",
        legal: "None",
        risk: "None",
      });
      saveState({
        activeStage: sNum,
        droppedBlock: null,
        stakeholders: {
          product: "None",
          slt: "None",
          sponsor: "None",
          ux: "None",
          dev: "None",
          legal: "None",
          risk: "None",
        },
      });
    } else {
      setTickerAlert(
        `Stage ${sNum} is locked. Complete Stage ${maxUnlockedStage} first.`,
      );

      setTimeout(() => setTickerAlert(""), 4000);
    }
  };

  const resetStage = () => {
    setDroppedBlock(null);
    const freshSH = {
      product: "None",
      slt: "None",
      sponsor: "None",
      ux: "None",
      dev: "None",
      legal: "None",
      risk: "None",
    };
    setStakeholders(freshSH);
    saveState({ droppedBlock: null, stakeholders: freshSH });
  };

  const commitAndAdvance = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      let nextMax = maxUnlockedStage;
      let nextActive = activeStage;
      if (activeStage === maxUnlockedStage && activeStage < 10) {
        nextMax = maxUnlockedStage + 1;
        nextActive = activeStage + 1;
      } else if (activeStage < 10) {
        nextActive = activeStage + 1;
      }
      setMaxUnlockedStage(nextMax);
      setActiveStage(nextActive);
      setDroppedBlock(null);
      const freshSH = {
        product: "None",
        slt: "None",
        sponsor: "None",
        ux: "None",
        dev: "None",
        legal: "None",
        risk: "None",
      };
      setStakeholders(freshSH);
      setViewPage("overview");
      localStorage.setItem(
        "lifecycle_react_highway_state",
        JSON.stringify({
          viewPage: "overview",
          activeStage: nextActive,
          maxUnlockedStage: nextMax,
          droppedBlock: null,
          stakeholders: freshSH,
        }),
      );
    }, 450);
  };

  const globalReset = (e) => {
    e.preventDefault();
    localStorage.removeItem("lifecycle_react_highway_state");
    window.location.reload();
  };

  const currentData = MetricsMatrix.phases[activeStage];
  let raciIsValid = true;
  Object.keys(currentData.raci).forEach((sh) => {
    if ((stakeholders[sh] || "None") !== currentData.raci[sh])
      raciIsValid = false;
  });
  let blockIsValid = droppedBlock === currentData.correctBlock;
  let phaseIsCleared = raciIsValid && blockIsValid;

  const coordinates = [
    { s: 1, len: 0 },
    { s: 2, len: 110 },
    { s: 3, len: 220 },
    { s: 4, len: 335 },
    { s: 5, len: 470 },
    { s: 6, len: 590 },
    { s: 7, len: 710 },
    { s: 8, len: 820 },
    { s: 9, len: 910 },
    { s: 10, len: 1000 },
  ];
  const activeLength = coordinates.find((c) => c.s === activeStage).len;

  const downloadDoc = () => {
    const printWin = window.open("", "_blank", "width=820,height=920");
    if (!printWin) return;

    const cleanTitle = currentData.asset;

    const roleLabels = {
      product: "Product",
      slt: "Senior Leadership (SLT)",
      sponsor: "Sponsor",
      ux: "Product Design (UX/CX)",
      dev: "Engineering (Dev)",
      legal: "Legal",
      risk: "Risk & Compliance",
    };

    const raciRows = Object.entries(currentData.raci)
      .filter(([, role]) => role !== "None")
      .map(
        ([key, role]) =>
          `<tr>
            <td>${roleLabels[key] || key}</td>
            <td><span class="raci-pill">${role}</span></td>
          </tr>`,
      )
      .join("");

    printWin.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${cleanTitle} — Product Path</title>
          <link rel="preconnect" href="https://googleapis.com" />
          <link rel="preconnect" href="https://gstatic.com" crossorigin />
          <link href="https://googleapis.com/css2?family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet" />
          <style>
            body {
              font-family: 'Raleway', -apple-system, BlinkMacSystemFont, sans-serif;
              font-weight: 300;
              color: #3e2f26;
              margin: 0;
              padding: 36px;
              background: #ffffff;
              line-height: 1.65;
            }
            .doc-header {
              background: #faf8f5;
              color: #3e2f26;
              padding: 24px 28px;
              border: 1px solid #ece5dd;
              border-left: 5px solid #cbb26a;
              border-radius: 6px;
              margin-bottom: 20px;
            }
            .doc-badge {
              color: #7c6527;
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.08em;
            }
            .doc-title {
              font-size: 22px;
              margin: 6px 0 4px 0;
              font-weight: 500;
              color: #2c211b;
            }
            .doc-meta {
              font-size: 12px;
              color: #8c7a6b;
            }
            .section-label {
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.06em;
              color: #8c7a6b;
              margin: 20px 0 8px 0;
            }
            .doc-summary {
              background: #ffffff;
              border: 1px solid #ece5dd;
              border-left: 4px solid #3e2f26;
              padding: 12px 16px;
              font-size: 13px;
              margin-bottom: 18px;
              border-radius: 4px;
            }
            .doc-content {
              font-family: 'Raleway', sans-serif;
              white-space: pre-wrap;
              font-size: 13px;
              line-height: 1.7;
              color: #3e2f26;
              background: #faf8f5;
              border: 1px solid #ece5dd;
              border-radius: 6px;
              padding: 16px 20px;
              margin: 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 13px;
              margin-top: 8px;
            }
            th {
              text-align: left;
              background: #faf8f5;
              color: #3e2f26;
              font-weight: 600;
              padding: 8px 12px;
              border: 1px solid #ece5dd;
            }
            td {
              padding: 8px 12px;
              border: 1px solid #ece5dd;
            }
            .raci-pill {
              display: inline-block;
              background: #f9f5e3;
              border: 1px solid #cbb26a;
              color: #7c6527;
              font-weight: 600;
              font-size: 11px;
              padding: 2px 10px;
              border-radius: 12px;
            }
            .doc-footer {
              margin-top: 24px;
              font-size: 11px;
              color: #8c7a6b;
              text-align: right;
            }
          </style>
        </head>
        <body>
          <div class="doc-header">
            <div class="doc-badge">Stage Document • ${currentData.name}</div>
            <div class="doc-title">${cleanTitle}</div>
            <div class="doc-meta">Timeline: ${currentData.duration} • Deliverable: ${currentData.correctBlock}</div>
          </div>
          <div class="doc-summary"><strong>Stage Goal:</strong> ${currentData.desc}</div>
          <div class="section-label">Deliverable Notes</div>
          <pre class="doc-content">${currentData.docText}</pre>
          <div class="section-label">RACI Role Sign-Off</div>
          <table>
            <thead>
              <tr>
                <th>Team / Stakeholder</th>
                <th>Assigned Role</th>
              </tr>
            </thead>
            <tbody>
              ${raciRows}
            </tbody>
          </table>
          <div class="doc-footer">Product Path • © 2026 product-lb</div>
          <script>window.onload = () => { setTimeout(() => window.print(), 300); };</script>
        </body>
      </html>
    `);
    printWin.document.close();
  };

  return (
    <>
      <header
        className="dashboard-header"
        style={{ width: "100%", maxWidth: "950px" }}
      >
        <div className="header-top-row">
          <div className="pill-badge">Product Path</div>
          {tickerAlert && (
            <div className="ticker-wrap">
              <div
                className="ticker-content"
                style={{
                  color: "#855434",
                  fontStyle: "normal",
                  fontWeight: 500,
                }}
              >
                {tickerAlert}
              </div>
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginLeft: "auto",
            }}
          >
            <button
              className="tour-trigger-btn"
              onClick={() => setShowResources(true)}
            >
              Product Resources
            </button>
            <button className="tour-trigger-btn" onClick={resetStage}>
              Game Reset
            </button>
            <button className="tour-trigger-btn" onClick={() => setTourStep(0)}>
              How to Play
            </button>
          </div>
        </div>

        <div className="svg-container">
          <svg viewBox="0 0 1000 240" preserveAspectRatio="xMidYMid meet">
            <line
              x1="30"
              y1="120"
              className="baseline-guide"
              x2="970"
              y2="120"
            />
            <path
              d="M 40,210 C 130,220 180,140 250,130 C 340,115 390,195 490,180 C 580,160 620,60 720,70 C 810,80 870,165 960,150"
              className="highway-backdrop"
            />
            <path
              d="M 40,210 C 130,220 180,140 250,130 C 340,115 390,195 490,180 C 580,160 620,60 720,70 C 810,80 870,165 960,150"
              className="graph-path"
            />
            <path
              d="M 40,210 C 130,220 180,140 250,130 C 340,115 390,195 490,180 C 580,160 620,60 720,70 C 810,80 870,165 960,150"
              className="graph-path-fill"
              style={{ strokeDasharray: `${activeLength}, 1000` }}
            />

            {[
              { s: 1, x: 40, y: 210, l: "Concept" },
              { s: 2, x: 145, y: 185, l: "Discovery" },
              { s: 3, x: 250, y: 130, l: "Alignment" },
              { s: 4, x: 365, y: 140, l: "Specs" },
              { s: 5, x: 490, y: 180, l: "Tech Review" },
              { s: 6, x: 600, y: 125, l: "Build" },
              { s: 7, x: 720, y: 70, l: "Testing" },
              { s: 8, x: 815, y: 110, l: "Iterate" },
              { s: 9, x: 895, y: 155, l: "Launch" },
              { s: 10, x: 960, y: 150, l: "Post-Launch" },
            ].map((n) => (
              <g
                key={n.s}
                className={`node-group ${n.s === activeStage ? "active" : n.s <= maxUnlockedStage ? "completed" : "locked"}`}
                onClick={() => handleNodeClick(n.s)}
                transform={`translate(${n.x}, ${n.y})`}
              >
                <circle r="14" />
                <text className="node-num" dy="4">
                  {n.s}
                </text>
                <text
                  className="node-label"
                  dy={
                    n.s === 3 || n.s === 5 || n.s === 7 || n.s === 10 ? 30 : -22
                  }
                >
                  {n.l}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="metrics-row">
          <div className="metric-cell">
            <span className="metric-label">Current Stage</span>
            <span className="metric-value">{currentData.name}</span>
          </div>
          <div className="metric-cell">
            <span className="metric-label">Timeline</span>
            <span className="metric-value">{currentData.duration}</span>
          </div>
          <div className="metric-cell">
            <span className="metric-label">Stage Status</span>
            <span
              className={`metric-value ${phaseIsCleared ? "status-low" : "status-high"}`}
            >
              {phaseIsCleared
                ? "Complete ✔"
                : !raciIsValid
                  ? "Update RACI"
                  : "Update Deliverable"}
            </span>
          </div>
        </div>
      </header>

      <div
        style={{
          width: "100%",
          maxWidth: "950px",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginTop: "22px",
          padding: "0 2px",
        }}
      >
        <h2
          style={{
            fontSize: "15px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--espresso-primary)",
            margin: 0,
          }}
        >
          Workbench
        </h2>
        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          Complete roles &amp; deliverable to unlock stage document
        </span>
      </div>

      <nav className="app-subbar-nav">
        <div className="nav-tabs-group">
          <div
            className={`nav-link ${viewPage === "overview" ? "active" : ""}`}
            onClick={() => setViewPage("overview")}
          >
            Overview & RACI
          </div>
          <div
            className={`nav-link ${viewPage === "checklist" ? "active" : ""}`}
            onClick={() => setViewPage("checklist")}
          >
            Deliverables
          </div>
          <div
            className={`nav-link ${viewPage === "documentation" ? "active" : ""}`}
            onClick={() => setViewPage("documentation")}
          >
            Documents
          </div>
        </div>

        <button
          className="btn"
          disabled={!phaseIsCleared}
          onClick={commitAndAdvance}
          style={{
            background: phaseIsCleared
              ? "linear-gradient(135deg, #f3e6b8 0%, #cbb26a 55%, #b59746 100%)"
              : "#efe8df",
            border: phaseIsCleared
              ? "1.5px solid #9a7b2c"
              : "1px solid #d5c7b8",
            color: phaseIsCleared ? "#2c211b" : "#6e5d4f",
            padding: "9px 20px",
            fontSize: "13px",
            fontWeight: 600,
            borderRadius: "8px",
            boxShadow: phaseIsCleared
              ? "0 4px 12px rgba(154, 123, 44, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.65)"
              : "inset 0 1px 2px rgba(62, 47, 38, 0.06)",
            transition: "all 0.25s ease",
          }}
        >
          {phaseIsCleared
            ? activeStage === 10
              ? "All Stages Complete ✔"
              : "Commit & Move ➔"
            : "Complete Stage to Continue"}
        </button>
      </nav>

      <main className="app-viewport">
        {viewPage === "overview" && (
          <div className="content-grid">
            <section className="content-card">
              <h2 className="card-heading">Stage Overview</h2>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--text-primary)",
                  lineHeight: "1.65",
                }}
              >
                <p
                  style={{
                    fontWeight: 400,
                    marginBottom: "16px",
                    color: "var(--espresso-primary)",
                  }}
                >
                  {currentData.desc}
                </p>

                {/* Kanban Sticky Note Clue (Warm Cappuccino + Push Pin) */}
                <div
                  style={{
                    position: "relative",
                    backgroundColor: "#f3ece4",
                    border: "1px solid #d9c5b2",
                    borderTop: "6px solid #c8a98e",
                    padding: "20px 18px 16px 18px",
                    borderRadius: "2px 2px 10px 2px",
                    boxShadow: "2px 5px 12px rgba(62, 47, 38, 0.09)",
                    transform: "rotate(-0.6deg)",
                    fontWeight: 500,
                    fontSize: "12.5px",
                    color: "#5c4332",
                    marginTop: "8px",
                    marginBottom: "18px",
                    whiteSpace: "pre-line",
                    lineHeight: "1.65",
                  }}
                >
                  {/* Top-Centre Angled Push Pin */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "-15px",
                      left: "50%",
                      transform: "translateX(-50%) rotate(22deg)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      pointerEvents: "none",
                    }}
                  >
                    {/* Pin Top Cap */}
                    <div
                      style={{
                        width: "12px",
                        height: "5px",
                        borderRadius: "3px",
                        backgroundColor: "#cbb26a",
                        border: "1.5px solid #5c4332",
                      }}
                    />
                    {/* Pin Body */}
                    <div
                      style={{
                        width: "8px",
                        height: "7px",
                        backgroundColor: "#9a7b2c",
                        borderLeft: "1.5px solid #5c4332",
                        borderRight: "1.5px solid #5c4332",
                      }}
                    />
                    {/* Pin Base Collar */}
                    <div
                      style={{
                        width: "14px",
                        height: "5px",
                        borderRadius: "3px",
                        backgroundColor: "#cbb26a",
                        border: "1.5px solid #5c4332",
                      }}
                    />
                    {/* Metal Needle Point */}
                    <div
                      style={{
                        width: "2px",
                        height: "6px",
                        backgroundColor: "#5c4332",
                      }}
                    />
                  </div>

                  {currentData.hint}
                </div>

                <details
                  style={{
                    background: "var(--cream-canvas)",
                    border: "1px solid var(--border-light)",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  <summary
                    style={{
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "var(--espresso-primary)",
                    }}
                  >
                    📋 RACI Role Guide
                  </summary>
                  <ul
                    style={{
                      fontSize: "11.5px",
                      marginTop: "8px",
                      paddingLeft: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      color: "var(--text-muted)",
                    }}
                  >
                    <li>
                      <strong style={{ color: "var(--espresso-primary)" }}>
                        Responsible (R):
                      </strong>{" "}
                      The team doing the work.
                    </li>
                    <li>
                      <strong style={{ color: "var(--espresso-primary)" }}>
                        Accountable (A):
                      </strong>{" "}
                      The owner who signs off on the work.
                    </li>
                    <li>
                      <strong style={{ color: "var(--espresso-primary)" }}>
                        Consulted (C):
                      </strong>{" "}
                      Experts who give input before decisions are made.
                    </li>
                    <li>
                      <strong style={{ color: "var(--espresso-primary)" }}>
                        Informed (I):
                      </strong>{" "}
                      Stakeholders kept updated on progress.
                    </li>
                  </ul>
                </details>
              </div>
            </section>

            <section className="content-card">
              <h2 className="card-heading">Team Roles (RACI)</h2>
              <div className="matrix-table">
                {Object.keys(currentData.raci).map((sh) => (
                  <div key={sh} className="matrix-row-item">
                    <span
                      className="stakeholder-name"
                      style={{ textTransform: "capitalize" }}
                    >
                      {sh === "slt"
                        ? "Senior Leadership (SLT)"
                        : sh === "ux"
                          ? "Product Design (UX/CX)"
                          : sh === "dev"
                            ? "Engineering (Dev)"
                            : sh}
                    </span>
                    <select
                      className="matrix-select"
                      data-state={stakeholders[sh] || "None"}
                      value={stakeholders[sh] || "None"}
                      onChange={(e) => {
                        const updatedSH = {
                          ...stakeholders,
                          [sh]: e.target.value,
                        };
                        setStakeholders(updatedSH);
                        saveState({ stakeholders: updatedSH });
                      }}
                    >
                      {["None", "R", "A", "C", "I"].map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {viewPage === "checklist" && (
          <div className="content-grid">
            <section className="content-card">
              <h2 className="card-heading">Stage Deliverables</h2>
              <p className="drag-instruction">
                Drag the matching deliverable for this stage into the box on the
                right:
              </p>
              <div className="drag-tray">
                {Object.values(MetricsMatrix.phases).map((p, idx) => (
                  <div
                    key={idx}
                    className="draggable-block"
                    draggable
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", p.correctBlock)
                    }
                  >
                    {p.correctBlock}
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card">
              <h2 className="card-heading">Stage Match</h2>
              <div
                className={`drop-zone ${blockIsValid ? "correct" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const incoming = e.dataTransfer.getData("text/plain");
                  setDroppedBlock(incoming);
                  saveState({ droppedBlock: incoming });
                }}
              >
                {droppedBlock
                  ? `Selected Deliverable: ${droppedBlock}`
                  : "Drop matching deliverable here"}
              </div>
              <div
                style={{
                  fontSize: "12.5px",
                  color: "var(--text-muted)",
                  lineHeight: "1.5",
                }}
              >
                {droppedBlock ? (
                  blockIsValid ? (
                    <span style={{ color: "#7c6527", fontWeight: 600 }}>
                      Deliverable matched.
                    </span>
                  ) : (
                    <span style={{ color: "#855434", fontWeight: 600 }}>
                      Not a match for this stage. Try again — see clue notes.
                    </span>
                  )
                ) : (
                  "Drag a pill from the left to match this stage."
                )}
              </div>
            </section>
          </div>
        )}

        {viewPage === "documentation" && (
          <div
            className="content-card"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "1px solid var(--border-light)",
              overflow: "hidden",
              padding: 0,
            }}
          >
            <div
              style={{
                backgroundColor: "#FAF8F5",
                padding: "20px 26px",
                borderBottom: "1px solid var(--border-light)",
                borderLeft: "5px solid var(--gold-accent)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#7c6527",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Stage Document • {currentData.name}
                </span>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    margin: 0,
                    color: "var(--espresso-primary)",
                  }}
                >
                  {currentData.asset}
                </h3>
                <span style={{ fontSize: "12px", color: "#8c7a6b" }}>
                  Timeline: {currentData.duration} • Deliverable:{" "}
                  {currentData.correctBlock}
                </span>
              </div>

              {phaseIsCleared && (
                <button
                  className="btn btn-secondary"
                  onClick={downloadDoc}
                  style={{
                    backgroundColor: "#f9f5e3",
                    borderColor: "var(--gold-accent)",
                    color: "var(--espresso-primary)",
                    fontWeight: 600,
                    padding: "8px 18px",
                  }}
                >
                  ⬇ Save PDF
                </button>
              )}
            </div>

            <div style={{ padding: "24px 26px", background: "#FFFFFF" }}>
              {phaseIsCleared ? (
                <>
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #ece5dd",
                      borderLeft: "4px solid var(--espresso-primary)",
                      padding: "12px 16px",
                      fontSize: "13px",
                      marginBottom: "20px",
                      borderRadius: "4px",
                      color: "var(--text-primary)",
                    }}
                  >
                    <strong>Stage Goal:</strong> {currentData.desc}
                  </div>

                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "#8c7a6b",
                      marginBottom: "8px",
                    }}
                  >
                    Deliverable Notes
                  </div>
                  <pre
                    style={{
                      color: "var(--text-primary)",
                      fontFamily: "'Raleway', sans-serif",
                      fontWeight: 400,
                      fontSize: "13px",
                      lineHeight: "1.7",
                      whiteSpace: "pre-wrap",
                      background: "#FAF8F5",
                      border: "1px solid #ece5dd",
                      borderRadius: "6px",
                      padding: "16px 20px",
                      margin: "0 0 22px 0",
                    }}
                  >
                    {currentData.docText}
                  </pre>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "#8c7a6b",
                      marginBottom: "8px",
                    }}
                  >
                    RACI Role Sign-Off
                  </div>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "13px",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            textAlign: "left",
                            background: "#FAF8F5",
                            color: "var(--espresso-primary)",
                            fontWeight: 600,
                            padding: "8px 12px",
                            border: "1px solid #ece5dd",
                          }}
                        >
                          Team / Stakeholder
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            background: "#FAF8F5",
                            color: "var(--espresso-primary)",
                            fontWeight: 600,
                            padding: "8px 12px",
                            border: "1px solid #ece5dd",
                          }}
                        >
                          Assigned Role
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(currentData.raci)
                        .filter(([, role]) => role !== "None")
                        .map(([key, role]) => {
                          const labels = {
                            product: "Product",
                            slt: "Senior Leadership (SLT)",
                            sponsor: "Sponsor",
                            ux: "Product Design (UX/CX)",
                            dev: "Engineering (Dev)",
                            legal: "Legal",
                            risk: "Risk & Compliance",
                          };
                          return (
                            <tr key={key}>
                              <td
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #ece5dd",
                                }}
                              >
                                {labels[key] || key}
                              </td>
                              <td
                                style={{
                                  padding: "8px 12px",
                                  border: "1px solid #ece5dd",
                                }}
                              >
                                <span
                                  style={{
                                    display: "inline-block",
                                    background: "#f9f5e3",
                                    border: "1px solid var(--gold-accent)",
                                    color: "#7c6527",
                                    fontWeight: 600,
                                    fontSize: "11px",
                                    padding: "2px 10px",
                                    borderRadius: "12px",
                                  }}
                                >
                                  {role}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </>
              ) : (
                <div
                  style={{
                    background: "#FAF8F5",
                    border: "1px solid #ece5dd",
                    borderRadius: "8px",
                    padding: "24px",
                    fontSize: "13px",
                    color: "#8c7a6b",
                  }}
                >
                  Stage Locked: Set the team roles and match the stage
                  deliverable to view this document.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {tourStep !== null && (
        <div className="tour-overlay">
          <div className="tour-card">
            <span className="tour-step-badge">
              {tourSlides[tourStep].badge}
            </span>
            <h3>{tourSlides[tourStep].title}</h3>
            <p>{tourSlides[tourStep].text}</p>
            <div className="tour-actions">
              <button className="btn btn-secondary" onClick={closeTour}>
                Skip Tour
              </button>
              <div style={{ display: "flex", gap: "8px" }}>
                {tourStep > 0 && (
                  <button
                    className="btn btn-secondary"
                    onClick={() => setTourStep(tourStep - 1)}
                  >
                    Back
                  </button>
                )}
                {tourStep < tourSlides.length - 1 ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => setTourStep(tourStep + 1)}
                  >
                    Next ➔
                  </button>
                ) : (
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#f9f5e3",
                      border: "1.5px solid var(--gold-accent)",
                      color: "var(--espresso-primary)",
                      fontWeight: 600,
                    }}
                    onClick={closeTour}
                  >
                    Start Simulation ✔
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showResources && <Resources onClose={() => setShowResources(false)} />}

      <footer className="game-footer">
        <p>
          © 2026 product-lb • Product Path •{" "}
          <a href="#" onClick={globalReset}>
            Reset All Progress
          </a>{" "}
          •{" "}
          <a
            href="https://digital-projects-lb.github.io/product-portfolio/"
            target="_blank"
          >
            View Case Study & Docs
          </a>
        </p>
      </footer>
    </>
  );
}
