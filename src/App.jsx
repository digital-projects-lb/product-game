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
  return (
    <>
      <header
        className="dashboard-header"
        style={{ width: "100%", maxWidth: "950px" }}
      >
        <div className="header-top-row">
          <div className="pill-badge">Product Lifecycle Path</div>
          <div className="ticker-wrap">
            <div className="ticker-content">
              {tickerAlert ||
                `[ROADMAP GUIDELINES] Required Artifact: ${currentData.asset} | Milestone Horizon: ${currentData.duration}`}
            </div>
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
                      color: "var(--blue-executive)",
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
                backgroundColor: "var(--blue-executive)",
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
              <button className="btn btn-secondary" onClick={resetStage}>
                Clear Settings
              </button>
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

      <footer className="game-footer">
        <p>
          Product Delivery Platform • Vite + React Architecture •{" "}
          <a href="#" onClick={globalReset}>
            Reset Dashboard
          </a>
        </p>
      </footer>
    </>
  );
}
