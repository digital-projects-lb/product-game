import React, { useState } from "react";
import { StageData } from "./Data";

const PILLAR_TAG_MAP = {
  CRR: "customer",
  NPS: "customer",
  CSAT: "customer",
  VOC: "customer",
  ARR: "business",
  MRR: "business",
  CAC: "business",
  CLV: "business",
  LTV: "business",
  NPV: "business",
  ROI: "business",
  SLT: "business",
  OKR: "business",
  KPI: "business",
  DAU: "tech",
  MAU: "tech",
  TTV: "tech",
  MVP: "tech",
  QA: "tech",
  UAT: "tech",
  API: "tech",
  SLA: "tech",
};

function detectPillar(text) {
  const upper = text.toUpperCase();
  for (const [key, group] of Object.entries(PILLAR_TAG_MAP)) {
    if (upper.includes(key)) return group;
  }
  if (
    upper.includes("CUSTOMER") ||
    upper.includes("RETENTION") ||
    upper.includes("CHURN")
  ) {
    return "customer";
  }
  if (
    upper.includes("REVENUE") ||
    upper.includes("COST") ||
    upper.includes("VALUE")
  ) {
    return "business";
  }
  return "tech";
}

export default function Calculator({ onClose }) {
  const [viewMode, setViewMode] = useState("calculator");
  const [pillar, setPillar] = useState("customer");
  const [refFilter, setRefFilter] = useState("all");
  const [refSearch, setRefSearch] = useState("");

  // Customer Pillar
  const [startingCustomers, setStartingCustomers] = useState(500);
  const [endingCustomers, setEndingCustomers] = useState(520);
  const [retainedNewCustomers, setRetainedNewCustomers] = useState(50);
  const [promotersPct, setPromotersPct] = useState(58);
  const [detractorsPct, setDetractorsPct] = useState(14);

  // Business Pillar
  const [mrr, setMrr] = useState(12500);
  const [marketingSpend, setMarketingSpend] = useState(15000);
  const [newCustomers, setNewCustomers] = useState(50);
  const [avgPurchase, setAvgPurchase] = useState(120);
  const [purchaseFrequency, setPurchaseFrequency] = useState(4);
  const [customerLifespan, setCustomerLifespan] = useState(2.5);

  // Tech Pillar
  const [dailyUsers, setDailyUsers] = useState(320);
  const [monthlyUsers, setMonthlyUsers] = useState(1200);
  const [newSignups, setNewSignups] = useState(400);
  const [onboardedUsers, setOnboardedUsers] = useState(220);
  const [targetActions, setTargetActions] = useState(180);
  const [totalVisitors, setTotalVisitors] = useState(2000);

  const retentionRate =
    startingCustomers > 0
      ? Math.max(
          0,
          Math.min(
            100,
            ((endingCustomers - retainedNewCustomers) / startingCustomers) * 100
          )
        )
      : 0;
  const churnRate = Math.max(0, 100 - retentionRate);
  const npsScore = promotersPct - detractorsPct;

  const arrValue = mrr * 12;
  const cacValue = newCustomers > 0 ? marketingSpend / newCustomers : 0;
  const clvValue = avgPurchase * purchaseFrequency * customerLifespan;
  const clvToCac = cacValue > 0 ? clvValue / cacValue : 0;

  const stickinessRate =
    monthlyUsers > 0 ? Math.min(100, (dailyUsers / monthlyUsers) * 100) : 0;
  const activationRate =
    newSignups > 0 ? Math.min(100, (onboardedUsers / newSignups) * 100) : 0;
  const conversionRate =
    totalVisitors > 0 ? Math.min(100, (targetActions / totalVisitors) * 100) : 0;

  const combinedReferenceItems = [
    ...StageData.formulas.map((f) => ({
      kind: "Formula",
      term: f.name,
      detail: f.formula,
      pillar: detectPillar(`${f.name} ${f.formula}`),
    })),
    ...StageData.acronyms.map((a) => ({
      kind: "Acronym",
      term: a.term,
      detail: a.meaning,
      pillar: detectPillar(`${a.term} ${a.meaning}`),
    })),
  ];

  const filteredReference = combinedReferenceItems.filter((item) => {
    const matchesPillar = refFilter === "all" || item.pillar === refFilter;
    const q = refSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.term.toLowerCase().includes(q) ||
      item.detail.toLowerCase().includes(q);
    return matchesPillar && matchesSearch;
  });

  const handlePrintGuide = () => {
    const win = window.open("", "_blank", "width=880,height=920");
    if (!win) return;

    const customerRows = combinedReferenceItems
      .filter((i) => i.pillar === "customer")
      .map(
        (i) =>
          `<div class="cell-item"><span class="term">${i.term}:</span> ${i.detail}</div>`
      )
      .join("");
    const businessRows = combinedReferenceItems
      .filter((i) => i.pillar === "business")
      .map(
        (i) =>
          `<div class="cell-item"><span class="term">${i.term}:</span> ${i.detail}</div>`
      )
      .join("");
    const techRows = combinedReferenceItems
      .filter((i) => i.pillar === "tech")
      .map(
        (i) =>
          `<div class="cell-item"><span class="term">${i.term}:</span> ${i.detail}</div>`
      )
      .join("");

    win.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>3-Pillar Metrics &amp; Acronym Reference — Product Path</title>
          <link href="https://googleapis.com" rel="stylesheet" />
          <style>
            body { font-family: 'Raleway', sans-serif; font-weight: 300; color: #3e2f26; padding: 32px; line-height: 1.6; }
            .header { background: #faf8f4; padding: 18px 22px; border: 1px solid #dcd6ca; border-top: 3px solid #dfc3a6; border-radius: 10px; margin-bottom: 20px; }
            h1 { font-size: 20px; font-weight: 400; margin: 0 0 4px 0; }
            table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 12px; }
            th { text-align: left; padding: 10px 12px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.07em; background: #faf8f4; border: 1px solid #dcd6ca; }
            th.oat { border-top: 3.5px solid #cbb994; }
            th.baltic { border-top: 3.5px solid #89a8ba; }
            th.lichen { border-top: 3.5px solid #97b09f; }
            td { vertical-align: top; padding: 12px; border: 1px solid #dcd6ca; }
            .cell-item { padding: 6px 0; border-bottom: 1px solid #efece6; }
            .cell-item:last-child { border-bottom: none; }
            .term { font-weight: 400; color: #3e2f26; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>3-Pillar Product Metrics, Formulas &amp; Acronyms</h1>
            <div style="font-size:12px;color:#756558;">Product Path • Customer, Business &amp; Technology Reference Table</div>
          </div>
          <table>
            <thead>
              <tr>
                <th class="oat">Customer Pillar</th>
                <th class="baltic">Business Pillar</th>
                <th class="lichen">Technology Pillar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${customerRows}</td>
                <td>${businessRows}</td>
                <td>${techRows}</td>
              </tr>
            </tbody>
          </table>
          <script>window.onload = () => { setTimeout(() => window.print(), 300); };</script>
        </body>
      </html>
    `);
    win.document.close();
  };
  return (
    <div className="modal-overlay">
      <div className="modal-panel">
        <div className="modal-header">
          <div>
            <span className="modal-kicker">Product Path • Metrics Toolkit</span>
            <h2 className="modal-title">KPI Calculator &amp; Acronym Guide</h2>
          </div>
          <button className="nav-link-clean" onClick={onClose}>
            ✕ Close
          </button>
        </div>

        <div className="modal-tabs">
          <button
            className={`light-tab oat ${viewMode === "calculator" ? "active" : ""}`}
            onClick={() => setViewMode("calculator")}
          >
            3-Pillar Calculator
          </button>
          <button
            className={`light-tab baltic ${viewMode === "reference" ? "active" : ""}`}
            onClick={() => setViewMode("reference")}
          >
            Acronym &amp; Formula Reference
          </button>
        </div>

        <div className="modal-body">
          {viewMode === "calculator" ? (
            <div>
              <div className="light-tabs" style={{ marginBottom: "20px" }}>
                <button
                  className={`light-tab oat ${pillar === "customer" ? "active" : ""}`}
                  onClick={() => setPillar("customer")}
                >
                  1. Customer &amp; Retention
                </button>
                <button
                  className={`light-tab baltic ${pillar === "business" ? "active" : ""}`}
                  onClick={() => setPillar("business")}
                >
                  2. Business &amp; Revenue
                </button>
                <button
                  className={`light-tab lichen ${pillar === "tech" ? "active" : ""}`}
                  onClick={() => setPillar("tech")}
                >
                  3. Tech &amp; Adoption
                </button>
              </div>

              {pillar === "customer" && (
                <div className="calc-pillar-split">
                  <div className="calc-fields">
                    <label>
                      Starting Customers
                      <input
                        type="number"
                        value={startingCustomers}
                        onChange={(e) =>
                          setStartingCustomers(Number(e.target.value))
                        }
                      />
                    </label>
                    <label>
                      Ending Customers
                      <input
                        type="number"
                        value={endingCustomers}
                        onChange={(e) =>
                          setEndingCustomers(Number(e.target.value))
                        }
                      />
                    </label>
                    <label>
                      New Customers Added
                      <input
                        type="number"
                        value={retainedNewCustomers}
                        onChange={(e) =>
                          setRetainedNewCustomers(Number(e.target.value))
                        }
                      />
                    </label>
                    <label>
                      Promoters (%) vs. Detractors (%)
                      <div className="calc-inline-inputs">
                        <input
                          type="number"
                          value={promotersPct}
                          onChange={(e) =>
                            setPromotersPct(Number(e.target.value))
                          }
                        />
                        <input
                          type="number"
                          value={detractorsPct}
                          onChange={(e) =>
                            setDetractorsPct(Number(e.target.value))
                          }
                        />
                      </div>
                    </label>
                  </div>

                  <div className="gloss-chart-box">
                    <div className="tag">Retention, Churn &amp; NPS</div>
                    <div className="gloss-chart-bars">
                      <div className="gloss-col">
                        <span className="gloss-val">
                          {retentionRate.toFixed(0)}%
                        </span>
                        <div
                          className="gloss-bar sheen"
                          style={{
                            height: `${Math.max(12, retentionRate)}%`,
                            backgroundColor: "var(--oat)",
                          }}
                        />
                        <span className="gloss-lbl">CRR</span>
                      </div>
                      <div className="gloss-col">
                        <span className="gloss-val">
                          {churnRate.toFixed(0)}%
                        </span>
                        <div
                          className="gloss-bar sheen"
                          style={{
                            height: `${Math.max(12, churnRate)}%`,
                            backgroundColor: "var(--baltic)",
                          }}
                        />
                        <span className="gloss-lbl">Churn</span>
                      </div>
                      <div className="gloss-col">
                        <span className="gloss-val">
                          {npsScore > 0 ? `+${npsScore}` : npsScore}
                        </span>
                        <div
                          className="gloss-bar sheen"
                          style={{
                            height: `${Math.max(12, Math.min(100, Math.abs(npsScore)))}%`,
                            backgroundColor: "var(--lichen)",
                          }}
                        />
                        <span className="gloss-lbl">NPS</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {pillar === "business" && (
                <div className="calc-pillar-split">
                  <div className="calc-fields">
                    <label>
                      Monthly Recurring Revenue ($)
                      <input
                        type="number"
                        value={mrr}
                        onChange={(e) => setMrr(Number(e.target.value))}
                      />
                    </label>
                    <label>
                      Sales &amp; Marketing Spend ($)
                      <input
                        type="number"
                        value={marketingSpend}
                        onChange={(e) =>
                          setMarketingSpend(Number(e.target.value))
                        }
                      />
                    </label>
                    <label>
                      New Customers Won
                      <input
                        type="number"
                        value={newCustomers}
                        onChange={(e) =>
                          setNewCustomers(Number(e.target.value))
                        }
                      />
                    </label>
                    <label>
                      Avg Purchase ($) × Freq/Yr × Years
                      <div className="calc-inline-inputs">
                        <input
                          type="number"
                          value={avgPurchase}
                          onChange={(e) =>
                            setAvgPurchase(Number(e.target.value))
                          }
                        />
                        <input
                          type="number"
                          value={purchaseFrequency}
                          onChange={(e) =>
                            setPurchaseFrequency(Number(e.target.value))
                          }
                        />
                        <input
                          type="number"
                          step="0.5"
                          value={customerLifespan}
                          onChange={(e) =>
                            setCustomerLifespan(Number(e.target.value))
                          }
                        />
                      </div>
                    </label>
                  </div>

                  <div className="gloss-chart-box">
                    <div className="tag">
                      ARR: ${arrValue.toLocaleString()} • Ratio:{" "}
                      {clvToCac.toFixed(1)} : 1
                    </div>
                    <div className="gloss-chart-bars">
                      <div className="gloss-col">
                        <span className="gloss-val">
                          ${cacValue.toFixed(0)}
                        </span>
                        <div
                          className="gloss-bar sheen"
                          style={{
                            height: `${Math.min(100, Math.max(14, (cacValue / Math.max(1, clvValue)) * 100))}%`,
                            backgroundColor: "var(--lichen)",
                          }}
                        />
                        <span className="gloss-lbl">CAC</span>
                      </div>
                      <div className="gloss-col">
                        <span className="gloss-val">
                          ${clvValue.toLocaleString()}
                        </span>
                        <div
                          className="gloss-bar sheen"
                          style={{
                            height: "86%",
                            backgroundColor: "var(--oat)",
                          }}
                        />
                        <span className="gloss-lbl">CLV</span>
                      </div>
                      <div className="gloss-col">
                        <span className="gloss-val">
                          {clvToCac.toFixed(1)}x
                        </span>
                        <div
                          className="gloss-bar sheen"
                          style={{
                            height: `${Math.min(100, Math.max(15, clvToCac * 20))}%`,
                            backgroundColor: "var(--baltic)",
                          }}
                        />
                        <span className="gloss-lbl">CLV:CAC</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {pillar === "tech" && (
                <div className="calc-pillar-split">
                  <div className="calc-fields">
                    <label>
                      Daily Users (DAU) / Monthly Users (MAU)
                      <div className="calc-inline-inputs">
                        <input
                          type="number"
                          value={dailyUsers}
                          onChange={(e) => setDailyUsers(Number(e.target.value))}
                        />
                        <input
                          type="number"
                          value={monthlyUsers}
                          onChange={(e) =>
                            setMonthlyUsers(Number(e.target.value))
                          }
                        />
                      </div>
                    </label>
                    <label>
                      Onboarded Users / New Sign-Ups
                      <div className="calc-inline-inputs">
                        <input
                          type="number"
                          value={onboardedUsers}
                          onChange={(e) =>
                            setOnboardedUsers(Number(e.target.value))
                          }
                        />
                        <input
                          type="number"
                          value={newSignups}
                          onChange={(e) => setNewSignups(Number(e.target.value))}
                        />
                      </div>
                    </label>
                    <label>
                      Target Actions / Total Visitors
                      <div className="calc-inline-inputs">
                        <input
                          type="number"
                          value={targetActions}
                          onChange={(e) =>
                            setTargetActions(Number(e.target.value))
                          }
                        />
                        <input
                          type="number"
                          value={totalVisitors}
                          onChange={(e) =>
                            setTotalVisitors(Number(e.target.value))
                          }
                        />
                      </div>
                    </label>
                  </div>

                  <div className="gloss-chart-box">
                    <div className="tag">Adoption, Activation &amp; Funnel</div>
                    <div className="gloss-chart-bars">
                      <div className="gloss-col">
                        <span className="gloss-val">
                          {stickinessRate.toFixed(0)}%
                        </span>
                        <div
                          className="gloss-bar sheen"
                          style={{
                            height: `${Math.max(12, stickinessRate)}%`,
                            backgroundColor: "var(--lichen)",
                          }}
                        />
                        <span className="gloss-lbl">Stickiness</span>
                      </div>
                      <div className="gloss-col">
                        <span className="gloss-val">
                          {activationRate.toFixed(0)}%
                        </span>
                        <div
                          className="gloss-bar sheen"
                          style={{
                            height: `${Math.max(12, activationRate)}%`,
                            backgroundColor: "var(--oat)",
                          }}
                        />
                        <span className="gloss-lbl">Activation</span>
                      </div>
                      <div className="gloss-col">
                        <span className="gloss-val">
                          {conversionRate.toFixed(0)}%
                        </span>
                        <div
                          className="gloss-bar sheen"
                          style={{
                            height: `${Math.max(12, conversionRate)}%`,
                            backgroundColor: "var(--baltic)",
                          }}
                        />
                        <span className="gloss-lbl">Conversion</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="ref-header-row">
                <div className="ref-filter-bar">
                  <input
                    type="text"
                    className="ref-search-input"
                    placeholder="Search acronyms or formulas (e.g. ARR, CRR, NPS)..."
                    value={refSearch}
                    onChange={(e) => setRefSearch(e.target.value)}
                  />
                  <div className="ref-pill-group">
                    <button
                      className={`ref-filter-pill ${refFilter === "all" ? "active" : ""}`}
                      onClick={() => setRefFilter("all")}
                    >
                      All Metrics
                    </button>
                    <button
                      className={`ref-filter-pill oat ${refFilter === "customer" ? "active" : ""}`}
                      onClick={() => setRefFilter("customer")}
                    >
                      Customer
                    </button>
                    <button
                      className={`ref-filter-pill baltic ${refFilter === "business" ? "active" : ""}`}
                      onClick={() => setRefFilter("business")}
                    >
                      Business
                    </button>
                    <button
                      className={`ref-filter-pill lichen ${refFilter === "tech" ? "active" : ""}`}
                      onClick={() => setRefFilter("tech")}
                    >
                      Tech
                    </button>
                  </div>
                </div>
                <button className="nav-link-clean" onClick={handlePrintGuide}>
                  ⬇ Save 3-Pillar PDF
                </button>
              </div>

              <div className="ref-lookup-list">
                {filteredReference.length > 0 ? (
                  filteredReference.map((item, idx) => (
                    <div key={idx} className={`ref-lookup-row ${item.pillar}`}>
                      <div className="ref-lookup-term">
                        {item.term}
                        <span className="ref-kind-tag">{item.kind}</span>
                      </div>
                      <div className="ref-lookup-detail">{item.detail}</div>
                    </div>
                  ))
                ) : (
                  <div className="ref-empty">
                    No matching metrics or acronyms found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
