import React, { useState, useEffect } from "react";
import { StageData } from "./Data";
import Workspace from "./Workspace";
import Calculator from "./Calculator";
import Resources from "./Resources";

const STAGE_COORDINATES = [
  { s: 1, x: 40, y: 210, l: "Concept", len: 0 },
  { s: 2, x: 145, y: 185, l: "Business Case", len: 112 },
  { s: 3, x: 250, y: 130, l: "Discovery", len: 230 },
  { s: 4, x: 365, y: 155, l: "Design", len: 348 },
  { s: 5, x: 490, y: 180, l: "Plan", len: 476 },
  { s: 6, x: 590, y: 115, l: "Build", len: 595 },
  { s: 7, x: 675, y: 68, l: "Test", len: 693 },
  { s: 8, x: 775, y: 92, l: "Launch", len: 796 },
  { s: 9, x: 870, y: 148, l: "Review", len: 907 },
  { s: 10, x: 960, y: 150, l: "Iterate", len: 1000 },
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
  const currentProgress =
    stageProgress[activeStage] || createEmptyProgress();

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
    Math.abs(currentProgress.budget.user - currentStageData.budget.user) <= 10 &&
    Math.abs(
      currentProgress.budget.business - currentStageData.budget.business
    ) <= 10 &&
    Math.abs(currentProgress.budget.tech - currentStageData.budget.tech) <= 10;
  const isWhatDone =
    currentProgress.move === currentStageData.move && isBudgetClose;

  const isWhoDone =
    currentProgress.stakeholders.length === 2 &&
    currentStageData.stakeholders.every((target) =>
      currentProgress.stakeholders.some(
        (picked) =>
          picked.group === target.group && picked.role === target.role
      )
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
        `Locked: Complete all 6 steps in Stage ${maxUnlockedStage} before advancing.`
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
        "Simulation Complete: You guided the product from Concept to Iteration."
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
            <button
              className="nav-link-clean"
              onClick={() => setTourStep(0)}
            >
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
            <line
              className="baseline-guide"
              x1="40"
              y1="210"
              x2="960"
              y2="150"
            />
            <path
              className="highway-backdrop"
              d="M 40 210 C 90 210, 100 185, 145 185 C 195 185, 200 130, 250 130 C 310 130, 315 155, 365 155 C 430 155, 435 180, 490 180 C 545 180, 540 115, 590 115 C 635 115, 635 68, 675 68 C 725 68, 725 92, 775 92 C 825 92, 825 148, 870 148 C 915 148, 920 150, 960 150"
            />
            <path
              className="graph-path"
              d="M 40 210 C 90 210, 100 185, 145 185 C 195 185, 200 130, 250 130 C 310 130, 315 155, 365 155 C 430 155, 435 180, 490 180 C 545 180, 540 115, 590 115 C 635 115, 635 68, 675 68 C 725 68, 725 92, 775 92 C 825 92, 825 148, 870 148 C 915 148, 920 150, 960 150"
            />
            <path
              id="progress-fill"
              className="graph-path-fill"
              pathLength="1000"
              strokeDasharray={`${activeLength} 1000`}
              d="M 40 210 C 90 210, 100 185, 145 185 C 195 185, 200 130, 250 130 C 310 130, 315 155, 365 155 C 430 155, 435 180, 490 180 C 545 180, 540 115, 590 115 C 635 115, 635 68, 675 68 C 725 68, 725 92, 775 92 C 825 92, 825 148, 870 148 C 915 148, 920 150, 960 150"
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
                const labelY = n.s === 7 ? n.y + 32 : n.y - 24;

                return (
                  <g
                    key={n.s}
                    className={cls}
                    onClick={() => handleNodeClick(n.s)}
                  >
                    <circle cx={n.x} cy={n.y} r="13" />
                    <text className="node-num" x={n.x} y={n.y}>
                      {n.s}
                    </text>
                    <text className="node-label" x={n.x} y={labelY}>
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
            {currentProgress.budget.user}% / {currentProgress.budget.business}% /{" "}
            {currentProgress.budget.tech}%
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
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
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
          <a
            href="https://github.io"
            target="_blank"
            rel="noreferrer"
          >
            View Case Study &amp; Docs
          </a>
        </p>
      </footer>
    </>
  );
}
