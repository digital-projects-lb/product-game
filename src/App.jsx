import React, { useState, useEffect } from "react";
import { MetricsMatrix } from "./metrics.js";

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

  const tourSlides = [
    {
      badge: "Welcome • Product Pipeline",
      title: "Guide a Product from Concept to Scale",
      text: "This interactive simulation walks through 10 real-world product delivery stages. To unlock each stage along the roadmap highway, you must align the right stakeholders and match the right framework deliverable.",
    },
    {
      badge: "Step 1 of 3 • Overview & RACI Tab",
      title: "Align Your Stakeholders (RACI)",
      text: "Read the stage description and orange clue box on the left. Then use the dropdowns on the right to assign Responsible (R), Accountable (A), Consulted (C), or Informed (I) roles to the right teams.",
    },
    {
      badge: "Step 2 of 3 • Readiness Checklist Tab",
      title: "Match the Framework Deliverable",
      text: "Switch to the Readiness Checklist tab. Drag the matching product framework block from the inventory list on the left and drop it into the target slot on the right.",
    },
    {
      badge: "Step 3 of 3 • Asset Workspace Tab",
      title: "Unlock & Advance Down the Roadmap",
      text: "Once your RACI matrix and framework block are both verified, open the Asset Workspace tab to inspect your unlocked deliverable document and click 'Commit & Move' to advance.",
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
        `Phase ${sNum} is locked! Clear metrics in Phase ${maxUnlockedStage} to push down the trail.`,
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
    const printWin = window.open("", "_blank", "width=820,height=900");
    if (!printWin) return;
    const cleanTitle = currentData.asset.replace(".txt", "").replace(/_/g, " ");
    printWin.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${cleanTitle}</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; color: #2c3e50; margin: 0; padding: 40px; background: #ffffff; }
            .doc-header { background: #0b1b3d; color: #ffffff; padding: 28px 32px; border-bottom: 4px solid #d4af37; border-radius: 8px 8px 0 0; }
            .doc-badge { color: #d4af37; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; }
            .doc-title { font-size: 22px; margin: 6px 0 4px 0; font-weight: 600; }
            .doc-meta { font-size: 12px; color: #cbd5e1; }
            .doc-body { border: 1px solid #e5e7eb; border-top: none; padding: 28px 32px; border-radius: 0 0 8px 8px; }
            .doc-summary { background: #faf9f6; border-left: 4px solid #d4af37; padding: 12px 16px; font-size: 13px; margin-bottom: 20px; }
            pre { font-family: 'Segoe UI', Arial, sans-serif; white-space: pre-wrap; font-size: 13px; line-height: 1.65; color: #1e2e4f; margin: 0; }
            .doc-footer { margin-top: 24px; font-size: 11px; color: #7a8b99; text-align: right; }
          </style>
        </head>
        <body>
          <div class="doc-header">
            <div class="doc-badge">Stage Document • ${currentData.name}</div>
            <div class="doc-title">${cleanTitle}</div>
            <div class="doc-meta">Timeline: ${currentData.duration} • Method: ${currentData.correctBlock}</div>
          </div>
          <div class="doc-body">
            <div class="doc-summary"><strong>Stage Scope:</strong> ${currentData.desc}</div>
            <pre>${currentData.docText}</pre>
            <div class="doc-footer">Generated via Product Pipeline • © 2026 product-lb</div>
          </div>
          <script>window.onload = () => { window.print(); };</script>
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
          <div className="pill-badge">Product Pipeline</div>
          <div className="ticker-wrap">
            <div className="ticker-content">
              {tickerAlert ||
                `[ROADMAP GUIDELINES] Required Artifact: ${currentData.asset} | Milestone Horizon: ${currentData.duration}`}
            </div>
          </div>
          <button className="tour-trigger-btn" onClick={() => setTourStep(0)}>
            How to Play
          </button>
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
              { s: 3, x: 250, y: 130, l: "Engagement" },
              { s: 4, x: 365, y: 140, l: "Specs" },
              { s: 5, x: 490, y: 180, l: "Tech Eng" },
              { s: 6, x: 600, y: 125, l: "Dev" },
              { s: 7, x: 720, y: 70, l: "Test" },
              { s: 8, x: 815, y: 110, l: "Iterate" },
              { s: 9, x: 895, y: 155, l: "Launch" },
              { s: 10, x: 960, y: 150, l: "Expand" },
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
            <span className="metric-label">Active Phase Station</span>
            <span className="metric-value blue-text">{currentData.name}</span>
          </div>
          <div className="metric-cell">
            <span className="metric-label">Estimated Horizon Target</span>
            <span className="metric-value">{currentData.duration}</span>
          </div>
          <div className="metric-cell">
            <span className="metric-label">Phase Route Clearance</span>
            <span
              className={`metric-value ${phaseIsCleared ? "status-low" : "status-high"}`}
            >
              {phaseIsCleared
                ? "Verified ✔"
                : !raciIsValid
                  ? "RACI Disconnect"
                  : "Asset Incomplete"}
            </span>
          </div>
        </div>
      </header>

      <nav className="app-subbar-nav">
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
          Readiness Checklist
        </div>
        <div
          className={`nav-link ${viewPage === "documentation" ? "active" : ""}`}
          onClick={() => setViewPage("documentation")}
        >
          Asset Workspace
        </div>
      </nav>

      <main className="app-viewport">
        {viewPage === "overview" && (
          <div className="content-grid">
            <section className="content-card">
              <h2 className="card-heading">Stage Description & Scope</h2>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--text-primary)",
                  lineHeight: "1.6",
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    marginBottom: "12px",
                    color: "var(--blue-deep)",
                  }}
                >
                  {currentData.desc}
                </p>
                <div
                  style={{
                    backgroundColor: "#FDF2E9",
                    borderLeft: "4px solid #E67E22",
                    padding: "10px 14px",
                    borderRadius: "4px",
                    fontWeight: 600,
                    fontSize: "12px",
                    color: "#D35400",
                    marginBottom: "16px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {currentData.hint}
                </div>
                <details
                  style={{
                    background: "#F4F6F7",
                    padding: "10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  <summary
                    style={{
                      fontWeight: 700,
                      fontSize: "12px",
                      color: "var(--blue-primary)",
                    }}
                  >
                    📋 Quick RACI Matrix Framework Cheat Sheet
                  </summary>
                  <ul
                    style={{
                      fontSize: "11px",
                      marginTop: "8px",
                      paddingLeft: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      color: "#566573",
                    }}
                  >
                    <li>
                      <strong>Responsible (R):</strong> The team member actively
                      executing the work tasks.
                    </li>
                    <li>
                      <strong>Accountable (A):</strong> Single owner who holds
                      absolute sign-off approvals.
                    </li>
                    <li>
                      <strong>Consulted (C):</strong> Experts providing vital
                      workflow strategic advice.
                    </li>
                    <li>
                      <strong>Informed (I):</strong> Oversight groups receiving
                      passive push updates.
                    </li>
                  </ul>
                </details>
              </div>
            </section>

            <section className="content-card">
              <h2 className="card-heading">
                Stakeholder Alignment Matrix (RACI)
              </h2>
              <div className="matrix-table">
                {Object.keys(currentData.raci).map((sh) => (
                  <div key={sh} className="matrix-row-item">
                    <span
                      className="stakeholder-name"
                      style={{ textTransform: "capitalize" }}
                    >
                      {sh === "slt"
                        ? "Steering Committee (SLT)"
                        : sh === "ux"
                          ? "Product Design (UX/CX)"
                          : sh === "dev"
                            ? "Engineering Team (Dev)"
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
              <h2 className="card-heading">Framework Architecture Inventory</h2>
              <p className="drag-instruction">
                Drag the accurate asset block matching this delivery stage into
                the target document workspace slot:
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
              <h2 className="card-heading">Framework Alignment Target</h2>
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
                  ? `Active Component: ${droppedBlock}`
                  : "Drop Framework Requirement Component Block Here"}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  lineHeight: "1.4",
                }}
              >
                {droppedBlock ? (
                  blockIsValid ? (
                    <span style={{ color: "#27AE60", fontWeight: "bold" }}>
                      Component validated cleanly against parameters. Lane
                      unlocked.
                    </span>
                  ) : (
                    <span style={{ color: "#C0392B", fontWeight: "bold" }}>
                      Alignment Error: Framework item mismatch. Review criteria.
                    </span>
                  )
                ) : (
                  "Awaiting block placement..."
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
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: "var(--blue-primary)",
                padding: "14px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "var(--gold-accent)",
                    textTransform: "uppercase",
                  }}
                >
                  Unlocked Asset Output
                </span>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    margin: 0,
                    fontFamily: "monospace",
                  }}
                >
                  {currentData.asset}
                </h3>
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                📄 TXT READY
              </div>
            </div>
            <div style={{ padding: "24px", background: "#111A2E" }}>
              <div
                className="document-preview-box"
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                }}
              >
                <pre
                  style={{
                    color: "#A9B7C6",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                >
                  {phaseIsCleared
                    ? currentData.docText
                    : "[GOVERNANCE HOLD]: Awaiting full RACI alignment mapping matrix and correct architecture component drop to baseline specs."}
                </pre>
              </div>
            </div>
            <div
              style={{
                padding: "16px 24px",
                background: "#FAF9F6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <button className="btn btn-secondary" onClick={resetStage}>
                  Clear Settings
                </button>
                {phaseIsCleared && (
                  <button
                    className="btn btn-secondary"
                    onClick={downloadDoc}
                    style={{
                      borderColor: "var(--blue-primary)",
                      color: "var(--blue-primary)",
                    }}
                  >
                    ⬇ Save PDF
                  </button>
                )}
              </div>

              <button
                className="btn btn-primary"
                disabled={!phaseIsCleared}
                onClick={commitAndAdvance}
                style={{
                  backgroundColor: phaseIsCleared
                    ? "var(--gold-accent)"
                    : "#D1D5DB",
                  color: phaseIsCleared ? "var(--blue-deep)" : "#9CA3AF",
                }}
              >
                {phaseIsCleared
                  ? activeStage === 10
                    ? "Lifecycle Finalized"
                    : "Commit & Move ➔"
                  : "Blocked: Awaiting Validation"}
              </button>
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
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "var(--gold-accent)",
                      color: "var(--blue-deep)",
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

      <footer className="game-footer">
        <p>
          © 2026 product-lb • Product Pipeline •{" "}
          <a href="#" onClick={globalReset}>
            Reset Dashboard
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
