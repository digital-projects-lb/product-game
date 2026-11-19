import React, { useState, useEffect, useRef } from "react";
import { StageData } from "./Data";

export default function Workspace({
  stage,
  progress,
  onUpdateProgress,
  onOpenDocuments,
  isStageComplete,
  onNextStage,
  isFinalStage,
  activeTab,
  onTabChange,
}) {
  const [draggedDeliverable, setDraggedDeliverable] = useState(null);

  const [draggedKanbanCard, setDraggedKanbanCard] = useState(null);
  const prevDoneRef = useRef({});

  const validFactIds = stage.facts.filter((f) => f.valid).map((f) => f.id);
  const isWhyDone =
    progress.facts.length === 2 &&
    validFactIds.every((id) => progress.facts.includes(id));

  const budgetTotal =
    progress.budget.user + progress.budget.business + progress.budget.tech;
  const isBudgetClose =
    budgetTotal === 100 &&
    Math.abs(progress.budget.user - stage.budget.user) <= 10 &&
    Math.abs(progress.budget.business - stage.budget.business) <= 10 &&
    Math.abs(progress.budget.tech - stage.budget.tech) <= 10;
  const isWhatDone =
    progress.move === stage.move &&
    Boolean(progress.budgetTouched) &&
    isBudgetClose;

  const isWhoDone =
    progress.stakeholders.length === 2 &&
    stage.stakeholders.every((target) =>
      progress.stakeholders.some(
        (picked) =>
          picked.group === target.group && picked.role === target.role,
      ),
    );

  const isHowDone = progress.deliverable === stage.deliverable;
  const isWhenDone = progress.window === stage.window;

  const validOutcomeId = stage.outcomes.find((o) => o.valid)?.id;
  const isImpactDone =
    progress.okrOutcome === validOutcomeId &&
    progress.kpiOutcome === validOutcomeId;

  const tabs = [
    { id: "why", step: "1. Why", sub: "Opportunity", done: isWhyDone },
    { id: "what", step: "2. What", sub: "Move & Budget", done: isWhatDone },
    { id: "who", step: "3. Who", sub: "Stakeholders", done: isWhoDone },
    { id: "how", step: "4. How", sub: "Delivery", done: isHowDone },
    { id: "when", step: "5. When", sub: "Timeline", done: isWhenDone },
    { id: "impact", step: "6. Impact", sub: "Measure", done: isImpactDone },
  ];

  // Reset to Tab 1 when switching stages
  useEffect(() => {
    onTabChange("why");
    prevDoneRef.current = {};
  }, [stage.label]);

  // Auto-advance to the next incomplete step when the current tab completes
  useEffect(() => {
    const currentTabObj = tabs.find((t) => t.id === activeTab);
    const wasDone = prevDoneRef.current[activeTab];
    prevDoneRef.current = tabs.reduce((acc, t) => {
      acc[t.id] = t.done;
      return acc;
    }, {});

    if (
      currentTabObj &&
      currentTabObj.done &&
      !wasDone &&
      activeTab !== "what"
    ) {
      const currentIdx = tabs.findIndex((t) => t.id === activeTab);

      const nextIncomplete =
        tabs.slice(currentIdx + 1).find((t) => !t.done) ||
        tabs.find((t) => !t.done);
      if (nextIncomplete) {
        const timer = setTimeout(() => {
          onTabChange(nextIncomplete.id);
        }, 450);
        return () => clearTimeout(timer);
      }
    }
  }, [
    isWhyDone,
    isWhatDone,
    isWhoDone,
    isHowDone,
    isWhenDone,
    isImpactDone,
    activeTab,
  ]);

  const toggleFact = (factId) => {
    const exists = progress.facts.includes(factId);
    const updated = exists
      ? progress.facts.filter((id) => id !== factId)
      : progress.facts.length < 2
        ? [...progress.facts, factId]
        : [progress.facts[1], factId];
    onUpdateProgress({ ...progress, facts: updated });
  };

  // Slider proportional adjustment
  const handleBudgetSlider = (pillar, rawVal) => {
    const val = Math.max(0, Math.min(100, Number(rawVal) || 0));
    const remaining = 100 - val;
    if (pillar === "user") {
      const otherTotal = progress.budget.business + progress.budget.tech;
      const bizShare =
        otherTotal > 0
          ? Math.round((progress.budget.business / otherTotal) * remaining)
          : Math.round(remaining / 2);
      onUpdateProgress({
        ...progress,
        budgetTouched: true,
        budget: { user: val, business: bizShare, tech: remaining - bizShare },
      });
    } else if (pillar === "business") {
      const otherTotal = progress.budget.user + progress.budget.tech;
      const userShare =
        otherTotal > 0
          ? Math.round((progress.budget.user / otherTotal) * remaining)
          : Math.round(remaining / 2);
      onUpdateProgress({
        ...progress,
        budgetTouched: true,
        budget: { user: userShare, business: val, tech: remaining - userShare },
      });
    } else {
      const otherTotal = progress.budget.user + progress.budget.business;
      const userShare =
        otherTotal > 0
          ? Math.round((progress.budget.user / otherTotal) * remaining)
          : Math.round(remaining / 2);
      onUpdateProgress({
        ...progress,
        budgetTouched: true,
        budget: { user: userShare, business: remaining - userShare, tech: val },
      });
    }
  };

  // Direct numeric override (lets user type exact values without fighting auto-balance)
  const handleBudgetDirectInput = (pillar, rawVal) => {
    const val = Math.max(0, Math.min(100, Number(rawVal) || 0));
    onUpdateProgress({
      ...progress,
      budgetTouched: true,
      budget: { ...progress.budget, [pillar]: val },
    });
  };

  const toggleStakeholderRole = (group, role) => {
    const existing = progress.stakeholders.find((s) => s.group === group);
    let updated = [...progress.stakeholders];
    if (existing && existing.role === role) {
      updated = updated.filter((s) => s.group !== group);
    } else if (existing) {
      updated = updated.map((s) => (s.group === group ? { group, role } : s));
    } else if (updated.length < 2) {
      updated.push({ group, role });
    } else {
      updated = [updated[1], { group, role }];
    }
    onUpdateProgress({ ...progress, stakeholders: updated });
  };

  const handleDropDeliverable = (e) => {
    e.preventDefault();
    if (draggedDeliverable) {
      onUpdateProgress({ ...progress, deliverable: draggedDeliverable });
      setDraggedDeliverable(null);
    }
  };

  const handleDropKanban = (e) => {
    e.preventDefault();
    if (!draggedKanbanCard) return;
    if (draggedKanbanCard.type === "okr") {
      onUpdateProgress({ ...progress, okrOutcome: draggedKanbanCard.id });
    } else if (draggedKanbanCard.type === "kpi") {
      onUpdateProgress({ ...progress, kpiOutcome: draggedKanbanCard.id });
    }
    setDraggedKanbanCard(null);
  };
  return (
    <div className="workspace-box">
      <div className="tab-flow-bar">
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            <button
              className={`flow-tab-pill ${activeTab === tab.id ? "current" : ""} ${
                tab.done ? "completed" : ""
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className="flow-tab-step">
                {tab.done ? "✓ " : ""}
                {tab.step}
              </span>
              <span className="flow-tab-sub">{tab.sub}</span>
            </button>
            {index < tabs.length - 1 && (
              <span className={`flow-arrow ${tab.done ? "lit" : ""}`}>➔</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="tab-panel-body">
        {activeTab === "why" && (
          <div>
            <div className="panel-top-row">
              <div>
                <h3 className="panel-title">The Opportunity</h3>
                <p className="panel-help">
                  Select the <strong>2 real customer or market facts</strong>{" "}
                  that justify this stage.
                </p>
              </div>
              <span className="step-counter">
                Selected: {progress.facts.length} / 2
              </span>
            </div>

            <div className="evidence-list">
              {stage.facts.map((fact) => {
                const picked = progress.facts.includes(fact.id);
                return (
                  <button
                    key={fact.id}
                    className={`evidence-strip ${picked ? "picked" : ""}`}
                    onClick={() => toggleFact(fact.id)}
                  >
                    <span className="evidence-check">{picked ? "✓" : ""}</span>
                    <span>{fact.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "what" && (
          <div>
            <div className="panel-top-row">
              <div>
                <h3 className="panel-title">
                  Product Move &amp; Budget Allocation
                </h3>
                <p className="panel-help">
                  Choose the right <strong>Product Move</strong> and balance the{" "}
                  <strong>100% Budget Split</strong> across Customer, Business,
                  and Technology.
                </p>
              </div>
            </div>

            <div
              className={`move-callout-box ${progress.move ? "has-selection" : ""}`}
            >
              <div className="move-callout-header">
                <span>
                  Choose Strategic Product Move{" "}
                  {progress.move ? `— ${progress.move}` : ""}
                </span>
              </div>
              <div className="move-pill-row">
                {stage.moves.map((moveLabel) => (
                  <button
                    key={moveLabel}
                    className={`move-pill ${
                      progress.move === moveLabel ? "picked" : ""
                    }`}
                    onClick={() =>
                      onUpdateProgress({ ...progress, move: moveLabel })
                    }
                  >
                    {moveLabel}
                  </button>
                ))}
              </div>
            </div>

            <div className="budget-split-box">
              <div className="budget-instructions-row">
                <span>
                  Drag the sliders to auto-balance, or type exact percentages
                  directly into the boxes on the right:
                </span>
                <span
                  className={`budget-total-badge ${
                    budgetTotal === 100 ? "valid" : "warn"
                  }`}
                >
                  Total: {budgetTotal}%{" "}
                  {budgetTotal !== 100 ? "(Must equal 100%)" : "✓"}
                </span>
              </div>

              <div className="budget-bar-visual">
                <div
                  className="budget-seg user sheen"
                  style={{ width: `${Math.min(100, progress.budget.user)}%` }}
                />
                <div
                  className="budget-seg business sheen"
                  style={{
                    width: `${Math.min(100, progress.budget.business)}%`,
                  }}
                />
                <div
                  className="budget-seg tech sheen"
                  style={{ width: `${Math.min(100, progress.budget.tech)}%` }}
                />
              </div>

              <div className="budget-sliders">
                <div className="slider-row">
                  <div className="slider-label-row">
                    <span>Customer Focus</span>
                    <div className="budget-num-wrap">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        value={progress.budget.user}
                        onChange={(e) =>
                          handleBudgetDirectInput("user", e.target.value)
                        }
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <input
                    className="slider-user"
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={progress.budget.user}
                    onChange={(e) => handleBudgetSlider("user", e.target.value)}
                  />
                </div>

                <div className="slider-row">
                  <div className="slider-label-row">
                    <span>Business Value</span>
                    <div className="budget-num-wrap">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        value={progress.budget.business}
                        onChange={(e) =>
                          handleBudgetDirectInput("business", e.target.value)
                        }
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <input
                    className="slider-business"
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={progress.budget.business}
                    onChange={(e) =>
                      handleBudgetSlider("business", e.target.value)
                    }
                  />
                </div>

                <div className="slider-row">
                  <div className="slider-label-row">
                    <span>Technology Build</span>
                    <div className="budget-num-wrap">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        value={progress.budget.tech}
                        onChange={(e) =>
                          handleBudgetDirectInput("tech", e.target.value)
                        }
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <input
                    className="slider-tech"
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={progress.budget.tech}
                    onChange={(e) => handleBudgetSlider("tech", e.target.value)}
                  />
                </div>
              </div>

              {isWhatDone && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "6px",
                  }}
                >
                  <button
                    className="btn-next-4a ready"
                    onClick={() => onTabChange("who")}
                  >
                    Continue to Who ➔
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "who" && (
          <div>
            <div className="panel-top-row">
              <div>
                <h3 className="panel-title">Stakeholder Engagement</h3>
                <p className="panel-help">
                  Choose the <strong>2 key stakeholder groups</strong> needed in
                  this stage and set their engagement role.
                </p>
              </div>
              <span className="step-counter">
                Engaged: {progress.stakeholders.length} / 2
              </span>
            </div>

            <div className="stakeholder-table">
              {StageData.stakeholderGroups.map((group) => {
                const pickedEntry = progress.stakeholders.find(
                  (s) => s.group === group,
                );
                return (
                  <div
                    key={group}
                    className={`stakeholder-row ${pickedEntry ? "active-row" : ""}`}
                  >
                    <div className="stakeholder-name">{group}</div>
                    <div className="stakeholder-roles">
                      {StageData.engagementRoles.map((role) => (
                        <button
                          key={role}
                          className={`role-chip ${
                            pickedEntry?.role === role ? "picked" : ""
                          }`}
                          onClick={() => toggleStakeholderRole(group, role)}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "how" && (
          <div>
            <div className="panel-top-row">
              <div>
                <h3 className="panel-title">Delivery &amp; Stage Documents</h3>
                <p className="panel-help">
                  Drag (or tap) the <strong>stage deliverable</strong> into the
                  active delivery slot below.
                </p>
              </div>
            </div>

            <div className="delivery-board">
              <div className="delivery-pool">
                {stage.options.map((opt) => (
                  <div
                    key={opt}
                    draggable
                    onDragStart={() => setDraggedDeliverable(opt)}
                    onClick={() =>
                      onUpdateProgress({ ...progress, deliverable: opt })
                    }
                    className={`delivery-token ${
                      progress.deliverable === opt ? "picked" : ""
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>

              <div
                className={`delivery-dropzone ${isHowDone ? "filled" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDropDeliverable}
              >
                {progress.deliverable ? (
                  <div>
                    <div className="drop-label">Active Stage Deliverable</div>
                    <div className="drop-value">{progress.deliverable}</div>
                  </div>
                ) : (
                  <div className="drop-placeholder">
                    Drop or tap the matching stage deliverable here
                  </div>
                )}
              </div>
            </div>

            <div className="docs-produced-bar">
              <div>
                <strong>Documents Produced in This Stage:</strong>{" "}
                {stage.documents.join(" • ")}
              </div>
              <button className="btn-tint" onClick={onOpenDocuments}>
                Open Stage Documents
              </button>
            </div>
          </div>
        )}

        {activeTab === "when" && (
          <div>
            <div className="panel-top-row">
              <div>
                <h3 className="panel-title">Timeline Window</h3>
                <p className="panel-help">
                  Select the <strong>delivery window</strong> where this stage
                  sits on the 12-month roadmap.
                </p>
              </div>
            </div>

            <div className="window-list">
              {stage.windows.map((winLabel) => (
                <button
                  key={winLabel}
                  className={`window-strip ${
                    progress.window === winLabel ? "picked" : ""
                  }`}
                  onClick={() =>
                    onUpdateProgress({ ...progress, window: winLabel })
                  }
                >
                  <span className="window-dot" />
                  <span>{winLabel}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "impact" && (
          <div>
            <div className="panel-top-row">
              <div>
                <h3 className="panel-title">Impact &amp; Outcome Board</h3>
                <p className="panel-help">
                  Drag the matching{" "}
                  <strong>Objective &amp; Key Results (OKR)</strong> card and{" "}
                  <strong>Key Performance Indicator (KPI)</strong> card across
                  the Kanban board into <strong>Done</strong>.
                </p>
              </div>
            </div>

            <div className="kanban-board-wrap">
              {/* Column 1: OKR Backlog */}
              <div className="kanban-col">
                <div className="kanban-col-head">
                  1. Objective &amp; Key Results (OKR)
                </div>
                {stage.outcomes.map((item) => {
                  if (progress.okrOutcome === item.id) return null;
                  return (
                    <div
                      key={`okr-${item.id}`}
                      draggable
                      onDragStart={() =>
                        setDraggedKanbanCard({ type: "okr", id: item.id })
                      }
                      className="kanban-card-draggable"
                    >
                      <span className="kanban-card-badge">OKR Card</span>
                      <p>{item.okr}</p>
                      <span className="kanban-drag-hint">⋮⋮ Drag to Done</span>
                    </div>
                  );
                })}
              </div>

              {/* Column 2: KPI Backlog */}
              <div className="kanban-col">
                <div className="kanban-col-head">
                  2. Key Performance Indicator (KPI)
                </div>
                {stage.outcomes.map((item) => {
                  if (progress.kpiOutcome === item.id) return null;
                  return (
                    <div
                      key={`kpi-${item.id}`}
                      draggable
                      onDragStart={() =>
                        setDraggedKanbanCard({ type: "kpi", id: item.id })
                      }
                      className="kanban-card-draggable"
                    >
                      <span className="kanban-card-badge">KPI Card</span>
                      <p>{item.kpi}</p>
                      <span className="kanban-drag-hint">⋮⋮ Drag to Done</span>
                    </div>
                  );
                })}
              </div>

              {/* Column 3: Done Dropzone */}
              <div
                className={`kanban-col done-col ${isImpactDone ? "complete" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDropKanban}
              >
                <div className="kanban-col-head">Done (Drop OKR &amp; KPI)</div>

                <div className="kanban-slot">
                  <div className="kanban-slot-label">Selected OKR</div>
                  {progress.okrOutcome ? (
                    (() => {
                      const chosenOkr = stage.outcomes.find(
                        (o) => o.id === progress.okrOutcome,
                      );
                      return chosenOkr ? (
                        <div className="kanban-card-done">
                          <p>{chosenOkr.okr}</p>
                          <button
                            className="ticket-remove"
                            onClick={() =>
                              onUpdateProgress({ ...progress, okrOutcome: "" })
                            }
                          >
                            Remove
                          </button>
                        </div>
                      ) : null;
                    })()
                  ) : (
                    <div className="kanban-slot-empty">Drop OKR card here</div>
                  )}
                </div>

                <div className="kanban-slot">
                  <div className="kanban-slot-label">Selected KPI</div>
                  {progress.kpiOutcome ? (
                    (() => {
                      const chosenKpi = stage.outcomes.find(
                        (o) => o.id === progress.kpiOutcome,
                      );
                      return chosenKpi ? (
                        <div className="kanban-card-done">
                          <p>{chosenKpi.kpi}</p>
                          <button
                            className="ticket-remove"
                            onClick={() =>
                              onUpdateProgress({ ...progress, kpiOutcome: "" })
                            }
                          >
                            Remove
                          </button>
                        </div>
                      ) : null;
                    })()
                  ) : (
                    <div className="kanban-slot-empty">Drop KPI card here</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
