export const StageData = {
  stages: {
    1: {
      title: "Stage 01: Concept",
      label: "1. Concept",
      timeline: "Month 1",
      window: "Concept Review - Month 1",
      facts: [
        {
          id: "f3",
          text: "One regional sales manager requested a custom dark-mode dashboard theme.",
          valid: false,
        },
        {
          id: "f1",
          text: "Customer drop-off during sign-up is rising (currently 45%), driving up our Churn Rate.",
          valid: true,
        },
        {
          id: "f4",
          text: "Internal newsletter open rates dipped slightly last quarter.",
          valid: false,
        },
        {
          id: "f2",
          text: "Our top three competitors already offer an easy self-serve sign-up option.",
          valid: true,
        },
      ],
      move: "New Build (Self-Serve)",
      moves: [
        "New Build (Self-Serve)",
        "UX / Flow Discovery",
        "UX / Flow Refine",
        "Operational Readiness",
        "Continuous Optimisation",
      ],
      budget: { user: 50, business: 35, tech: 15 },
      stakeholders: [
        { group: "Customer", role: "SME" },
        { group: "SLT", role: "Sign-Off" },
      ],
      deliverable: "Approved opportunity summary to kick off discovery",
      options: [
        "Working software built and demoed every two weeks",
        "Public release notes and live adoption report",
        "Approved opportunity summary to kick off discovery",
      ],
      documents: ["Product Brief", "Opportunity Assessment"],
      windows: [
        "Release Window - Month 10",
        "Concept Review - Month 1",
        "Specification Check - Month 4",
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
Stage: 01 Concept | Timeline: Month 1

1. PROBLEM STATEMENT
Customer drop-off during sign-up has reached 45%, increasing Churn Rate while top competitors offer self-serve onboarding.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: New Build (Self-Serve)
Budget Allocation: 50% Customer | 35% Business | 15% Technology

3. STAKEHOLDER ALIGNMENT
• Customers: SME
• SLT: Sign-Off

4. TARGET OKR & KPI BENCHMARK
OKR: Get everyone on the same page about the problem before spending money on research.
KPI: Formal SLT approval on the problem statement, and ≥ 70% of surveyed users confirm sign-up hurdles are a major issue.`,
    },
    2: {
      title: "Stage 02: Discovery",
      label: "2. Discovery",
      timeline: "Month 2",
      window: "Research Sprint - Month 2",
      facts: [
        {
          id: "f2",
          text: "Support logs show 40% of help tickets are repeat questions about how to sign up.",
          valid: true,
        },
        {
          id: "f4",
          text: "Finance prefers annual billing invoices to be sent on Fridays.",
          valid: false,
        },
        {
          id: "f1",
          text: "12 Customer interviews show the manual process is too slow, delaying Time to Value (TTV).",
          valid: true,
        },
        {
          id: "f3",
          text: "Server CPU usage peaked at 35% during Tuesday afternoon backups.",
          valid: false,
        },
      ],
      move: "UX / Flow Discovery",
      moves: [
        "New Build (Self-Serve)",
        "UX / Flow Discovery",
        "New Build (Investment Approval)",
        "Operational Readiness",
        "Continuous Optimisation",
      ],
      budget: { user: 60, business: 20, tech: 20 },
      stakeholders: [
        { group: "Customer", role: "SME" },
        { group: "CX / UX", role: "Scrum Team" },
      ],
      deliverable: "Tested clickable design of the new self-serve flow",
      options: [
        "30-day post-launch cohort retention review",
        "Tested clickable design of the new self-serve flow",
        "Final security penetration audit and legal sign-off",
      ],
      documents: [
        "Discovery Summary Report",
        "User Interview Notes",
        "Clickable Prototype",
      ],
      windows: [
        "Research Sprint - Month 2",
        "Architecture Sign-Off - Month 5",
        "Quality Check - Month 8",
      ],
      okr: "Find where users get stuck and test a simple self-serve prototype with real people.",
      kpi: "At least 80% of test users complete the prototype without help across 8 or more sessions.",
      outcomes: [
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
        {
          id: "o1",
          okr: "Find where users get stuck and test a simple self-serve prototype with real people.",
          kpi: "At least 80% of test users complete the prototype without help across 8 or more sessions.",
          valid: true,
        },
      ],
      template: `DISCOVERY SUMMARY REPORT
Stage: 02 Discovery | Timeline: Month 2

1. RESEARCH FINDINGS
12 Customer interviews confirmed manual onboarding delays Time to Value (TTV), and 40% of support tickets stem from sign-up confusion.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: UX / Flow Discovery
Budget Allocation: 60% Customer | 20% Business | 20% Technology

3. STAKEHOLDER ALIGNMENT
• Customers: SME
• Product & UX: Scrum Team

4. TARGET OKR & KPI BENCHMARK
OKR: Find where users get stuck and test a simple self-serve prototype with real people.
KPI: ≥ 80% of test users complete the prototype without help across 8 or more sessions.`,
    },
    3: {
      title: "Stage 03: Business Case",
      label: "3. Business Case",
      timeline: "Month 3",
      window: "Funding Check - Month 3",
      facts: [
        {
          id: "f4",
          text: "Staging test environments refresh automatically every Sunday night.",
          valid: false,
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
          id: "f1",
          text: "Financial forecasts show the project will pay for itself in 18 months.",
          valid: true,
        },
      ],
      move: "New Build (Investment Approval)",
      moves: [
        "UX / Flow Discovery",
        "New Build (Investment Approval)",
        "New Build (Scoping)",
        "UX / Flow Refine",
        "Continuous Optimisation",
      ],
      budget: { user: 20, business: 60, tech: 20 },
      stakeholders: [
        { group: "SLT", role: "Sign-Off" },
        { group: "Operations", role: "SME" },
      ],
      deliverable: "Approved budget and commercial forecast",
      options: [
        "Approved budget and commercial forecast",
        "Automated unit test suite and code coverage report",
        "Customer support training playbook",
      ],
      documents: ["Commercial Business Case", "Financial Return Forecast"],
      windows: [
        "Build Sprints - Months 6–7",
        "Post-Launch Iteration - Months 11–12",
        "Funding Check - Month 3",
      ],
      okr: "Secure build funding by proving the project will make money over three years and lower Customer Acquisition Cost (CAC).",
      kpi: "Projected CLV:CAC ratio of 3:1 or higher, at least 15% projected ARR growth, and SLT budget approval within 5 business days.",
      outcomes: [
        {
          id: "o3",
          okr: "Focus solely on internal code refactoring with zero customer metrics.",
          kpi: "Reduce stylesheet file size by 15%.",
          valid: false,
        },
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
      ],
      template: `COMMERCIAL BUSINESS CASE
Stage: 03 Business Case | Timeline: Month 3

1. COMMERCIAL JUSTIFICATION
18-month payback period with a projected 15% lift in Customer Retention Rate (CRR) and stronger Customer Lifetime Value (CLV).

2. PRODUCT MOVE & BUDGET SPLIT
Direction: New Build (Investment Approval)
Budget Allocation: 20% Customer | 60% Business | 20% Technology

3. STAKEHOLDER ALIGNMENT
• SLT: Sign-Off
• Finance & Operations: SME

4. TARGET OKR & KPI BENCHMARK
OKR: Secure build funding by proving the project will make money over three years and lower CAC.
KPI: Projected CLV:CAC ≥ 3:1, ≥ 15% ARR growth, and SLT approval within 5 business days.`,
    },
    4: {
      title: "Stage 04: Product Specs",
      label: "4. Product Specs",
      timeline: "Month 4",
      window: "Specification Check - Month 4",
      facts: [
        {
          id: "f1",
          text: "Prototype testing feedback is finalised and ready to use.",
          valid: true,
        },
        {
          id: "f3",
          text: "Competitor marketing campaigns launched on LinkedIn this week.",
          valid: false,
        },
        {
          id: "f2",
          text: "Core user stories, edge cases, and rules for completion are written down.",
          valid: true,
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
        "Continuous Optimisation",
      ],
      budget: { user: 40, business: 20, tech: 40 },
      stakeholders: [
        { group: "Product", role: "Scrum Team" },
        { group: "Engineering", role: "Scrum Team" },
      ],
      deliverable: "Clear, step-by-step build instructions for developers",
      options: [
        "Phased rollout health monitor and live uptime log",
        "Initial opportunity assessment for SLT",
        "Clear, step-by-step build instructions for developers",
      ],
      documents: [
        "Product Requirements Document (PRD)",
        "Prioritised Product Backlog",
      ],
      windows: [
        "Readiness Check - Month 9",
        "Specification Check - Month 4",
        "Concept Review - Month 1",
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
Stage: 04 Product Specs | Timeline: Month 4

1. SPECIFICATION SCOPE
Validated prototype flows translated into prioritised MVP user stories, edge cases, and clear acceptance criteria.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: New Build (Scoping)
Budget Allocation: 40% Customer | 20% Business | 40% Technology

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
      timeline: "Month 5",
      window: "Architecture Sign-Off - Month 5",
      facts: [
        {
          id: "f3",
          text: "Customer support agents requested ergonomic desk chairs.",
          valid: false,
        },
        {
          id: "f1",
          text: "Technical assessments confirm the proposed architecture meets enterprise speed, security, and data privacy standards.",
          valid: true,
        },
        {
          id: "f4",
          text: "Blog traffic increased 8% following last month's webinar.",
          valid: false,
        },
        {
          id: "f2",
          text: "Integration dependencies across existing CRM and billing platforms are fully documented and mapped.",
          valid: true,
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
        { group: "Legal & Support", role: "Sign-Off" },
      ],
      deliverable: "Formal technical and compliance approval to start coding",
      options: [
        "30-day cohort retention and NPS review",
        "Formal technical and compliance approval to start coding",
        "Customer interview synthesis and clickable wireframe",
      ],
      documents: [
        "Technical Architecture Diagram",
        "Security & Privacy Impact Assessment",
      ],
      windows: [
        "Architecture Sign-Off - Month 5",
        "Research Sprint - Month 2",
        "Release Window - Month 10",
      ],
      okr: "Make sure the system design is safe, fast, and follows all privacy rules before writing code.",
      kpi: "Zero unresolved high-risk security or privacy issues, and all Partner system connections mapped.",
      outcomes: [
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
        {
          id: "o1",
          okr: "Make sure the system design is safe, fast, and follows all privacy rules before writing code.",
          kpi: "Zero unresolved high-risk security or privacy issues, and all Partner system connections mapped.",
          valid: true,
        },
      ],
      template: `TECHNICAL ARCHITECTURE & RISK SIGN-OFF
Stage: 05 Tech Review | Timeline: Month 5

1. ARCHITECTURE & COMPLIANCE READINESS
System design verified for speed, data privacy compliance, and CRM/billing platform integrations.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: New Build (Architecture)
Budget Allocation: 10% Customer | 20% Business | 70% Technology

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
      timeline: "Months 6–7",
      window: "Build Sprints - Months 6–7",
      facts: [
        {
          id: "f2",
          text: "The team has agreed on sprint goals and what finished looks like for each task.",
          valid: true,
        },
        {
          id: "f4",
          text: "A Partner font library released a minor patch update.",
          valid: false,
        },
        {
          id: "f1",
          text: "Must-have MVP user stories are ranked by customer value.",
          valid: true,
        },
        {
          id: "f3",
          text: "HR scheduled annual fire safety training for next month.",
          valid: false,
        },
      ],
      move: "New Build (Execution)",
      moves: [
        "New Build (Scoping)",
        "New Build (Execution)",
        "UX / Flow Refine",
        "Operational Readiness",
        "Continuous Optimisation",
      ],
      budget: { user: 20, business: 15, tech: 65 },
      stakeholders: [
        { group: "Engineering", role: "Scrum Team" },
        { group: "Product", role: "Scrum Team" },
      ],
      deliverable: "Working software built and demoed every two weeks",
      options: [
        "Working software built and demoed every two weeks",
        "Approved commercial payback forecast for SLT",
        "Old manual sign-up sunset schedule",
      ],
      documents: ["Sprint Backlog", "Sprint Review Demo Notes"],
      windows: [
        "Concept Review - Month 1",
        "Post-Launch Iteration - Months 11–12",
        "Build Sprints - Months 6–7",
      ],
      okr: "Build and test working pieces of the product on a steady two-week schedule.",
      kpi: "Complete at least 85% of planned sprint work on time, with at least 80% automated code test coverage.",
      outcomes: [
        {
          id: "o3",
          okr: "Change sprint priorities daily based on ad-hoc requests.",
          kpi: "0% sprint goal completion across four weeks.",
          valid: false,
        },
        {
          id: "o1",
          okr: "Build and test working pieces of the product on a steady two-week schedule.",
          kpi: "Complete at least 85% of planned sprint work on time, with at least 80% automated code test coverage.",
          valid: true,
        },
        {
          id: "o2",
          okr: "Skip sprint demos and test everything on launch morning.",
          kpi: "Zero working builds shown until Month 10.",
          valid: false,
        },
      ],
      template: `SPRINT BACKLOG & DEMO NOTES
Stage: 06 Sprints | Timeline: Months 6–7

1. DELIVERY CADENCE
Prioritised MVP user stories built, tested, and demoed on a two-week sprint cycle.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: New Build (Execution)
Budget Allocation: 20% Customer | 15% Business | 65% Technology

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
      timeline: "Month 8",
      window: "Quality Check - Month 8",
      facts: [
        {
          id: "f4",
          text: "Internal wiki pages were reorganised into alphabetical folders.",
          valid: false,
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
          id: "f1",
          text: "The test environment passes automated checks without crashing.",
          valid: true,
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
        { group: "Customer", role: "SME" },
        { group: "Engineering", role: "Sign-Off" },
      ],
      deliverable: "Tested, bug-free product ready for real customers",
      options: [
        "Initial competitor self-serve gap summary",
        "Three-year CLV:CAC financial return model",
        "Tested, bug-free product ready for real customers",
      ],
      documents: ["UAT Sign-Off Log", "Bug Triage Report"],
      windows: [
        "Build Sprints - Months 6–7",
        "Quality Check - Month 8",
        "Funding Check - Month 3",
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
Stage: 07 QA & UAT | Timeline: Month 8

1. QUALITY VERIFICATION
End-to-end self-serve sign-up flows tested across desktop and mobile with automated staging checks green.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: UX / Flow Refine
Budget Allocation: 35% Customer | 15% Business | 50% Technology

3. STAKEHOLDER ALIGNMENT
• Customers: SME
• Engineering & QA: Sign-Off

4. TARGET OKR & KPI BENCHMARK
OKR: Confirm the product works smoothly and has no major bugs before going live.
KPI: ≥ 95% of user test cases pass, with zero critical or major bugs left open.`,
    },
    8: {
      title: "Stage 08: Launch Prep",
      label: "8. Launch Prep",
      timeline: "Month 9",
      window: "Readiness Check - Month 9",
      facts: [
        {
          id: "f1",
          text: "Help guides and release notes are written and shared with internal teams.",
          valid: true,
        },
        {
          id: "f3",
          text: "Cafeteria catering menus were updated for the new season.",
          valid: false,
        },
        {
          id: "f2",
          text: "Tracking tools for Activation Rate, TTV, and Conversion Rate are tested and working.",
          valid: true,
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
        "Continuous Optimisation",
      ],
      budget: { user: 30, business: 45, tech: 25 },
      stakeholders: [
        { group: "Data Team", role: "SME" },
        { group: "Legal & Support", role: "Sign-Off" },
      ],
      deliverable: "Trained support staff and verified usage tracking",
      options: [
        "CRM and billing database schema map",
        "Trained support staff and verified usage tracking",
        "Clickable low-fidelity discovery wireframe",
      ],
      documents: [
        "Launch Readiness Checklist",
        "Customer Support Playbook",
        "Analytics Tracking Plan",
      ],
      windows: [
        "Readiness Check - Month 9",
        "Concept Review - Month 1",
        "Specification Check - Month 4",
      ],
      okr: "Get support teams trained and confirm live tracking works before launch day.",
      kpi: "Every support team member completes training, and all core tracking events record accurately in testing.",
      outcomes: [
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
        {
          id: "o1",
          okr: "Get support teams trained and confirm live tracking works before launch day.",
          kpi: "Every support team member completes training, and all core tracking events record accurately in testing.",
          valid: true,
        },
      ],
      template: `LAUNCH READINESS & ANALYTICS PLAN
Stage: 08 Launch Prep | Timeline: Month 9

1. OPERATIONAL & TRACKING READINESS
Customer support playbooks delivered and live event tracking verified for Activation Rate, TTV, and Conversion Rate.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: Operational Readiness
Budget Allocation: 30% Customer | 45% Business | 25% Technology

3. STAKEHOLDER ALIGNMENT
• Operations & Support: SME
• Legal & Risk: Sign-Off

4. TARGET OKR & KPI BENCHMARK
OKR: Get support teams trained and confirm live tracking works before launch day.
KPI: 100% support team training completed and all core tracking events accurate in testing.`,
    },
    9: {
      title: "Stage 09: Go Live",
      label: "9. Go Live",
      timeline: "Month 10",
      window: "Release Window - Month 10",
      facts: [
        {
          id: "f3",
          text: "Office stationery supplies were reordered for Q4.",
          valid: false,
        },
        {
          id: "f1",
          text: "Phased rollout (10% → 50% → all users) stability checks are green.",
          valid: true,
        },
        {
          id: "f4",
          text: "Internal team lunch preferences were collected for Friday.",
          valid: false,
        },
        {
          id: "f2",
          text: "Live sign-up tracking shows real Customers are completing onboarding cleanly.",
          valid: true,
        },
      ],
      move: "New Build (Release)",
      moves: [
        "New Build (Self-Serve)",
        "New Build (Investment Approval)",
        "New Build (Architecture)",
        "New Build (Release)",
        "Continuous Optimisation",
      ],
      budget: { user: 40, business: 35, tech: 25 },
      stakeholders: [
        { group: "Operations", role: "Scrum Team" },
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
        "Research Sprint - Month 2",
        "Architecture Sign-Off - Month 5",
        "Release Window - Month 10",
      ],
      okr: "Roll out the product smoothly and help new users get started right away.",
      kpi: "At least 45% Activation Rate within 7 days, Time to Value (TTV) under 10 minutes, and 99.9% system uptime.",
      outcomes: [
        {
          id: "o3",
          okr: "Delay customer release indefinitely while polishing internal docs.",
          kpi: "0% live customer traffic in Month 10.",
          valid: false,
        },
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
      ],
      template: `PUBLIC RELEASE NOTES & PERFORMANCE REPORT
Stage: 09 Go Live | Timeline: Month 10

1. LAUNCH EXECUTION
Phased rollout (10% → 50% → 100%) completed with live onboarding telemetry active.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: New Build (Release)
Budget Allocation: 40% Customer | 35% Business | 25% Technology

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
      timeline: "Months 11–12",
      window: "Post-Launch Iteration - Months 11–12",
      facts: [
        {
          id: "f2",
          text: "Live funnel analytics highlight two high-value drop-off points for v1.1 optimisation.",
          valid: true,
        },
        {
          id: "f4",
          text: "Unused meeting room projectors were moved to storage.",
          valid: false,
        },
        {
          id: "f1",
          text: "30-day Cohort Retention, DAU/MAU, and NPS scores have been reviewed.",
          valid: true,
        },
        {
          id: "f3",
          text: "Company holiday party dates were added to the calendar.",
          valid: false,
        },
      ],
      move: "Continuous Optimisation",
      moves: [
        "New Build (Self-Serve)",
        "UX / Flow Discovery",
        "New Build (Scoping)",
        "Operational Readiness",
        "Continuous Optimisation",
      ],
      budget: { user: 45, business: 35, tech: 20 },
      stakeholders: [
        { group: "Data Team", role: "SME" },
        { group: "CX / UX", role: "Scrum Team" },
      ],
      deliverable:
        "Prioritised v1.1 optimisation backlog and 90-day growth roadmap",
      options: [
        "Initial commercial funding request for SLT",
        "Pre-sprint security and privacy assessment",
        "Prioritised v1.1 optimisation backlog and 90-day growth roadmap",
      ],
      documents: ["30-Day Post-Launch Review", "v1.1 Iteration Roadmap"],
      windows: [
        "Quality Check - Month 8",
        "Post-Launch Iteration - Months 11–12",
        "Funding Check - Month 3",
      ],
      okr: "Grow long-term customer retention and refine self-serve conversion based on live usage data.",
      kpi: "At least 60% Feature Adoption Rate, Product Stickiness (DAU/MAU) of 25% or higher, +12% lift in Customer Retention Rate (CRR), CSAT of 85% or higher, and NPS of +40 or higher.",
      outcomes: [
        {
          id: "o1",
          okr: "Grow long-term customer retention and refine self-serve conversion based on live usage data.",
          kpi: "At least 60% Feature Adoption Rate, Product Stickiness (DAU/MAU) of 25% or higher, +12% lift in Customer Retention Rate (CRR), CSAT of 85% or higher, and NPS of +40 or higher.",
          valid: true,
        },
        {
          id: "o2",
          okr: "Freeze the product after launch and ignore customer funnel drop-offs.",
          kpi: "Zero post-launch improvements shipped in Months 11–12.",
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
Stage: 10 Iterate | Timeline: Months 11–12

1. OUTCOME REVIEW & OPTIMIZATION
30-day Cohort Retention, DAU/MAU stickiness, CSAT, and NPS reviewed to guide next improvements and retire legacy manual workflows.

2. PRODUCT MOVE & BUDGET SPLIT
Direction: Continuous Optimisation
Budget Allocation: 45% Customer | 35% Business | 20% Technology

3. STAKEHOLDER ALIGNMENT
• Customers: SME
• Product & UX: Scrum Team

4. TARGET OKR & KPI BENCHMARK
OKR: Grow long-term customer retention and refine self-serve conversion based on live usage data.
KPI: ≥ 60% Feature Adoption, ≥ 25% DAU/MAU, +12% CRR, ≥ 85% CSAT, and NPS ≥ +40.`,
    },
  },
  stakeholderGroups: [
    "Customer",
    "SLT",
    "Product",
    "Data Team",
    "Engineering",
    "CX / UX",
    "Operations",
    "Legal & Support",
  ],
  engagementRoles: ["Scrum Team", "SME", "Sign-Off", "Partner"],

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
