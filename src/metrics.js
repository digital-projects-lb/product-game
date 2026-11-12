export const MetricsMatrix = {
  phases: {
    1: {
      name: "1. Concept",
      duration: "1-2 Weeks",
      asset: "Product Brief",
      raci: {
        product: "A",
        slt: "C",
        sponsor: "None",
        ux: "None",
        dev: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "Product Vision & Problem Statement",
      hint: "💡 CLUE:\n• Product owns the concept (A)\n• Consult SLT for early advice (C)\n• Drag: Product Vision & Problem Statement",
      desc: "Define the product goal, check how it fits company priorities, and identify the main customer problem we want to solve.",
      docText: `1. Problem Statement
• What user or business problem are we solving?
• Why does solving this matter right now?

2. Target Audience & Opportunity
• Primary user group(s): [Define segment]
• Current workaround or gap: [Describe friction]

3. Success Measures
• Primary outcome metric: [e.g. Task completion rate, adoption %]
• Out of scope for this phase: [List exclusions]`,
    },
    2: {
      name: "2. Discovery",
      duration: "2-4 Weeks",
      asset: "Business Requirements Document (BRD)",
      raci: {
        product: "A",
        slt: "C",
        ux: "None",
        sponsor: "None",
        dev: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "Customer Discovery & Market Analysis",
      hint: "💡 CLUE:\n• Product stays Accountable (A)\n• Consult SLT on business constraints (C)\n• Drag: Customer Discovery & Market Analysis",
      desc: "Run user interviews, review competing products, and narrow down requirements based on real customer needs.",
      docText: `1. Discovery & User Research
• User interviews conducted: [Number & key insights]
• Competitor & market review: [Strengths, gaps, positioning]

2. Core Business Requirements
• Functional needs: [What the product must do]
• Operational & compliance rules: [Policies, data handling, SLAs]

3. Assumptions & Dependencies
• Key assumptions to validate: [List assumptions]
• Upstream or downstream system dependencies: [List systems]`,
    },
    3: {
      name: "3. Stakeholder Alignment",
      duration: "1-2 Weeks",
      asset: "Business Case",
      raci: {
        product: "A",
        sponsor: "A",
        slt: "I",
        legal: "C",
        ux: "None",
        dev: "None",
        risk: "None",
      },
      correctBlock: "Time, Cost & Scope Baseline",
      hint: "💡 CLUE:\n• Product & Sponsor both sign off (A)\n• Consult Legal on compliance risks (C)\n• Keep SLT Informed (I)\n• Drag: Time, Cost & Scope Baseline",
      desc: "Check budget, timeline, and legal constraints with key stakeholders and build a clear business case.",
      docText: `1. Time, Cost & Scope Baseline
• Schedule: [Target discovery, build, and launch dates]
• Cost: [Build effort, tooling/licensing, ongoing support]
• Scope: [Confirmed Phase 1 deliverables vs deferred items]

2. Expected Value & Return
• Commercial or efficiency impact: [Revenue, cost savings, risk reduction]

3. Legal, Privacy & Governance Sign-Off
• Regulatory or privacy checks required: [Legal / Risk notes]`,
    },
    4: {
      name: "4. Stories & Specs",
      duration: "2-3 Weeks",
      asset: "Product Requirements Brief (PRD)",
      raci: {
        ux: "C",
        dev: "C",
        product: "None",
        slt: "None",
        sponsor: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "User Stories & Acceptance Criteria",
      hint: "💡 CLUE:\n• Consult UX Design & Dev early before building (C)\n• Drag: User Stories & Acceptance Criteria",
      desc: "Break large features down into smaller epics and clear user stories with practical acceptance criteria.",
      docText: `1. Epic & User Story Format
• Epic: [Feature group name]
• User Story: "As a [user role], I want to [complete action], so that [measurable outcome]."

2. Acceptance Criteria
• Given [starting context], when [user action occurs], then [expected system result].
• Edge cases & error states: [Empty states, validation errors, timeouts]

3. UX & Design Reference
• Wireframes / prototype link: [Design reference]`,
    },
    5: {
      name: "5. Tech Review",
      duration: "1-2 Weeks",
      asset: "MVP Scoping Document",
      raci: {
        product: "A",
        dev: "R",
        slt: "None",
        sponsor: "None",
        ux: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "Tech Debt & Feasibility Audit",
      hint: "💡 CLUE:\n• Product is Accountable for priorities (A)\n• Dev is Responsible for technical checks (R)\n• Drag: Tech Debt & Feasibility Audit",
      desc: "Review technical feasibility with developers, spot existing tech debt, and agree on a realistic Minimum Viable Product (MVP).",
      docText: `1. Technical Feasibility & Architecture
• Data, API & integration changes: [Summary of technical scope]
• Security, performance & accessibility checks: [Key requirements]

2. Tech Debt & Risk Assessment
• Existing tech debt impacting delivery: [Known constraints & mitigation]

3. MVP Cut-Off Line
• Must-have for launch (MVP): [Core slice]
• Fast-follow (Post-MVP): [Deferred enhancements]`,
    },
    6: {
      name: "6. Sprints & Build",
      duration: "2-4 Weeks",
      asset: "Sprint Backlog Planning Document",
      raci: {
        dev: "R",
        product: "None",
        slt: "None",
        sponsor: "None",
        ux: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "Sprint Planning & Scrum Ceremonies",
      hint: "💡 CLUE:\n• Dev is Responsible for building during sprints (R)\n• Drag: Sprint Planning & Scrum Ceremonies",
      desc: "Build prioritised stories in short 1-2 week sprints, size tasks with story points, and run daily team check-ins.",
      docText: `1. Sprint Goal & Commitment
• Sprint objective: [Single clear outcome for this iteration]
• Committed stories & story points: [Capacity vs points allocated]

2. Definition of Done (DoD)
• Code reviewed, unit tests passing, acceptance criteria verified, and deployed to staging.

3. Team Cadence
• Sprint Planning -> Daily Stand-Up -> Backlog Refinement -> Sprint Review`,
    },
    7: {
      name: "7. Testing",
      duration: "1-2 Weeks",
      asset: "QA & UAT Signoff Log",
      raci: {
        product: "A",
        dev: "R",
        slt: "None",
        sponsor: "None",
        ux: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "User Acceptance Testing (UAT)",
      hint: "💡 CLUE:\n• Product approves final sign-off (A)\n• Dev is Responsible for running tests (R)\n• Drag: User Acceptance Testing (UAT)",
      desc: "Test every feature against acceptance criteria and run User Acceptance Testing (UAT) before going live.",
      docText: `1. User Acceptance Testing (UAT) Summary
• Test scenarios verified against PRD acceptance criteria: [Pass / Fail count]
• Cross-browser & mobile responsiveness check: [Desktop, iOS, Android]

2. Non-Functional & Security Checks
• Page load speed, data privacy, and permission rules verified: [Status]

3. Release Readiness Sign-Off
• Open critical/blocker defects: [0 blockers required for go-live]`,
    },
    8: {
      name: "8. Iteration",
      duration: "1 Week",
      asset: "Sprint Retrospective Action Plan",
      raci: {
        dev: "R",
        product: "None",
        slt: "None",
        sponsor: "None",
        ux: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "Sprint Retrospective & Bug Triage",
      hint: "💡 CLUE:\n• Dev is Responsible for workflow fixes (R)\n• Drag: Sprint Retrospective & Bug Triage",
      desc: "Log bugs and usability issues found during testing, hold a team retrospective, and agree on practical improvements.",
      docText: `1. Defect & Usability Triage
• Must-fix before launch: [High-severity bugs & UX friction]
• Logged for post-launch backlog: [Minor polish items]

2. Sprint Retrospective Outcomes
• What went well: [Team strengths to keep]
• What slowed us down: [Bottlenecks or unclear specs]
• Agreed process action(s): [Owner & due date]`,
    },
    9: {
      name: "9. Launch",
      duration: "1-2 Weeks",
      asset: "Go-To-Market (GTM) Release Plan",
      raci: {
        product: "A",
        sponsor: "I",
        slt: "I",
        dev: "R",
        ux: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "Staged Rollout & Usage Tracking",
      hint: "💡 CLUE:\n• Product is Accountable for launch (A)\n• Dev is Responsible for release rollout (R)\n• Keep Sponsor & SLT Informed (I)\n• Drag: Staged Rollout & Usage Tracking",
      desc: "Roll out the product safely in stages, share release notes, and turn on usage tracking to monitor adoption.",
      docText: `1. Staged Rollout & Rollback Plan
• Rollout stages: [Internal beta -> 10% cohort -> 100% general availability]
• Rollback trigger & owner: [Error threshold & immediate fallback plan]

2. Enablement & Communications
• Release notes, user guides, and support team briefing: [Completed]

3. Live Usage & Health Monitoring
• Key events tracked from Day 1: [Activation, drop-off, error rate]`,
    },
    10: {
      name: "10. Post-Launch",
      duration: "Ongoing",
      asset: "Iteration Roadmap (Features, Bugs & Tech Debt Backlog)",
      raci: {
        product: "A",
        slt: "None",
        sponsor: "None",
        ux: "C",
        dev: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "Customer Feedback & NPS Tracking",
      hint: "💡 CLUE:\n• Product owns the roadmap (A)\n• Consult UX/CX on user feedback (C)\n• Drag: Customer Feedback & NPS Tracking",
      desc: "Review post-launch results against goals, collect customer feedback, and prioritise the next set of improvements.",
      docText: `1. Post-Launch Performance Review
• Actual adoption vs target KPIs: [30/60/90-day outcomes]
• Customer sentiment: [CSAT, Customer Effort Score (CES), and NPS trends]

2. Balanced Iteration Backlog
• New feature opportunities: [Validated user requests]
• Bug fixes & UX improvements: [Friction points from analytics/support]
• Tech debt & maintenance: [Scalability & code health items]`,
    },
  },
};
