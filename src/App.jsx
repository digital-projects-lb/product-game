import React, { useState, useEffect } from "react";
import { StageData } from "./Data";
import Workspace from "./Workspace";
import Calculator from "./Calculator";
import Resources from "./Resources";

const STAGE_COORDINATES = [
  {
    s: 1,
    x: 90,
    y: 222,
    l: "Concept",
    len: 0,
    dx: 0,
    dy: 24,
    anchor: "middle",
  },
  {
    s: 2,
    x: 215,
    y: 180,
    l: "Business Case",
    len: 135,
    dx: 0,
    dy: -21,
    anchor: "middle",
  },
  {
    s: 3,
    x: 320,
    y: 218,
    l: "Discovery",
    len: 255,
    dx: 0,
    dy: 24,
    anchor: "middle",
  },
  {
    s: 4,
    x: 415,
    y: 192,
    l: "Design",
    len: 375,
    dx: 18,
    dy: 4,
    anchor: "start",
  },
  {
    s: 5,
    x: 395,
    y: 155,
    l: "Plan",
    len: 465,
    dx: 0,
    dy: -21,
    anchor: "middle",
  },
  {
    s: 6,
    x: 510,
    y: 165,
    l: "Build",
    len: 590,
    dx: 0,
    dy: 25,
    anchor: "middle",
  },
  {
    s: 7,
    x: 600,
    y: 110,
    l: "Test",
    len: 705,
    dx: 0,
    dy: -21,
    anchor: "middle",
  },
  {
    s: 8,
    x: 695,
    y: 132,
    l: "Launch",
    len: 805,
    dx: 0,
    dy: -21,
    anchor: "middle",
  },
  {
    s: 9,
    x: 795,
    y: 144,
    l: "Review",
    len: 905,
    dx: 0,
    dy: 25,
    anchor: "middle",
  },
  {
    s: 10,
    x: 895,
    y: 80,
    l: "Iterate",
    len: 1000,
    dx: 0,
    dy: -21,
    anchor: "middle",
  },
];

// Road waypoints including dummy curve points between 3-4, 4-5, and 6-7
const ROAD_WAYPOINTS = [
  { x: 90, y: 222 }, // Stage 1
  { x: 215, y: 180 }, // Stage 2
  { x: 320, y: 218 }, // Stage 3
  { x: 380, y: 213 }, // Dummy bend 3 -> 4 (hugs lower curve)
  { x: 415, y: 192 }, // Stage 4
  { x: 377, y: 177 }, // Dummy hairpin 4 -> 5 (swings left around switchback)
  { x: 395, y: 155 }, // Stage 5
  { x: 510, y: 165 }, // Stage 6
  { x: 500, y: 130 }, // Dummy bend 6 -> 7 (follows cliff base before climbing)
  { x: 600, y: 110 }, // Stage 7
  { x: 695, y: 132 }, // Stage 8
  { x: 795, y: 144 }, // Stage 9
  { x: 895, y: 80 }, // Stage 10
];

function createEmptyProgress() {
  return {
    facts: [],
    move: "",
    budget: { user: 40, business: 35, tech: 25 },
    stakeholders: [],
    deliverable: "",
    window: "",
    outcome: "",
  };
}

