export const StageData = {
  stages: {
    1: {
      title: "Stage 01: Concept",
      label: "1. Concept",
      timeline: "Weeks 1–2",
      window: "Weeks 1–2 (Concept Review)",
      clue: "1. Why: Pick 45% sign-up drop-off & competitor self-serve.\n2. What: New Build (Self-Serve) • Budget: 50% End-User / 35% Business / 15% Technology.\n3. Who: End-Users (Peer / Subject Matter Expert) & SLT (Sign-Off).\n4. How: Approved opportunity summary to kick off discovery.\n5. When: Weeks 1–2 (Concept Review) • 6. Impact: Formal SLT approval & ≥ 70% surveyed users OKR.",
      facts: [
        {
          id: "f1",
          text: "Customer drop-off during sign-up is rising (currently 45%), driving up our Churn Rate.",
          valid: true,
        },
        {
          id: "f2",
          text: "Our top three competitors already offer an easy self-serve sign-up option.",
          valid: true,
        },
        {
          id: "f3",
          text: "One regional sales manager requested a custom dark-mode dashboard theme.",
          valid: false,
        },
        {
          id: "f4",
          text: "Internal newsletter open rates dipped slightly last quarter.",
          valid: false,
        },
      ],
      move: "New Build (Self-Serve)",
      moves: [
        "New Build (Self-Serve)",
        "UX / Flow Discovery",
        "UX / Flow Refine",
        "Operational Readiness",
        "Decommission / Optimize",
      ],
      budget: { user: 50, business: 35, tech: 15 },
      stakeholders: [
        { group: "End-Users", role: "Peer / Subject Matter Expert" },
        { group: "SLT", role: "Sign-Off" },
      ],
      deliverable: "Approved opportunity summary to kick off discovery",
      options: [
        "Approved opportunity summary to kick off discovery",
        "Working software built and demoed every two weeks",
        "Public release notes and live adoption report",
      ],
      documents: ["Product Brief", "Opportunity Assessment"],
      windows: [
        "Weeks 1–2 (Concept Review)",
        "Weeks 6–7 (Specification Check)",
        "Week 15 (Release Week)",
      ],
      okr: "Get everyone on the same page about the problem before spending money on research.",
      kpi: "Formal SLT approval on the problem statement, and at least 70% of surveyed users confirm sign-up hurdles are a major issue.",
      outcomes: [
        {
          id: "o1",
          okr: "Get everyone on the same page about the problem before spending money on research.",
          kpi: "Formal SLT approval on the problem statement, and at least 70% of surveyed users confirm sign-up hurdles are a major issue.",
          valid: true,
        },
        {
          id: "o2",
          okr: "Ship full production code before talking to customers.",
          kpi: "100% of backend APIs deployed in Week 1.",
          valid: false,
        },
        {
          id: "o3",
          okr: "Redesign the company brand logo across all marketing channels.",
          kpi: "50,000 social media impressions in two days.",
          valid: false,
        },
      ],
      template: `PRODUCT BRIEF & OPPORTUNITY ASSESSMENT
Stage: 01 Concept | Timeline: Weeks 1–2

1. PROBLEM STATEMENT
Customer drop-off during sign-up has reached 45%, increasing Churn Rate while top competitors offer self-serve onboarding.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: New Build (Self-Serve)
Budget Allocation: 50% End-User | 35% Business | 15% Technology

3. STAKEHOLDER ALIGNMENT
• End-Users: Peer / Subject Matter Expert
• SLT: Sign-Off

4. TARGET OKR & KPI BENCHMARK
OKR: Get everyone on the same page about the problem before spending money on research.
KPI: Formal SLT approval on the problem statement, and ≥ 70% of surveyed users confirm sign-up hurdles are a major issue.`,
    },
    2: {
      title: "Stage 02: Discovery",
      label: "2. Discovery",
      timeline: "Weeks 3–4",
      window: "Weeks 3–4 (Research Sprint)",
      clue: "1. Why: Pick 12 End-User interviews & 40% repeat support tickets.\n2. What: UX / Flow Discovery • Budget: 60% End-User / 20% Business / 20% Technology.\n3. Who: End-Users (Peer / Subject Matter Expert) & Product & UX (Scrum Team).\n4. How: Tested clickable design of the new self-serve flow.\n5. When: Weeks 3–4 (Research Sprint) • 6. Impact: ≥ 80% prototype completion OKR.",
      facts: [
        {
          id: "f1",
          text: "12 End-User interviews show the manual process is too slow, delaying Time to Value (TTV).",
          valid: true,
        },
        {
          id: "f2",
          text: "Support logs show 40% of help tickets are repeat questions about how to sign up.",
          valid: true,
        },
        {
          id: "f3",
          text: "Server CPU usage peaked at 35% during Tuesday afternoon backups.",
          valid: false,
        },
        {
          id: "f4",
          text: "Finance prefers annual billing invoices to be sent on Fridays.",
          valid: false,
        },
      ],
      move: "UX / Flow Discovery",
      moves: [
        "New Build (Self-Serve)",
        "UX / Flow Discovery",
        "New Build (Investment Approval)",
        "Operational Readiness",
        "Decommission / Optimize",
      ],
      budget: { user: 60, business: 20, tech: 20 },
      stakeholders: [
        { group: "End-Users", role: "Peer / Subject Matter Expert" },
        { group: "Product & UX", role: "Scrum Team" },
      ],
      deliverable: "Tested clickable design of the new self-serve flow",
      options: [
        "Tested clickable design of the new self-serve flow",
        "Final security penetration audit and legal sign-off",
        "30-day post-launch cohort retention review",
      ],
      documents: [
        "Discovery Summary Report",
        "User Interview Notes",
        "Clickable Prototype",
      ],
      windows: [
        "Weeks 3–4 (Research Sprint)",
        "Week 8 (Pre-Sprint Check)",
        "Week 13 (Quality Check)",
      ],
      okr: "Find where users get stuck and test a simple self-serve prototype with real people.",
      kpi: "At least 80% of test users complete the prototype without help across 8 or more sessions.",
      outcomes: [
        {
          id: "o1",
          okr: "Find where users get stuck and test a simple self-serve prototype with real people.",
          kpi: "At least 80% of test users complete the prototype without help across 8 or more sessions.",
          valid: true,
        },
        {
          id: "o2",
          okr: "Lock in final database schema without testing user flows.",
          kpi: "Zero UI changes allowed after Week 3.",
          valid: false,
        },
        {
          id: "o3",
          okr: "Write public press releases before validating the prototype.",
          kpi: "Three media briefings scheduled in Week 4.",
          valid: false,
        },
      ],
      template: `DISCOVERY SUMMARY REPORT
Stage: 02 Discovery | Timeline: Weeks 3–4

1. RESEARCH FINDINGS
12 End-User interviews confirmed manual onboarding delays Time to Value (TTV), and 40% of support tickets stem from sign-up confusion.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: UX / Flow Discovery
Budget Allocation: 60% End-User | 20% Business | 20% Technology

3. STAKEHOLDER ALIGNMENT
• End-Users: Peer / Subject Matter Expert
• Product & UX: Scrum Team

4. TARGET OKR & KPI BENCHMARK
OKR: Find where users get stuck and test a simple self-serve prototype with real people.
KPI: ≥ 80% of test users complete the prototype without help across 8 or more sessions.`,
    },
    3: {
      title: "Stage 03: Business Case",
      label: "3. Business Case",
      timeline: "Week 5",
      window: "Week 5 (Funding Check)",
      clue: "1. Why: Pick 18-month payback & 15% lift in Customer Retention Rate (CRR).\n2. What: New Build (Investment Approval) • Budget: 20% End-User / 60% Business / 20% Technology.\n3. Who: SLT (Sign-Off) & Finance & Operations (Peer / Subject Matter Expert).\n4. How: Approved budget and commercial forecast.\n5. When: Week 5 (Funding Check) • 6. Impact: Projected CLV:CAC ratio of 3:1 or higher OKR.",
      facts: [
        {
          id: "f1",
          text: "Financial forecasts show the project will pay for itself in 18 months.",
          valid: true,
        },
        {
          id: "f2",
          text: "Commercial models project a 15% lift in Customer Retention Rate (CRR) and higher Customer Lifetime Value (CLV).",
          valid: true,
        },
        {
          id: "f3",
          text: "The design team prefers rounded corners on form input fields.",
          valid: false,
        },
        {
          id: "f4",
          text: "Staging test environments refresh automatically every Sunday night.",
          valid: false,
        },
      ],
      move: "New Build (Investment Approval)",
      moves: [
        "UX / Flow Discovery",
        "New Build (Investment Approval)",
        "New Build (Scoping)",
        "UX / Flow Refine",
        "Decommission / Optimize",
      ],
      budget: { user: 20, business: 60, tech: 20 },
      stakeholders: [
        { group: "SLT", role: "Sign-Off" },
        { group: "Finance & Operations", role: "Peer / Subject Matter Expert" },
      ],
      deliverable: "Approved budget and commercial forecast",
      options: [
        "Approved budget and commercial forecast",
        "Automated unit test suite and code coverage report",
        "Customer support training playbook",
      ],
      documents: ["Commercial Business Case", "Financial Return Forecast"],
      windows: [
        "Week 5 (Funding Check)",
        "Weeks 9–12 (Build Sprints)",
        "Week 16+ (Post-Launch)",
      ],
      okr: "Secure build funding by proving the project will make money over three years and lower Customer Acquisition Cost (CAC).",
      kpi: "Projected CLV:CAC ratio of 3:1 or higher, at least 15% projected ARR growth, and SLT budget approval within 5 business days.",
      outcomes: [
        {
          id: "o1",
          okr: "Secure build funding by proving the project will make money over three years and lower Customer Acquisition Cost (CAC).",
          kpi: "Projected CLV:CAC ratio of 3:1 or higher, at least 15% projected ARR growth, and SLT budget approval within 5 business days.",
          valid: true,
        },
        {
          id: "o2",
          okr: "Request unlimited open-ended budget without financial targets.",
          kpi: "Spend 100% of departmental funds within 30 days.",
          valid: false,
        },
        {
          id: "o3",
          okr: "Focus solely on internal code refactoring with zero customer metrics.",
          kpi: "Reduce stylesheet file size by 15%.",
          valid: false,
        },
      ],
      template: `COMMERCIAL BUSINESS CASE
Stage: 03 Business Case | Timeline: Week 5

1. COMMERCIAL JUSTIFICATION
18-month payback period with a projected 15% lift in Customer Retention Rate (CRR) and stronger Customer Lifetime Value (CLV).

2. PRODUCT MOVE & BUDGET SPLIT
Direction: New Build (Investment Approval)
Budget Allocation: 20% End-User | 60% Business | 20% Technology

3. STAKEHOLDER ALIGNMENT
• SLT: Sign-Off
• Finance & Operations: Peer / Subject Matter Expert

4. TARGET OKR & KPI BENCHMARK
OKR: Secure build funding by proving the project will make money over three years and lower CAC.
KPI: Projected CLV:CAC ≥ 3:1, ≥ 15% ARR growth, and SLT approval within 5 business days.`,
    },
    4: {
      title: "Stage 04: Product Specs",
      label: "4. Product Specs",
      timeline: "Weeks 6–7",
      window: "Weeks 6–7 (Specification Check)",
      clue: "1. Why: Pick finalized prototype feedback & core user stories.\n2. What: New Build (Scoping) • Budget: 40% End-User / 20% Business / 40% Technology.\n3. Who: Product & UX (Scrum Team) & Engineering (Scrum Team).\n4. How: Clear, step-by-step build instructions for developers.\n5. When: Weeks 6–7 (Specification Check) • 6. Impact: All MVP user stories estimated OKR.",
      facts: [
        {
          id: "f1",
          text: "Prototype testing feedback is finalized and ready to use.",
          valid: true,
        },
        {
          id: "f2",
          text: "Core user stories, edge cases, and rules for completion are written down.",
          valid: true,
        },
        {
          id: "f3",
          text: "Competitor marketing campaigns launched on LinkedIn this week.",
          valid: false,
        },
        {
          id: "f4",
          text: "Office Wi-Fi routers are scheduled for firmware upgrades next month.",
          valid: false,
        },
      ],
      move: "New Build (Scoping)",
      moves: [
        "New Build (Self-Serve)",
        "New Build (Scoping)",
        "New Build (Architecture)",
        "Operational Readiness",
        "Decommission / Optimize",
      ],
      budget: { user: 40, business: 20, tech: 40 },
      stakeholders: [
        { group: "Product & UX", role: "Scrum Team" },
        { group: "Engineering", role: "Scrum Team" },
      ],
      deliverable: "Clear, step-by-step build instructions for developers",
      options: [
        "Clear, step-by-step build instructions for developers",
        "Phased rollout health monitor and live uptime log",
        "Initial opportunity assessment for SLT",
      ],
      documents: [
        "Product Requirements Document (PRD)",
        "Prioritized Product Backlog",
      ],
      windows: [
        "Weeks 6–7 (Specification Check)",
        "Weeks 1–2 (Concept Review)",
        "Week 14 (Readiness Check)",
      ],
      okr: "Turn validated user designs into clear, practical instructions that developers can build right away.",
      kpi: "All MVP user stories estimated and accepted by Engineering with no unclear requirements holding up work.",
      outcomes: [
        {
          id: "o1",
          okr: "Turn validated user designs into clear, practical instructions that developers can build right away.",
          kpi: "All MVP user stories estimated and accepted by Engineering with no unclear requirements holding up work.",
          valid: true,
        },
        {
          id: "o2",
          okr: "Leave edge cases undefined until after customer launch.",
          kpi: "Zero acceptance criteria written prior to Sprint 1.",
          valid: false,
        },
        {
          id: "o3",
          okr: "Add unvalidated nice-to-have features to double MVP scope.",
          kpi: "Increase initial build timeline from 4 weeks to 16 weeks.",
          valid: false,
        },
      ],
      template: `PRODUCT REQUIREMENTS DOCUMENT (PRD)
Stage: 04 Product Specs | Timeline: Weeks 6–7

1. SPECIFICATION SCOPE
Validated prototype flows translated into prioritized MVP user stories, edge cases, and clear acceptance criteria.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: New Build (Scoping)
Budget Allocation: 40% End-User | 20% Business | 40% Technology

3. STAKEHOLDER ALIGNMENT
• Product & UX: Scrum Team
• Engineering: Scrum Team

4. TARGET OKR & KPI BENCHMARK
OKR: Turn validated user designs into clear, practical instructions that developers can build right away.
KPI: All MVP user stories estimated and accepted by Engineering with zero unclear requirements.`,
    },
    5: {
      title: "Stage 05: Tech Review",
      label: "5. Tech Review",
      timeline: "Week 8",
      window: "Week 8 (Pre-Sprint Check)",
      clue: "1. Why: Pick speed/privacy standards & CRM/billing dependencies.\n2. What: New Build (Architecture) • Budget: 10% End-User / 20% Business / 70% Technology.\n3. Who: Engineering (Scrum Team) & Legal, Security & Risk (Sign-Off).\n4. How: Formal technical and compliance approval to start coding.\n5. When: Week 8 (Pre-Sprint Check) • 6. Impact: Zero unresolved high-risk security issues OKR.",
      facts: [
        {
          id: "f1",
          text: "Technical assessments confirm the proposed architecture meets enterprise speed, security, and data privacy standards.",
          valid: true,
        },
        {
          id: "f2",
          text: "Integration dependencies across existing CRM and billing platforms are fully documented and mapped.",
          valid: true,
        },
        {
          id: "f3",
          text: "Customer support agents requested ergonomic desk chairs.",
          valid: false,
        },
        {
          id: "f4",
          text: "Blog traffic increased 8% following last month's webinar.",
          valid: false,
        },
      ],
      move: "New Build (Architecture)",
      moves: [
        "UX / Flow Discovery",
        "New Build (Scoping)",
        "New Build (Architecture)",
        "UX / Flow Refine",
        "New Build (Release)",
      ],
      budget: { user: 10, business: 20, tech: 70 },
      stakeholders: [
        { group: "Engineering", role: "Scrum Team" },
        { group: "Legal, Security & Risk", role: "Sign-Off" },
      ],
      deliverable: "Formal technical and compliance approval to start coding",
      options: [
        "Formal technical and compliance approval to start coding",
        "Customer interview synthesis and clickable wireframe",
        "30-day cohort retention and NPS review",
      ],
      documents: [
        "Technical Architecture Diagram",
        "Security & Privacy Impact Assessment",
      ],
      windows: [
        "Week 8 (Pre-Sprint Check)",
        "Weeks 3–4 (Research Sprint)",
        "Week 15 (Release Week)",
      ],
      okr: "Make sure the system design is safe, fast, and follows all privacy rules before writing code.",
      kpi: "Zero unresolved high-risk security or privacy issues, and all third-party system connections mapped.",
      outcomes: [
        {
          id: "o1",
          okr: "Make sure the system design is safe, fast, and follows all privacy rules before writing code.",
          kpi: "Zero unresolved high-risk security or privacy issues, and all third-party system connections mapped.",
          valid: true,
        },
        {
          id: "o2",
          okr: "Bypass privacy impact reviews to save two days of schedule.",
          kpi: "Deploy customer data storage without encryption checks.",
          valid: false,
        },
        {
          id: "o3",
          okr: "Build a separate standalone billing database disconnected from CRM.",
          kpi: "Require manual CSV uploads every night.",
          valid: false,
        },
      ],
      template: `TECHNICAL ARCHITECTURE & RISK SIGN-OFF
Stage: 05 Tech Review | Timeline: Week 8

1. ARCHITECTURE & COMPLIANCE READINESS
System design verified for speed, data privacy compliance, and CRM/billing platform integrations.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: New Build (Architecture)
Budget Allocation: 10% End-User | 20% Business | 70% Technology

3. STAKEHOLDER ALIGNMENT
• Engineering: Scrum Team
• Legal, Security & Risk: Sign-Off

4. TARGET OKR & KPI BENCHMARK
OKR: Make sure the system design is safe, fast, and follows all privacy rules before writing code.
KPI: Zero unresolved high-risk security or privacy issues, and all system connections mapped.`,
    },
    6: {
      title: "Stage 06: Sprints",
      label: "6. Sprints",
      timeline: "Weeks 9–12",
      window: "Weeks 9–12 (Build Sprints)",
      clue: "1. Why: Pick ranked MVP stories & agreed sprint goals.\n2. What: New Build (Execution) • Budget: 20% End-User / 15% Business / 65% Technology.\n3. Who: Engineering (Scrum Team) & Product & UX (Scrum Team).\n4. How: Working software built and demoed every two weeks.\n5. When: Weeks 9–12 (Build Sprints) • 6. Impact: ≥ 85% sprint completion OKR.",
      facts: [
        {
          id: "f1",
          text: "Must-have MVP user stories are ranked by customer value.",
          valid: true,
        },
        {
          id: "f2",
          text: "The team has agreed on sprint goals and what finished looks like for each task.",
          valid: true,
        },
        {
          id: "f3",
          text: "HR scheduled annual fire safety training for next month.",
          valid: false,
        },
        {
          id: "f4",
          text: "A third-party font library released a minor patch update.",
          valid: false,
        },
      ],
      move: "New Build (Execution)",
      moves: [
        "New Build (Scoping)",
        "New Build (Execution)",
        "UX / Flow Refine",
        "Operational Readiness",
        "Decommission / Optimize",
      ],
      budget: { user: 20, business: 15, tech: 65 },
      stakeholders: [
        { group: "Engineering", role: "Scrum Team" },
        { group: "Product & UX", role: "Scrum Team" },
      ],
      deliverable: "Working software built and demoed every two weeks",
      options: [
        "Working software built and demoed every two weeks",
        "Approved commercial payback forecast for SLT",
        "Old manual sign-up sunset schedule",
      ],
      documents: ["Sprint Backlog", "Sprint Review Demo Notes"],
      windows: [
        "Weeks 9–12 (Build Sprints)",
        "Weeks 1–2 (Concept Review)",
        "Week 16+ (Post-Launch)",
      ],
      okr: "Build and test working pieces of the product on a steady two-week schedule.",
      kpi: "Complete at least 85% of planned sprint work on time, with at least 80% automated code test coverage.",
      outcomes: [
        {
          id: "o1",
          okr: "Build and test working pieces of the product on a steady two-week schedule.",
          kpi: "Complete at least 85% of planned sprint work on time, with at least 80% automated code test coverage.",
          valid: true,
        },
        {
          id: "o2",
          okr: "Skip sprint demos and test everything on launch morning.",
          kpi: "Zero working builds shown until Week 15.",
          valid: false,
        },
        {
          id: "o3",
          okr: "Change sprint priorities daily based on ad-hoc requests.",
          kpi: "0% sprint goal completion across four weeks.",
          valid: false,
        },
      ],
      template: `SPRINT BACKLOG & DEMO NOTES
Stage: 06 Sprints | Timeline: Weeks 9–12

1. DELIVERY CADENCE
Prioritized MVP user stories built, tested, and demoed on a two-week sprint cycle.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: New Build (Execution)
Budget Allocation: 20% End-User | 15% Business | 65% Technology

3. STAKEHOLDER ALIGNMENT
• Engineering: Scrum Team
• Product & UX: Scrum Team

4. TARGET OKR & KPI BENCHMARK
OKR: Build and test working pieces of the product on a steady two-week schedule.
KPI: ≥ 85% planned sprint work completed on time, with ≥ 80% automated code test coverage.`,
    },
    7: {
      title: "Stage 07: QA & UAT",
      label: "7. QA & UAT",
      timeline: "Week 13",
      window: "Week 13 (Quality Check)",
      clue: "1. Why: Pick automated staging checks & desktop/mobile sign-up tests.\n2. What: UX / Flow Refine • Budget: 35% End-User / 15% Business / 50% Technology.\n3. Who: End-Users (Peer / Subject Matter Expert) & Engineering & QA (Sign-Off).\n4. How: Tested, bug-free product ready for real customers.\n5. When: Week 13 (Quality Check) • 6. Impact: ≥ 95% test pass rate OKR.",
      facts: [
        {
          id: "f1",
          text: "The test environment passes automated checks without crashing.",
          valid: true,
        },
        {
          id: "f2",
          text: "Full self-serve sign-up journeys are tested from start to finish on desktop and mobile.",
          valid: true,
        },
        {
          id: "f3",
          text: "Sales requested branded merchandise for next quarter's conference.",
          valid: false,
        },
        {
          id: "f4",
          text: "Internal wiki pages were reorganized into alphabetical folders.",
          valid: false,
        },
      ],
      move: "UX / Flow Refine",
      moves: [
        "New Build (Self-Serve)",
        "New Build (Architecture)",
        "UX / Flow Refine",
        "Operational Readiness",
        "New Build (Release)",
      ],
      budget: { user: 35, business: 15, tech: 50 },
      stakeholders: [
        { group: "End-Users", role: "Peer / Subject Matter Expert" },
        { group: "Engineering & QA", role: "Sign-Off" },
      ],
      deliverable: "Tested, bug-free product ready for real customers",
      options: [
        "Tested, bug-free product ready for real customers",
        "Initial competitor self-serve gap summary",
        "Three-year CLV:CAC financial return model",
      ],
      documents: ["UAT Sign-Off Log", "Bug Triage Report"],
      windows: [
        "Week 13 (Quality Check)",
        "Week 5 (Funding Check)",
        "Weeks 9–12 (Build Sprints)",
      ],
      okr: "Confirm the product works smoothly and has no major bugs before going live.",
      kpi: "At least 95% of user test cases pass, with zero critical or major bugs left open.",
      outcomes: [
        {
          id: "o1",
          okr: "Confirm the product works smoothly and has no major bugs before going live.",
          kpi: "At least 95% of user test cases pass, with zero critical or major bugs left open.",
          valid: true,
        },
        {
          id: "o2",
          okr: "Ship known critical mobile sign-up bugs and fix them next quarter.",
          kpi: "Launch with 12 unresolved Severity-1 defects.",
          valid: false,
        },
        {
          id: "o3",
          okr: "Test only on desktop monitors and skip mobile browsers.",
          kpi: "0% mobile user acceptance testing completed.",
          valid: false,
        },
      ],
      template: `UAT SIGN-OFF & BUG TRIAGE LOG
Stage: 07 QA & UAT | Timeline: Week 13

1. QUALITY VERIFICATION
End-to-end self-serve sign-up flows tested across desktop and mobile with automated staging checks green.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: UX / Flow Refine
Budget Allocation: 35% End-User | 15% Business | 50% Technology

3. STAKEHOLDER ALIGNMENT
• End-Users: Peer / Subject Matter Expert
• Engineering & QA: Sign-Off

4. TARGET OKR & KPI BENCHMARK
OKR: Confirm the product works smoothly and has no major bugs before going live.
KPI: ≥ 95% of user test cases pass, with zero critical or major bugs left open.`,
    },
    8: {
      title: "Stage 08: Launch Prep",
      label: "8. Launch Prep",
      timeline: "Week 14",
      window: "Week 14 (Readiness Check)",
      clue: "1. Why: Pick help guides/release notes & Activation/TTV tracking.\n2. What: Operational Readiness • Budget: 30% End-User / 45% Business / 25% Technology.\n3. Who: Operations & Support (Peer / Subject Matter Expert) & Legal & Risk (Sign-Off).\n4. How: Trained support staff and verified usage tracking.\n5. When: Week 14 (Readiness Check) • 6. Impact: 100% support training OKR.",
      facts: [
        {
          id: "f1",
          text: "Help guides and release notes are written and shared with internal teams.",
          valid: true,
        },
        {
          id: "f2",
          text: "Tracking tools for Activation Rate, TTV, and Conversion Rate are tested and working.",
          valid: true,
        },
        {
          id: "f3",
          text: "Cafeteria catering menus were updated for the new season.",
          valid: false,
        },
        {
          id: "f4",
          text: "Legacy desktop wallpapers were refreshed across corporate laptops.",
          valid: false,
        },
      ],
      move: "Operational Readiness",
      moves: [
        "UX / Flow Discovery",
        "New Build (Scoping)",
        "New Build (Execution)",
        "Operational Readiness",
        "Decommission / Optimize",
      ],
      budget: { user: 30, business: 45, tech: 25 },
      stakeholders: [
        { group: "Operations & Support", role: "Peer / Subject Matter Expert" },
        { group: "Legal & Risk", role: "Sign-Off" },
      ],
      deliverable: "Trained support staff and verified usage tracking",
      options: [
        "Trained support staff and verified usage tracking",
        "Clickable low-fidelity discovery wireframe",
        "CRM and billing database schema map",
      ],
      documents: [
        "Launch Readiness Checklist",
        "Customer Support Playbook",
        "Analytics Tracking Plan",
      ],
      windows: [
        "Week 14 (Readiness Check)",
        "Weeks 1–2 (Concept Review)",
        "Weeks 6–7 (Specification Check)",
      ],
      okr: "Get support teams trained and confirm live tracking works before launch day.",
      kpi: "Every support team member completes training, and all core tracking events record accurately in testing.",
      outcomes: [
        {
          id: "o1",
          okr: "Get support teams trained and confirm live tracking works before launch day.",
          kpi: "Every support team member completes training, and all core tracking events record accurately in testing.",
          valid: true,
        },
        {
          id: "o2",
          okr: "Launch without telling support teams or installing analytics.",
          kpi: "0% visibility into user activation after go-live.",
          valid: false,
        },
        {
          id: "o3",
          okr: "Publish internal draft notes directly to public customers.",
          kpi: "Skip Legal & Risk approval on customer terms.",
          valid: false,
        },
      ],
      template: `LAUNCH READINESS & ANALYTICS PLAN
Stage: 08 Launch Prep | Timeline: Week 14

1. OPERATIONAL & TRACKING READINESS
Customer support playbooks delivered and live event tracking verified for Activation Rate, TTV, and Conversion Rate.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: Operational Readiness
Budget Allocation: 30% End-User | 45% Business | 25% Technology

3. STAKEHOLDER ALIGNMENT
• Operations & Support: Peer / Subject Matter Expert
• Legal & Risk: Sign-Off

4. TARGET OKR & KPI BENCHMARK
OKR: Get support teams trained and confirm live tracking works before launch day.
KPI: 100% support team training completed and all core tracking events accurate in testing.`,
    },
    9: {
      title: "Stage 09: Go Live",
      label: "9. Go Live",
      timeline: "Week 15",
      window: "Week 15 (Release Week)",
      clue: "1. Why: Pick phased rollout checks & live End-User sign-up tracking.\n2. What: New Build (Release) • Budget: 40% End-User / 35% Business / 25% Technology.\n3. Who: Product & Engineering (Scrum Team) & SLT (Sign-Off).\n4. How: Live self-serve product available to customers.\n5. When: Week 15 (Release Week) • 6. Impact: ≥ 45% Activation Rate OKR.",
      facts: [
        {
          id: "f1",
          text: "Phased rollout (10% → 50% → all users) stability checks are green.",
          valid: true,
        },
        {
          id: "f2",
          text: "Live sign-up tracking shows real End-Users are completing onboarding cleanly.",
          valid: true,
        },
        {
          id: "f3",
          text: "Office stationery supplies were reordered for Q4.",
          valid: false,
        },
        {
          id: "f4",
          text: "Internal team lunch preferences were collected for Friday.",
          valid: false,
        },
      ],
      move: "New Build (Release)",
      moves: [
        "New Build (Self-Serve)",
        "New Build (Investment Approval)",
        "New Build (Architecture)",
        "New Build (Release)",
        "Decommission / Optimize",
      ],
      budget: { user: 40, business: 35, tech: 25 },
      stakeholders: [
        { group: "Product & Engineering", role: "Scrum Team" },
        { group: "SLT", role: "Sign-Off" },
      ],
      deliverable: "Live self-serve product available to customers",
      options: [
        "Live self-serve product available to customers",
        "Early concept survey and problem brief",
        "Low-fidelity wireframe sketches for discovery",
      ],
      documents: ["Public Release Notes", "Post-Launch Performance Report"],
      windows: [
        "Week 15 (Release Week)",
        "Weeks 3–4 (Research Sprint)",
        "Week 8 (Pre-Sprint Check)",
      ],
      okr: "Roll out the product smoothly and help new users get started right away.",
      kpi: "At least 45% Activation Rate within 7 days, Time to Value (TTV) under 10 minutes, and 99.9% system uptime.",
      outcomes: [
        {
          id: "o1",
          okr: "Roll out the product smoothly and help new users get started right away.",
          kpi: "At least 45% Activation Rate within 7 days, Time to Value (TTV) under 10 minutes, and 99.9% system uptime.",
          valid: true,
        },
        {
          id: "o2",
          okr: "Release to 100% of traffic at once with monitoring turned off.",
          kpi: "Ignore server error spikes during launch week.",
          valid: false,
        },
        {
          id: "o3",
          okr: "Delay customer release indefinitely while polishing internal docs.",
          kpi: "0% live customer traffic in Week 15.",
          valid: false,
        },
      ],
      template: `PUBLIC RELEASE NOTES & PERFORMANCE REPORT
Stage: 09 Go Live | Timeline: Week 15

1. LAUNCH EXECUTION
Phased rollout (10% → 50% → 100%) completed with live onboarding telemetry active.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: New Build (Release)
Budget Allocation: 40% End-User | 35% Business | 25% Technology

3. STAKEHOLDER ALIGNMENT
• Product & Engineering: Scrum Team
• SLT: Sign-Off

4. TARGET OKR & KPI BENCHMARK
OKR: Roll out the product smoothly and help new users get started right away.
KPI: ≥ 45% Activation Rate within 7 days, TTV < 10 mins, and 99.9% uptime.`,
    },
    10: {
      title: "Stage 10: Iterate",
      label: "10. Iterate",
      timeline: "Week 16+",
      window: "Week 16+ (Post-Launch)",
      clue: "1. Why: Pick 30-day Cohort Retention/NPS & retiring manual sign-up.\n2. What: Decommission / Optimize • Budget: 45% End-User / 35% Business / 20% Technology.\n3. Who: End-Users (Peer / Subject Matter Expert) & Product & UX (Scrum Team).\n4. How: Roadmap for improvements and retirement of old manual tools.\n5. When: Week 16+ (Post-Launch) • 6. Impact: ≥ 60% Feature Adoption Rate OKR.",
      facts: [
        {
          id: "f1",
          text: "30-day Cohort Retention, DAU/MAU, and NPS scores have been reviewed.",
          valid: true,
        },
        {
          id: "f2",
          text: "Old manual sign-up steps are ready to be turned off.",
          valid: true,
        },
        {
          id: "f3",
          text: "Company holiday party dates were added to the calendar.",
          valid: false,
        },
        {
          id: "f4",
          text: "Unused meeting room projectors were moved to storage.",
          valid: false,
        },
      ],
      move: "Decommission / Optimize",
      moves: [
        "New Build (Self-Serve)",
        "UX / Flow Discovery",
        "New Build (Scoping)",
        "Operational Readiness",
        "Decommission / Optimize",
      ],
      budget: { user: 45, business: 35, tech: 20 },
      stakeholders: [
        { group: "End-Users", role: "Peer / Subject Matter Expert" },
        { group: "Product & UX", role: "Scrum Team" },
      ],
      deliverable:
        "Roadmap for improvements and retirement of old manual tools",
      options: [
        "Roadmap for improvements and retirement of old manual tools",
        "Initial commercial funding request for SLT",
        "Pre-sprint security and privacy assessment",
      ],
      documents: ["30-Day Post-Launch Review", "Iteration & Sunset Plan"],
      windows: [
        "Week 16+ (Post-Launch)",
        "Week 5 (Funding Check)",
        "Week 13 (Quality Check)",
      ],
      okr: "Keep users coming back long-term while shutting down costly manual processes.",
      kpi: "At least 60% Feature Adoption Rate, Product Stickiness (DAU/MAU) of 25% or higher, +12% lift in Customer Retention Rate (CRR), CSAT of 85% or higher, and NPS of +40 or higher.",
      outcomes: [
        {
          id: "o1",
          okr: "Keep users coming back long-term while shutting down costly manual processes.",
          kpi: "At least 60% Feature Adoption Rate, Product Stickiness (DAU/MAU) of 25% or higher, +12% lift in Customer Retention Rate (CRR), CSAT of 85% or higher, and NPS of +40 or higher.",
          valid: true,
        },
        {
          id: "o2",
          okr: "Keep maintaining both the old manual workflow and new self-serve flow forever.",
          kpi: "Zero legacy systems retired after launch.",
          valid: false,
        },
        {
          id: "o3",
          okr: "Stop tracking retention and customer feedback once the release ships.",
          kpi: "0 post-launch reviews conducted.",
          valid: false,
        },
      ],
      template: `30-DAY POST-LAUNCH REVIEW & SUNSET PLAN
Stage: 10 Iterate | Timeline: Week 16+

1. OUTCOME REVIEW & OPTIMIZATION
30-day Cohort Retention, DAU/MAU stickiness, CSAT, and NPS reviewed to guide next improvements and retire legacy manual workflows.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: Decommission / Optimize
Budget Allocation: 45% End-User | 35% Business | 20% Technology

3. STAKEHOLDER ALIGNMENT
• End-Users: Peer / Subject Matter Expert
• Product & UX: Scrum Team

4. TARGET OKR & KPI BENCHMARK
OKR: Keep users coming back long-term while shutting down costly manual processes.
KPI: ≥ 60% Feature Adoption, ≥ 25% DAU/MAU, +12% CRR, ≥ 85% CSAT, and NPS ≥ +40.`,
    },
  },
  stakeholderGroups: [
    "End-Users",
    "SLT",
    "Product & UX",
    "Engineering",
    "Engineering & QA",
    "Product & Engineering",
    "Finance & Operations",
    "Legal, Security & Risk",
    "Legal & Risk",
    "Operations & Support",
  ],
  engagementRoles: [
    "Scrum Team",
    "Peer / Subject Matter Expert",
    "Sign-Off",
    "Third-Party",
  ],
  acronyms: [
    {
      term: "ARR (Annual Recurring Revenue)",
      meaning:
        "Predictable yearly subscription income (MRR × 12 or total annual contract value).",
    },
    {
      term: "CAC (Customer Acquisition Cost)",
      meaning:
        "Total sales and marketing spend to win one customer (Total Sales & Marketing Spend ÷ New Customers).",
    },
    {
      term: "CLV (Customer Lifetime Value)",
      meaning:
        "Total revenue from a customer over time (Average Purchase Value × Frequency × Lifespan).",
    },
    {
      term: "CRM (Customer Relationship Management)",
      meaning:
        "Software tracking customer data and interactions (System acronym).",
    },
    {
      term: "CRR (Customer Retention Rate)",
      meaning:
        "Percentage of customers who stay (((Ending Customers − New Customers) ÷ Starting Customers) × 100).",
    },
    {
      term: "CSAT (Customer Satisfaction Score)",
      meaning:
        "Percentage of happy user feedback ((Positive Responses ÷ Total Responses) × 100).",
    },
    {
      term: "DAU / MAU",
      meaning:
        "Daily or Monthly Active Users (Count of unique active users over 24 hours or 30 days).",
    },
    {
      term: "KPI (Key Performance Indicator)",
      meaning: "Core metric tracking goal success (Framework acronym).",
    },
    {
      term: "MRR (Monthly Recurring Revenue)",
      meaning:
        "Predictable monthly subscription income (ARPU × Total Paying Customers).",
    },
    {
      term: "MVP (Minimum Viable Product)",
      meaning: "Earliest working product version (Product acronym).",
    },
    {
      term: "NPS (Net Promoter Score)",
      meaning:
        "Customer advocacy rating (% Promoters [9–10] − % Detractors [0–6]).",
    },
    {
      term: "OKR (Objectives and Key Results)",
      meaning: "Goal-setting system (Framework acronym).",
    },
    {
      term: "PRD (Product Requirements Document)",
      meaning: "Master feature specification (Document acronym).",
    },
    {
      term: "QA (Quality Assurance)",
      meaning: "Testing discipline for bug detection (Process acronym).",
    },
    {
      term: "ROI (Return on Investment)",
      meaning:
        "Profit relative to cost (((Net Profit − Investment Cost) ÷ Investment Cost) × 100).",
    },
    {
      term: "SLT (Senior Leadership Team)",
      meaning: "Executive decision-making group (Role acronym).",
    },
    {
      term: "SME (Subject Matter Expert)",
      meaning: "Domain specialist (Role acronym).",
    },
    {
      term: "TTV (Time to Value)",
      meaning:
        "Speed to first user benefit (Timestamp of First Value − Timestamp of Sign-Up).",
    },
    {
      term: "UAT (User Acceptance Testing)",
      meaning: "Final user-led launch check (Process acronym).",
    },
    {
      term: "UX (User Experience)",
      meaning: "Design and usability discipline (Discipline acronym).",
    },
  ],
  formulas: [
    {
      name: "Churn Rate",
      formula: "(Lost Customers ÷ Starting Customers) × 100",
    },
    {
      name: "Conversion Rate",
      formula: "(Target Actions ÷ Total Visitors) × 100",
    },
    {
      name: "Activation Rate",
      formula: "(Onboarded New Users ÷ Total New Sign-Ups) × 100",
    },
    {
      name: "Feature Adoption Rate",
      formula: "(Feature Users ÷ Total Active Users) × 100",
    },
    {
      name: "Product Stickiness",
      formula: "(DAU ÷ MAU) × 100",
    },
  ],
};
