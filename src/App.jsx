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
  { x: 152, y: 214 }, // Dummy bend 1 -> 2
  { x: 215, y: 180 }, // Stage 2
  { x: 268, y: 186 }, // Dummy bend 2 -> 3
  { x: 320, y: 218 }, // Stage 3
  { x: 382, y: 216 }, // Dummy bend 3 -> 4
  { x: 415, y: 192 }, // Stage 4
  { x: 376, y: 174 }, // Dummy hairpin 4 -> 5
  { x: 395, y: 155 }, // Stage 5
  { x: 440, y: 147 }, // Dummy bend 5 -> 6
  { x: 510, y: 165 }, // Stage 6
  { x: 500, y: 135 }, // Dummy bend 6 -> 7
  { x: 600, y: 110 }, // Stage 7
  { x: 650, y: 112 }, // Dummy bend 7 -> 8
  { x: 695, y: 132 }, // Stage 8
  { x: 750, y: 150 }, // Dummy bend 8 -> 9
  { x: 795, y: 144 }, // Stage 9
  { x: 848, y: 126 }, // Dummy bend 9 -> 10
  { x: 895, y: 80 }, // Stage 10
];

function createEmptyProgress() {
  return {
    facts: [],
    move: "",
    budget: { user: 40, business: 35, tech: 25 },
    budgetTouched: false,
    stakeholders: [],
    deliverable: "",
    window: "",
    okrOutcome: "",
    kpiOutcome: "",
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
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [isLifecycleFinished, setIsLifecycleFinished] = useState(false);
  const [tourStep, setTourStep] = useState(null);
  const [activeTab, setActiveTab] = useState("why");
  const [showClue, setShowClue] = useState(false);
  const [pinGlow, setPinGlow] = useState(false);

  useEffect(() => {
    setShowClue(false);
    setPinGlow(false);
    const timer = setTimeout(() => {
      setPinGlow(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [activeStage, activeTab]);

  const smoothRoadPath = ROAD_WAYPOINTS.reduce((acc, pt, i, pts) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const p0 = pts[i - 2] || { x: 40, y: 204 };
    const p1 = pts[i - 1];
    const p2 = pt;
    const p3 = pts[i + 1] || p2;
    const cp1x = Math.round(p1.x + (p2.x - p0.x) / 6);
    const cp1y = Math.round(p1.y + (p2.y - p0.y) / 6);
    const cp2x = Math.round(p2.x - (p3.x - p1.x) / 6);
    const cp2y = Math.round(p2.y - (p3.y - p1.y) / 6);
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
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
    currentProgress.move === currentStageData.move &&
    Boolean(currentProgress.budgetTouched) &&
    isBudgetClose;

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
  const isImpactDone =
    currentProgress.okrOutcome === validOutcomeId &&
    currentProgress.kpiOutcome === validOutcomeId;

  const isStageComplete =
    isWhyDone &&
    isWhatDone &&
    isWhoDone &&
    isHowDone &&
    isWhenDone &&
    isImpactDone;

  useEffect(() => {
    if (isStageComplete) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behaviour: "smooth" });
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [isStageComplete]);

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
      setIsLifecycleFinished(true);
      setStatusBanner(
        "Simulation Complete: You guided the product from Concept to Iteration across all 12 months.",
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
    setIsLifecycleFinished(false);
    setStageProgress({ 1: createEmptyProgress() });
    setStatusBanner("");
  };

  const activeNode =
    STAGE_COORDINATES.find((n) => n.s === maxUnlockedStage) ||
    STAGE_COORDINATES[0];
  const activeLength = activeNode.len;
  const timelinePercent = isLifecycleFinished
    ? 100
    : Math.round(((maxUnlockedStage - 1) / 10) * 100);

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
              <linearGradient
                id="nodeCompletedCeramic"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#fcfaf6" />
                <stop offset="46%" stopColor="#ece4d6" />
                <stop offset="52%" stopColor="#ded3c1" />
                <stop offset="100%" stopColor="#f3ece0" />
              </linearGradient>

              <linearGradient
                id="nodeActiveCeramic"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#f5e7d7" />
                <stop offset="46%" stopColor="#dfc3a6" />
                <stop offset="52%" stopColor="#cfa985" />
                <stop offset="100%" stopColor="#e8cfb5" />
              </linearGradient>
              <radialGradient id="mistyGlowOat" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fffdf8" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#ebe2ce" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ebe2ce" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="mistyGlowApricot" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fffaf2" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#dfc3a6" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#dfc3a6" stopOpacity="0" />
              </radialGradient>
            </defs>

            <path className="highway-backdrop" d={smoothRoadPath} />
            <path className="graph-path" d={smoothRoadPath} />

            {(() => {
              if (maxUnlockedStage <= 1) return null;
              const buildSliceD = (startIdx, endIdx) =>
                ROAD_WAYPOINTS.reduce((acc, pt, i, pts) => {
                  if (i < startIdx || i > endIdx) return acc;
                  if (i === startIdx) return `M ${pt.x} ${pt.y}`;
                  const p0 = pts[i - 2] || { x: 40, y: 204 };
                  const p1 = pts[i - 1];
                  const p2 = pt;
                  const p3 = pts[i + 1] || p2;
                  const cp1x = Math.round(p1.x + (p2.x - p0.x) / 6);
                  const cp1y = Math.round(p1.y + (p2.y - p0.y) / 6);
                  const cp2x = Math.round(p2.x - (p3.x - p1.x) / 6);
                  const cp2y = Math.round(p2.y - (p3.y - p1.y) / 6);
                  return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
                }, "");

              const prevIdx = ROAD_WAYPOINTS.findIndex(
                (p) =>
                  p.x === STAGE_COORDINATES[maxUnlockedStage - 2].x &&
                  p.y === STAGE_COORDINATES[maxUnlockedStage - 2].y,
              );
              const targetIdx = ROAD_WAYPOINTS.findIndex(
                (p) =>
                  p.x === STAGE_COORDINATES[maxUnlockedStage - 1].x &&
                  p.y === STAGE_COORDINATES[maxUnlockedStage - 1].y,
              );

              const settledPathD = prevIdx > 0 ? buildSliceD(0, prevIdx) : "";
              const newSegmentD = buildSliceD(prevIdx, targetIdx);
              const unlockedWaypoints = ROAD_WAYPOINTS.slice(0, targetIdx + 1);

              const stardustDots = unlockedWaypoints
                .slice(1)
                .flatMap((pt, idx) => {
                  const prev = unlockedWaypoints[idx];
                  const mx = (prev.x + pt.x) / 2;
                  const my = (prev.y + pt.y) / 2;
                  const isNew = idx >= prevIdx;
                  const baseDelay = isNew ? 2.6 : 0;
                  return [
                    {
                      key: `${idx}-a`,
                      x: prev.x + (pt.x - prev.x) * 0.28,
                      y: prev.y + (pt.y - prev.y) * 0.28 - 6,
                      r: 1.1,
                      delay: `${baseDelay + 0.2}s`,
                    },
                    {
                      key: `${idx}-b`,
                      x: mx + 4,
                      y: my + 5,
                      r: 1.5,
                      delay: `${baseDelay + 0.8}s`,
                    },
                    {
                      key: `${idx}-c`,
                      x: prev.x + (pt.x - prev.x) * 0.74,
                      y: prev.y + (pt.y - prev.y) * 0.74 - 4,
                      r: 1.0,
                      delay: `${baseDelay + 1.4}s`,
                    },
                  ];
                });

              return (
                <g>
                  {settledPathD && (
                    <>
                      <path
                        className="pearl-ribbon-aura settled"
                        d={settledPathD}
                      />
                      <path
                        className="pearl-ribbon-core settled"
                        d={settledPathD}
                      />
                    </>
                  )}
                  <g key={`new-seg-${maxUnlockedStage}`}>
                    <path
                      className="pearl-ribbon-aura"
                      pathLength="1000"
                      d={newSegmentD}
                    />
                    <path
                      id="progress-fill"
                      className="pearl-ribbon-core"
                      pathLength="1000"
                      d={newSegmentD}
                    />
                  </g>
                  <g className="pearl-stardust" pointerEvents="none">
                    {stardustDots.map((dot) => (
                      <circle
                        key={dot.key}
                        cx={dot.x}
                        cy={dot.y}
                        r={dot.r}
                        style={{ animationDelay: dot.delay }}
                      />
                    ))}
                  </g>
                </g>
              );
            })()}

            <g id="nodes-layer">
              {STAGE_COORDINATES.map((n) => {
                const isCompleted =
                  n.s < maxUnlockedStage || (n.s === 10 && isLifecycleFinished);
                const isActive = n.s === activeStage && !isLifecycleFinished;
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
                    {n.s === 10 && isLifecycleFinished && (
                      <g className="milestone-dandelion" pointerEvents="none">
                        <g style={{ filter: "blur(6px)" }}>
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r="23"
                            fill="url(#mistyGlowApricot)"
                          />
                          {Array.from({ length: 64 }).map((_, i) => {
                            const angle = (i * (360 / 64) * Math.PI) / 180;
                            const len = i % 2 === 0 ? 30 : 22;
                            const ex = Math.round(n.x + Math.cos(angle) * len);
                            const ey = Math.round(
                              n.y + Math.sin(angle) * len + 3,
                            );
                            const qx = Math.round(
                              n.x + Math.cos(angle) * (len * 0.55),
                            );
                            const qy = Math.round(
                              n.y + Math.sin(angle) * (len * 0.55) - 2,
                            );
                            return (
                              <path
                                key={i}
                                className={`dandelion-strand ${i % 2 === 0 ? "oat" : "apricot"}`}
                                pathLength="100"
                                d={`M ${n.x} ${n.y} Q ${qx} ${qy} ${ex} ${ey}`}
                              />
                            );
                          })}
                        </g>

                        {Array.from({ length: 18 }).map((_, i) => {
                          const angle = ((i * 20 + 7) * Math.PI) / 180;
                          const dist = 16 + (i % 3) * 7;
                          const sx = Math.round(n.x + Math.cos(angle) * dist);
                          const sy = Math.round(n.y + Math.sin(angle) * dist);
                          return (
                            <circle
                              key={`spark-${i}`}
                              cx={sx}
                              cy={sy}
                              r={i % 3 === 0 ? ".1" : "0.01"}
                              className={`firework-sparkle ${i % 2 === 0 ? "oat" : "apricot"}`}
                              style={{
                                animationDelay: `${(i * 0.22).toFixed(2)}s`,
                              }}
                            />
                          );
                        })}
                      </g>
                    )}

                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="12"
                      style={
                        isCompleted
                          ? { fill: "url(#nodeCompletedCeramic)" }
                          : isActive
                            ? { fill: "url(#nodeActiveCeramic)" }
                            : undefined
                      }
                    />
                    {(isCompleted || isActive) && (
                      <ellipse
                        cx={n.x}
                        cy={n.y - 5.2}
                        rx="7.5"
                        ry="3.2"
                        fill="rgba(255, 255, 255, 0.72)"
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

      <section className="hud-widgets-row">
        <div className="hud-widget">
          <div className="widget-title">Product Value</div>
          <div className="venn-widget-body">
            <svg
              viewBox="0 0 120 88"
              className="mini-venn-svg"
              aria-label="Customer, Business, and Technology Venn Diagram"
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
              <div>Customer: {currentProgress.budget.user}%</div>
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
          <div className="widget-sub">Customer • Business • Tech</div>
        </div>
      </section>

      <div className="workspace-heading-row">
        <h2 className="workspace-heading">Workspace</h2>
        <button
          className={`btn-next-4a ${isStageComplete || isLifecycleFinished ? "ready" : ""}`}
          disabled={!isStageComplete && !isLifecycleFinished}
          onClick={
            isLifecycleFinished
              ? () => setShowMilestoneModal(true)
              : commitAndAdvance
          }
        >
          {isLifecycleFinished
            ? "Project Retrospective"
            : isStageComplete
              ? activeStage === 10
                ? "All Complete ✔"
                : "Next Stage ➔"
              : "Progress"}
        </button>
      </div>

      <div className="workspace-split-header">
        <div className={`workspace-status-bar ${statusBanner ? "alert" : ""}`}>
          {statusBanner ? (
            statusBanner
          ) : (
            <>
              <div className="status-stage-headline">
                Stage {activeStage} &nbsp;•&nbsp;{" "}
                {currentStageData.label.replace(/^\d+\.\s*/, "")} &nbsp;•&nbsp;{" "}
                {currentStageData.timeline}
              </div>
              <div className="status-stage-sub">
                Complete all 6 workspace tabs below to unlock the next stage.
              </div>
            </>
          )}
        </div>

        <aside className="clue-postit-card">
          <div
            className={`sticky-push-pin ${pinGlow && !showClue ? "glowing" : ""}`}
            aria-hidden="true"
          >
            <div className="pin-cap" />
            <div className="pin-body" />
            <div className="pin-collar" />
            <div className="pin-needle" />
          </div>

          <div className="clue-postit-top">
            <span className="answer-guide-title">Stage Clue</span>
            <button
              className="nav-link-clean"
              onClick={() => {
                setShowClue((prev) => !prev);
                setPinGlow(false);
              }}
            >
              {showClue ? "Hide Clue" : "Show Clue"}
            </button>
          </div>

          {showClue ? (
            <div className="clue-postit-body">
              {activeTab === "why" &&
                currentStageData.facts
                  .filter((f) => f.valid)
                  .map((f) => (
                    <div key={f.id} className="clue-line-item">
                      {f.text}
                    </div>
                  ))}
              {activeTab === "what" && (
                <>
                  <div className="clue-line-item">
                    <strong>Move:</strong> {currentStageData.move}
                  </div>
                  <div className="clue-line-item">
                    <strong>Budget:</strong> {currentStageData.budget.user}%
                    User / {currentStageData.budget.business}% Business /{" "}
                    {currentStageData.budget.tech}% Tech
                  </div>
                </>
              )}
              {activeTab === "who" &&
                currentStageData.stakeholders.map((s, idx) => (
                  <div key={idx} className="clue-line-item">
                    <strong>{s.group}:</strong> {s.role}
                  </div>
                ))}
              {activeTab === "how" && (
                <div className="clue-line-item">
                  {currentStageData.deliverable}
                </div>
              )}
              {activeTab === "when" && (
                <div className="clue-line-item">{currentStageData.window}</div>
              )}
              {activeTab === "impact" && (
                <>
                  <div className="clue-line-item">
                    <strong>OKR:</strong> {currentStageData.okr}
                  </div>
                  <div className="clue-line-item">
                    <strong>KPI:</strong> {currentStageData.kpi}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="clue-postit-placeholder">
              Need a nudge on this step? Click above.
            </div>
          )}
        </aside>
      </div>

      <main className="app-viewport">
        <Workspace
          stage={currentStageData}
          progress={currentProgress}
          onUpdateProgress={updateCurrentProgress}
          onOpenDocuments={() => setShowResources(true)}
          isStageComplete={isStageComplete}
          onNextStage={commitAndAdvance}
          isFinalStage={activeStage === 10}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </main>

      {showCalculator && (
        <Calculator onClose={() => setShowCalculator(false)} />
      )}
      {showResources && <Resources onClose={() => setShowResources(false)} />}

      {showMilestoneModal && (
        <div className="tour-overlay">
          <div className="tour-card milestone-modal">
            <span className="tour-step-badge">
              Milestone Reached • Stage 10 Complete
            </span>
            <h3>Product Lifecycle Complete</h3>
            <p>
              You successfully guided your product from early Concept to
              post-launch Iteration across all 10 stages. Where would you like
              to go next?
            </p>
            <div className="milestone-actions">
              <button
                className="btn-next-4a ready"
                onClick={() => {
                  setShowMilestoneModal(false);
                  setActiveStage(1);
                  setMaxUnlockedStage(1);
                  setIsLifecycleFinished(false);
                  setStageProgress({ 1: createEmptyProgress() });
                  setStatusBanner("");
                }}
              >
                Start Again
              </button>
              <button
                className="nav-link-clean"
                onClick={() => {
                  setShowMilestoneModal(false);
                  setShowCalculator(true);
                }}
              >
                KPI Calculator
              </button>
              <button
                className="nav-link-clean"
                onClick={() => {
                  setShowMilestoneModal(false);
                  setShowResources(true);
                }}
              >
                Resources
              </button>
              <button
                className="nav-link-clean"
                onClick={() => setShowMilestoneModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
                style={{ display: "flex", gap: "12px", alignItems: "centre" }}
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