export default function App() {
  const [activeStage, setActiveStage] = useState(1);
  const [maxUnlockedStage, setMaxUnlockedStage] = useState(1);
  const [stageProgress, setStageProgress] = useState({
    1: createEmptyProgress(),
  });
  const [statusBanner, setStatusBanner] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [tourStep, setTourStep] = useState(null);

  const smoothRoadPath = ROAD_WAYPOINTS.reduce((acc, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[idx - 1];
    const midX = Math.round((prev.x + pt.x) / 2);
    return `${acc} C ${midX} ${prev.y}, ${midX} ${pt.y}, ${pt.x} ${pt.y}`;
  }, "");

  useEffect(() => {
    try {
      const seenTour = localStorage.getItem("productPathTourSeen");
      if (!seenTour) {
        setTourStep(0);
      }
    } catch (e) {}
  }, []);

  const closeTour = () => {
    setTourStep(null);
    try {
      localStorage.setItem("productPathTourSeen", "true");
    } catch (e) {}
  };

  const tourSlides = [
    {
      badge: "Step 1 of 4 • Welcome",
      title: "Welcome to Product Path",
      text: "Guide a product from early Concept to post-launch Iteration across 10 practical stages. Use the Stage Answer Guide sticky note whenever you want a quick hint.",
    },
    {
      badge: "Step 2 of 4 • Interactive Road",
      title: "Navigate Unlocked Stages",
      text: "Click any glowing node along the coastal road to review completed stages or inspect your current stage.",
    },
    {
      badge: "Step 3 of 4 • 6-Step Workspace",
      title: "Work Through Why, What, Who, How, When & Impact",
      text: "Complete all 6 tabs in the workspace below—pick evidence, choose a Product Move, balance the 100% User/Business/Tech budget, align stakeholders, drag deliverables, and move OKR tickets.",
    },
    {
      badge: "Step 4 of 4 • Toolkit & Templates",
      title: "KPI Calculator & Resource Library",
      text: "Use the top links anytime to open the 3-Pillar KPI Calculator or save PDF Product Guides and Stage Document templates.",
    },
  ];

  const currentStageData = StageData.stages[activeStage];
  const currentProgress = stageProgress[activeStage] || createEmptyProgress();

  const updateCurrentProgress = (updatedFields) => {
    setStageProgress((prev) => ({
      ...prev,
      [activeStage]: updatedFields,
    }));
  };

  const validFactIds = currentStageData.facts
    .filter((f) => f.valid)
    .map((f) => f.id);
  const isWhyDone =
    currentProgress.facts.length === 2 &&
    validFactIds.every((id) => currentProgress.facts.includes(id));

  const budgetTotal =
    currentProgress.budget.user +
    currentProgress.budget.business +
    currentProgress.budget.tech;
  const isBudgetClose =
    budgetTotal === 100 &&
    Math.abs(currentProgress.budget.user - currentStageData.budget.user) <=
      10 &&
    Math.abs(
      currentProgress.budget.business - currentStageData.budget.business,
    ) <= 10 &&
    Math.abs(currentProgress.budget.tech - currentStageData.budget.tech) <= 10;
  const isWhatDone =
    currentProgress.move === currentStageData.move && isBudgetClose;

  const isWhoDone =
    currentProgress.stakeholders.length === 2 &&
    currentStageData.stakeholders.every((target) =>
      currentProgress.stakeholders.some(
        (picked) =>
          picked.group === target.group && picked.role === target.role,
      ),
    );

  const isHowDone =
    currentProgress.deliverable === currentStageData.deliverable;
  const isWhenDone = currentProgress.window === currentStageData.window;
  const validOutcomeId = currentStageData.outcomes.find((o) => o.valid)?.id;
  const isImpactDone = currentProgress.outcome === validOutcomeId;

  const isStageComplete =
    isWhyDone &&
    isWhatDone &&
    isWhoDone &&
    isHowDone &&
    isWhenDone &&
    isImpactDone;

  const handleNodeClick = (stageNum) => {
    if (stageNum > maxUnlockedStage) {
      setStatusBanner(
        `Locked: Complete all 6 steps in Stage ${maxUnlockedStage} before advancing.`,
      );
      return;
    }
    setStatusBanner("");
    setActiveStage(stageNum);
  };

  const commitAndAdvance = () => {
    if (!isStageComplete) return;
    if (activeStage < 10) {
      const nextStage = activeStage + 1;
      setMaxUnlockedStage((prev) => Math.max(prev, nextStage));
      setStageProgress((prev) => ({
        ...prev,
        [nextStage]: prev[nextStage] || createEmptyProgress(),
      }));
      setActiveStage(nextStage);
      setStatusBanner("");
    } else {
      setStatusBanner(
        "Simulation Complete: You guided the product from Concept to Iteration.",
      );
    }
  };

  const resetStage = () => {
    setStageProgress((prev) => ({
      ...prev,
      [activeStage]: createEmptyProgress(),
    }));
    setStatusBanner("");
  };

  const globalReset = (e) => {
    e.preventDefault();
    setActiveStage(1);
    setMaxUnlockedStage(1);
    setStageProgress({ 1: createEmptyProgress() });
    setStatusBanner("");
  };

  const activeNode =
    STAGE_COORDINATES.find((n) => n.s === maxUnlockedStage) ||
    STAGE_COORDINATES[0];
  const activeLength = activeNode.len;
  const timelinePercent = Math.round((maxUnlockedStage / 10) * 100);
  return (
    <>
      <header className="dashboard-header">
        <div className="header-top-row">
          <div className="brand-title">Product Path</div>

          <div className="nav-links">
            <button
              className="nav-link-clean"
              onClick={() => setShowCalculator(true)}
            >
              KPI Calculator
            </button>
            <button
              className="nav-link-clean"
              onClick={() => setShowResources(true)}
            >
              Resources
            </button>
            <button className="nav-link-clean" onClick={resetStage}>
              Reset
            </button>
            <button className="nav-link-clean" onClick={() => setTourStep(0)}>
              How to Play
            </button>
          </div>
        </div>

        <div className="svg-container">
          <svg
            id="road-svg"
            viewBox="0 0 1000 260"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="nodeCeramicSheen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.78" />
                <stop offset="48%" stopColor="#ffffff" stopOpacity="0.18" />
                <stop offset="52%" stopColor="#3e2f26" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.14" />
              </linearGradient>
            </defs>
            <path className="highway-backdrop" d={smoothRoadPath} />
            <path className="graph-path" d={smoothRoadPath} />
            <path
              id="progress-fill"
              className="graph-path-fill"
              pathLength="1000"
              strokeDasharray={`${activeLength} 1000`}
              d={smoothRoadPath}
            />

            <g id="nodes-layer">
              {STAGE_COORDINATES.map((n) => {
                const isCompleted = n.s < maxUnlockedStage;
                const isActive = n.s === activeStage;
                const isLocked = n.s > maxUnlockedStage;
                let cls = "node-group";
                if (isCompleted) cls += " completed";
                if (isActive) cls += " active";
                if (isLocked) cls += " locked";
                return (
                  <g
                    key={n.s}
                    className={cls}
                    onClick={() => handleNodeClick(n.s)}
                  >
                    <circle cx={n.x} cy={n.y} r="11.5" />
                    {(isCompleted || isActive) && (
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r="11.5"
                        fill="url(#nodeCeramicSheen)"
                        stroke="none"
                        pointerEvents="none"
                      />
                    )}
                    <text className="node-num" x={n.x} y={n.y}>
                      {n.s}
                    </text>
                    <text
                      className="node-label"
                      x={n.x + n.dx}
                      y={n.y + n.dy}
                      style={{ textAnchor: n.anchor }}
                    >
                      {n.l}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div className="metrics-row">
          <div className="metric-cell">
            <span className="metric-label">Current Stage</span>
            <span className="metric-value">{currentStageData.label}</span>
          </div>
          <div className="metric-cell">
            <span className="metric-label">Timeline Window</span>
            <span className="metric-value">{currentStageData.timeline}</span>
          </div>
          <div className="metric-cell">
            <span className="metric-label">Stage Status</span>
            <span
              className={`metric-value ${
                isStageComplete ? "status-low" : "status-high"
              }`}
            >
              {isStageComplete ? "Ready for Next Stage" : "In Progress"}
            </span>
          </div>
        </div>
      </header>

      <div className="workspace-heading-row">
        <h2 className="workspace-heading">Workspace</h2>
        <button
          className={`btn-next-4a ${isStageComplete ? "ready" : ""}`}
          disabled={!isStageComplete}
          onClick={commitAndAdvance}
        >
          {isStageComplete
            ? activeStage === 10
              ? "All Complete ✔"
              : "Next Stage ➔"
            : "Progress"}
        </button>
      </div>

      <div className={`workspace-status-bar ${statusBanner ? "alert" : ""}`}>
        {statusBanner
          ? statusBanner
          : `${currentStageData.label} (${currentStageData.timeline}) — Complete all 6 workspace tabs below to unlock the next stage.`}
      </div>

      <section className="hud-widgets-row">
        <div className="hud-widget">
          <div className="widget-title">Product Value Venn</div>
          <div className="venn-widget-body">
            <svg
              viewBox="0 0 120 88"
              className="mini-venn-svg"
              aria-label="End-User, Business, and Technology Venn Diagram"
            >
              <defs>
                <linearGradient id="sheenTop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.72" />
                  <stop offset="48%" stopColor="#ffffff" stopOpacity="0.18" />
                  <stop offset="52%" stopColor="#3e2f26" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12" />
                </linearGradient>
              </defs>
              <g style={{ mixBlendMode: "multiply" }}>
                <circle
                  cx="45"
                  cy="34"
                  r="24"
                  fill="#ebe2ce"
                  fillOpacity="0.78"
                  stroke="rgba(62,47,38,0.28)"
                  strokeWidth="1"
                />
                <circle
                  cx="75"
                  cy="34"
                  r="24"
                  fill="#89a8ba"
                  fillOpacity="0.62"
                  stroke="rgba(62,47,38,0.28)"
                  strokeWidth="1"
                />
                <circle
                  cx="60"
                  cy="55"
                  r="24"
                  fill="#97b09f"
                  fillOpacity="0.66"
                  stroke="rgba(62,47,38,0.28)"
                  strokeWidth="1"
                />
              </g>
              <circle cx="45" cy="34" r="24" fill="url(#sheenTop)" />
              <circle cx="75" cy="34" r="24" fill="url(#sheenTop)" />
              <circle cx="60" cy="55" r="24" fill="url(#sheenTop)" />
            </svg>
            <div className="venn-legend">
              <div>User: {currentProgress.budget.user}%</div>
              <div>Business: {currentProgress.budget.business}%</div>
              <div>Tech: {currentProgress.budget.tech}%</div>
            </div>
          </div>
        </div>

        <div className="hud-widget">
          <div className="widget-title">Lifecycle Timeline</div>
          <div className="widget-metric">{timelinePercent}% Complete</div>
          <div className="mini-meter-track">
            <div
              className="mini-meter-fill sheen"
              style={{ width: `${timelinePercent}%` }}
            />
          </div>
          <div className="widget-sub">
            Stage {activeStage} of 10 • {currentStageData.window}
          </div>
        </div>

        <div className="hud-widget">
          <div className="widget-title">Stage Budget Split</div>
          <div className="widget-metric">
            {currentProgress.budget.user}% / {currentProgress.budget.business}%
            / {currentProgress.budget.tech}%
          </div>
          <div className="budget-bar-visual">
            <div
              className="budget-seg user sheen"
              style={{ width: `${currentProgress.budget.user}%` }}
            />
            <div
              className="budget-seg business sheen"
              style={{ width: `${currentProgress.budget.business}%` }}
            />
            <div
              className="budget-seg tech sheen"
              style={{ width: `${currentProgress.budget.tech}%` }}
            />
          </div>
          <div className="widget-sub">User • Business • Tech</div>
        </div>
      </section>

      <div className="answer-sticky-note">
        <div className="sticky-push-pin" aria-hidden="true">
          <div className="pin-cap" />
          <div className="pin-body" />
          <div className="pin-collar" />
          <div className="pin-needle" />
        </div>
        <div className="answer-guide-title">Stage Answer Guide</div>
        <div className="answer-guide-body">{currentStageData.clue}</div>
      </div>

      <main className="app-viewport">
        <Workspace
          stage={currentStageData}
          progress={currentProgress}
          onUpdateProgress={updateCurrentProgress}
          onOpenDocuments={() => setShowResources(true)}
        />
      </main>

      {showCalculator && (
        <Calculator onClose={() => setShowCalculator(false)} />
      )}
      {showResources && <Resources onClose={() => setShowResources(false)} />}

      {tourStep !== null && (
        <div className="tour-overlay">
          <div className="tour-card">
            <span className="tour-step-badge">
              {tourSlides[tourStep].badge}
            </span>
            <h3>{tourSlides[tourStep].title}</h3>
            <p>{tourSlides[tourStep].text}</p>
            <div className="tour-actions">
              <button className="nav-link-clean" onClick={closeTour}>
                Skip Tour
              </button>
              <div
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                {tourStep > 0 && (
                  <button
                    className="nav-link-clean"
                    onClick={() => setTourStep(tourStep - 1)}
                  >
                    Back
                  </button>
                )}
                {tourStep < tourSlides.length - 1 ? (
                  <button
                    className="btn-next-4a ready"
                    onClick={() => setTourStep(tourStep + 1)}
                  >
                    Next ➔
                  </button>
                ) : (
                  <button className="btn-next-4a ready" onClick={closeTour}>
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
          © 2026 product-lb • Product Path •{" "}
          <a href="#" onClick={globalReset}>
            Reset All Progress
          </a>{" "}
          •{" "}
          <a href="https://github.io" target="_blank" rel="noreferrer">
            View Case Study &amp; Docs
          </a>
        </p>
      </footer>
    </>
  );
}
