import React, { useState } from "react";
import { StageData } from "./Data";

export default function Workspace({
  stage,
  progress,
  onUpdateProgress,
  onOpenDocuments,
}) {
  const [activeTab, setActiveTab] = useState("why");
  const [draggedDeliverable, setDraggedDeliverable] = useState(null);

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
  const isWhatDone = progress.move === stage.move && isBudgetClose;

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
  const isImpactDone = progress.outcome === validOutcomeId;

  const tabs = [
    { id: "why", step: "1. Why", sub: "Opportunity", done: isWhyDone },
    { id: "what", step: "2. What", sub: "Move & Budget", done: isWhatDone },
    { id: "who", step: "3. Who", sub: "Stakeholders", done: isWhoDone },
    { id: "how", step: "4. How", sub: "Delivery", done: isHowDone },
    { id: "when", step: "5. When", sub: "Timeline", done: isWhenDone },
    { id: "impact", step: "6. Impact", sub: "Measure", done: isImpactDone },
  ];

  const toggleFact = (factId) => {
    const exists = progress.facts.includes(factId);
    const updated = exists
      ? progress.facts.filter((id) => id !== factId)
      : progress.facts.length < 2
        ? [...progress.facts, factId]
        : [progress.facts[1], factId];
    onUpdateProgress({ ...progress, facts: updated });
  };

  const handleBudgetChange = (pillar, rawVal) => {
    const val = Math.max(0, Math.min(100, Number(rawVal)));
    const remaining = 100 - val;
    if (pillar === "user") {
      const otherTotal = progress.budget.business + progress.budget.tech;
      const bizShare =
        otherTotal > 0
          ? Math.round((progress.budget.business / otherTotal) * remaining)
          : Math.round(remaining / 2);
      onUpdateProgress({
        ...progress,
        budget: {
          user: val,
          business: bizShare,
          tech: remaining - bizShare,
        },
      });
    } else if (pillar === "business") {
      const otherTotal = progress.budget.user + progress.budget.tech;
      const userShare =
        otherTotal > 0
          ? Math.round((progress.budget.user / otherTotal) * remaining)
          : Math.round(remaining / 2);
      onUpdateProgress({
        ...progress,
        budget: {
          user: userShare,
          business: val,
          tech: remaining - userShare,
        },
      });
    } else {
      const otherTotal = progress.budget.user + progress.budget.business;
      const userShare =
        otherTotal > 0
          ? Math.round((progress.budget.user / otherTotal) * remaining)
          : Math.round(remaining / 2);
      onUpdateProgress({
        ...progress,
        budget: {
          user: userShare,
          business: remaining - userShare,
          tech: val,
        },
      });
    }
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
  return (
    <div className="workspace-box">
      <div className="tab-flow-bar">
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            <button
              className={`flow-tab-pill ${activeTab === tab.id ? "current" : ""} ${
                tab.done ? "completed" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
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
                  Pick the right <strong>Product Move</strong> and balance the{" "}
                  <strong>100% Budget Split</strong> across End-User, Business,
                  and Technology.
                </p>
              </div>
            </div>

            <div
              className={`move-callout-box ${progress.move ? "has-selection" : ""}`}
            >
              <div className="move-callout-header">
                <span>
                  Step 2A • Choose Strategic Product Move{" "}
                  {progress.move
                    ? `(Selected: ${progress.move})`
                    : "(Required)"}
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
              <div className="budget-bar-visual">
                <div
                  className="budget-seg user sheen"
                  style={{ width: `${progress.budget.user}%` }}
                />
                <div
                  className="budget-seg business sheen"
                  style={{ width: `${progress.budget.business}%` }}
                />
                <div
                  className="budget-seg tech sheen"
                  style={{ width: `${progress.budget.tech}%` }}
                />
              </div>

              <div className="budget-sliders">
                <label className="slider-row">
                  <span>
                    End-User Focus: <strong>{progress.budget.user}%</strong>
                  </span>
                  <input
                    className="slider-user"
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={progress.budget.user}
                    onChange={(e) => handleBudgetChange("user", e.target.value)}
                  />
                </label>

                <label className="slider-row">
                  <span>
                    Business Value: <strong>{progress.budget.business}%</strong>
                  </span>
                  <input
                    className="slider-business"
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={progress.budget.business}
                    onChange={(e) =>
                      handleBudgetChange("business", e.target.value)
                    }
                  />
                </label>

                <label className="slider-row">
                  <span>
                    Technology Build: <strong>{progress.budget.tech}%</strong>
                  </span>
                  <input
                    className="slider-tech"
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={progress.budget.tech}
                    onChange={(e) => handleBudgetChange("tech", e.target.value)}
                  />
                </label>
              </div>
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
                  sits on the 16-week roadmap.
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
                  Move the matching <strong>OKR &amp; KPI Benchmark</strong>{" "}
                  ticket across the Kanban board into <strong>Done</strong>.
                </p>
              </div>
            </div>

            <div className="kanban-outcome-grid">
              <div className="kanban-col">
                <div className="kanban-col-head">Backlog Options</div>
                {stage.outcomes.map((item) => {
                  const isDone = progress.outcome === item.id;
                  if (isDone) return null;
                  return (
                    <button
                      key={item.id}
                      className="kanban-ticket"
                      onClick={() =>
                        onUpdateProgress({ ...progress, outcome: item.id })
                      }
                    >
                      <div className="ticket-line">
                        <strong>OKR:</strong> {item.okr}
                      </div>
                      <div className="ticket-line">
                        <strong>KPI:</strong> {item.kpi}
                      </div>
                      <span className="ticket-action">Move to Done ➔</span>
                    </button>
                  );
                })}
              </div>

              <div
                className={`kanban-col done-col ${isImpactDone ? "complete" : ""}`}
              >
                <div className="kanban-col-head">Done</div>
                {progress.outcome ? (
                  (() => {
                    const chosen = stage.outcomes.find(
                      (o) => o.id === progress.outcome,
                    );
                    return chosen ? (
                      <div className="kanban-ticket active-ticket">
                        <div className="ticket-line">
                          <strong>OKR:</strong> {chosen.okr}
                        </div>
                        <div className="ticket-line">
                          <strong>KPI:</strong> {chosen.kpi}
                        </div>
                        <button
                          className="ticket-remove"
                          onClick={() =>
                            onUpdateProgress({ ...progress, outcome: "" })
                          }
                        >
                          Return to Backlog
                        </button>
                      </div>
                    ) : null;
                  })()
                ) : (
                  <div className="kanban-empty">
                    Select an OKR &amp; KPI ticket on the left to move it to
                    Done
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
