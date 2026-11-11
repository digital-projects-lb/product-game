export const MetricsMatrix = {
  phases: {
    1: {
      name: "1. Concept Phase",
      duration: "1-2 Weeks",
      asset: "Product_Brief.pdf",
      raci: {
        product: "A",
        slt: "C",
        sponsor: "None",
        ux: "None",
        dev: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "Vision & Strategy Brief",
      hint: "💡 CLUE:\n• Product owns the concept (A)\n• Consult SLT for early advice (C)\n• Drag: Vision & Strategy Brief",
      desc: "Define the product goal, check how it fits company priorities, and identify the main customer problem we want to solve.",
      docText: `PRODUCT BRIEF
Status: Approved

1. Goal & Purpose
Explain the main problem this product solves and why it matters to our users and the business.

2. Target Audience & Opportunity
Outline who will use this product, what gaps exist today, and the core idea we are testing.`,
    },
    2: {
      name: "2. Discovery Phase",
      duration: "2-4 Weeks",
      asset: "Business_Requirements_Document.pdf",
      raci: {
        product: "A",
        slt: "C",
        ux: "None",
        sponsor: "None",
        dev: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "BABOK Market Analysis Mapping",
      hint: "💡 CLUE:\n• Product stays Accountable (A)\n• Consult SLT on business constraints (C)\n• Drag: BABOK Market Analysis Mapping",
      desc: "Run user interviews, review competing products, and narrow down requirements using practical BABOK business analysis methods.",
      docText: `BUSINESS REQUIREMENTS DOCUMENT (BRD)
Status: Signed Off

1. Research & Analysis (BABOK)
Review user interview findings, customer feedback, and competitor gaps to confirm what users actually need.

2. Scoped Problem & User Needs
Turn broad ideas into clear user workflows and list the specific problems the product must fix.`,
    },
    3: {
      name: "3. Stakeholder Engagement",
      duration: "1-2 Weeks",
      asset: "Business_Case.pdf",
      raci: {
        product: "A",
        sponsor: "A",
        slt: "I",
        legal: "C",
        ux: "None",
        dev: "None",
        risk: "None",
      },
      correctBlock: "PMBOK Triple Constraint Baseline",
      hint: "💡 CLUE:\n• Product & Sponsor both sign off (A)\n• Consult Legal on compliance risks (C)\n• Keep SLT Informed (I)\n• Drag: PMBOK Triple Constraint Baseline",
      desc: "Check budget, timeline, and legal constraints with key stakeholders and build a clear business case using PMBOK baselines.",
      docText: `BUSINESS CASE
Status: Budget & Scope Approved

1. Time, Cost & Scope Baselines (PMBOK)
• Schedule: Set realistic delivery dates and key milestones.
• Cost: Estimate build costs, tools, and ongoing running expenses.
• Scope: Confirm what is included, what is out, and any legal or compliance rules.`,
    },
    4: {
      name: "4. Stories & Specs",
      duration: "2-3 Weeks",
      asset: "Product_Requirements_Spec.pdf",
      raci: {
        ux: "C",
        dev: "C",
        product: "None",
        slt: "None",
        sponsor: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "Epic Breakdown & Lifecycle Flows",
      hint: "💡 CLUE:\n• Consult UX Design & Dev early before building (C)\n• Drag: Epic Breakdown & Lifecycle Flows",
      desc: "Break large features down into smaller epics and clear user stories with practical acceptance criteria.",
      docText: `PRODUCT REQUIREMENTS SPECIFICATION (PRD)
Status: Stories Ready

1. Epics & User Stories
Break large features into small, testable user stories using the standard format:
"As a [user], I want to [do something], so that [I get a clear benefit]."

2. End-to-End User Flow
Map out each screen and step from first visit through to task completion.`,
    },
    5: {
      name: "5. Tech Engagement",
      duration: "1-2 Weeks",
      asset: "MVP_Scoping_Plan.pdf",
      raci: {
        product: "A",
        dev: "R",
        slt: "None",
        sponsor: "None",
        ux: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "Technical Debt & Feasibility Audit",
      hint: "💡 CLUE:\n• Product is Accountable for priorities (A)\n• Dev is Responsible for technical checks (R)\n• Drag: Technical Debt & Feasibility Audit",
      desc: "Review technical feasibility with developers, spot existing tech debt, and agree on a realistic Minimum Viable Product (MVP).",
      docText: `MVP SCOPING PLAN
Status: Technically Feasible

1. Technical Check & Risks
Review database needs, security rules, and any existing tech debt that could slow down the build.

2. MVP Cut-Off Line
Separate must-have features for launch from nice-to-have items that can wait until later.`,
    },
    6: {
      name: "6. Sprints & Development",
      duration: "2-4 Weeks",
      asset: "Sprint_Backlog_Plan.pdf",
      raci: {
        dev: "R",
        product: "None",
        slt: "None",
        sponsor: "None",
        ux: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "Agile Scrum Bible Ceremony Loop",
      hint: "💡 CLUE:\n• Dev is Responsible for building during sprints (R)\n• Drag: Agile Scrum Bible Ceremony Loop",
      desc: "Build prioritized stories in short 1-2 week sprints, size tasks with story points, and run daily team check-ins.",
      docText: `SPRINT BACKLOG PLAN
Status: Sprint Active

1. Agile Scrum Workflow
Estimate tasks using story points and commit only what the team can realistically finish in this sprint.

2. Team Rhythm
Sprint Planning -> Daily Stand-up -> Sprint Review -> Retrospective.`,
    },
    7: {
      name: "7. Test Phase",
      duration: "1-2 Weeks",
      asset: "QA_UAT_Signoff_Log.pdf",
      raci: {
        product: "A",
        dev: "R",
        slt: "None",
        sponsor: "None",
        ux: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "User Acceptance Testing (UAT) Controls",
      hint: "💡 CLUE:\n• Product approves final sign-off (A)\n• Dev is Responsible for running tests (R)\n• Drag: User Acceptance Testing (UAT) Controls",
      desc: "Test every feature against acceptance criteria and run User Acceptance Testing (UAT) before going live.",
      docText: `QA & UAT SIGN-OFF LOG
Status: Staging Passed

1. Functional & UAT Testing
Check all user flows against the acceptance criteria in the PRD and verify bug fixes in staging.

2. Security & Speed Check
Confirm user data is protected and pages load quickly before approving release.`,
    },
    8: {
      name: "8. Iterate Phase",
      duration: "1 Week",
      asset: "Retrospective_Action_Plan.pdf",
      raci: {
        dev: "R",
        product: "None",
        slt: "None",
        sponsor: "None",
        ux: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "Sprint Retrospective Workflow Refinement",
      hint: "💡 CLUE:\n• Dev is Responsible for workflow fixes (R)\n• Drag: Sprint Retrospective Workflow Refinement",
      desc: "Log bugs and usability issues found during testing, hold a team retrospective, and agree on practical improvements.",
      docText: `SPRINT RETROSPECTIVE ACTION PLAN
Status: Actions Logged

1. Team Review & Fixes
List what went well, what slowed the team down, and small process changes for the next sprint.

2. Bug & Polish Queue
Prioritise remaining edge cases and UI fixes before launch.`,
    },
    9: {
      name: "9. Launch Phase",
      duration: "1-2 Weeks",
      asset: "GoToMarket_Release_Plan.pdf",
      raci: {
        product: "A",
        sponsor: "I",
        slt: "I",
        dev: "R",
        ux: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "Usage & Adoption Telemetry Logging",
      hint: "💡 CLUE:\n• Product is Accountable for launch (A)\n• Dev is Responsible for release rollout (R)\n• Keep Sponsor & SLT Informed (I)\n• Drag: Usage & Adoption Telemetry Logging",
      desc: "Roll out the product safely in stages, share release notes, and turn on usage tracking to monitor adoption.",
      docText: `GO-TO-MARKET RELEASE PLAN
Status: Live in Production

1. Staged Rollout
Release safely in small steps (1% -> 10% -> 100%) while monitoring errors and performance.

2. Launch Readiness & Tracking
Share user guides, notify stakeholders, and track active usage from day one.`,
    },
    10: {
      name: "10. Add Feature Expansion",
      duration: "Ongoing",
      asset: "Product_Improvement_Roadmap.pdf",
      raci: {
        product: "A",
        slt: "None",
        sponsor: "None",
        ux: "C",
        dev: "None",
        legal: "None",
        risk: "None",
      },
      correctBlock: "Sentiment Instrumentation Hooks (NPS/CSAT)",
      hint: "💡 CLUE:\n• Product owns the roadmap (A)\n• Consult UX/CX on user feedback (C)\n• Drag: Sentiment Instrumentation Hooks (NPS/CSAT)",
      desc: "Review post-launch results against goals, collect customer feedback, and prioritise the next set of improvements.",
      docText: `PRODUCT IMPROVEMENT ROADMAP
Status: Cycle Complete

1. Customer Feedback & Metrics
Track customer satisfaction (CSAT), ease of use, and Net Promoter Score (NPS) to spot friction.

2. Next Priorities
Use real usage data and customer feedback to plan the next round of product updates.`,
    },
  },
};
