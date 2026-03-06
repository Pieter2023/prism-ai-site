// ============================================================
// Deal Copilot — app.js
// All application logic for pricing, scope, and email generation
// Currency: CAD | Market: Canadian
// ============================================================

// ========== MARKET DATA (CAD, Canadian market) ==========

var MARKET_DATA = {
  ai_platform: {
    label: "AI Platform / Reporting",
    freelancer: [8000, 18000],
    you: [12000, 30000],
    studio: [25000, 50000],
    monthly: [750, 2500],
  },
  voicebot: {
    label: "Voicebot / Conversational AI",
    freelancer: [6000, 15000],
    you: [10000, 25000],
    studio: [18000, 40000],
    monthly: [750, 3000],
  },
  automation: {
    label: "AI Automation / Workflow",
    freelancer: [5000, 12000],
    you: [8000, 20000],
    studio: [15000, 35000],
    monthly: [500, 2000],
  },
  custom: {
    label: "Custom Project",
    freelancer: [5000, 15000],
    you: [8000, 25000],
    studio: [15000, 45000],
    monthly: [500, 2500],
  },
};

var COMPLEXITY_MULTIPLIER = {
  low: 0.75,
  medium: 1.0,
  high: 1.4,
};

// ========== SCOPE TEMPLATES ==========

var SCOPE_TEMPLATES = {
  ai_platform: {
    inclusions: [
      "Core web application with user authentication",
      "Data ingestion pipeline (up to 3 source formats agreed during discovery)",
      "AI-powered processing and output generation",
      "Admin dashboard with key metrics",
      "Production deployment",
      "1-week post-launch monitoring and critical bugfixes",
    ],
    exclusions: [
      "Unlimited revision cycles after client acceptance",
      "New data source integrations beyond agreed formats",
      "Enterprise SSO, SOC 2, or compliance certifications",
      "Native mobile application",
      "End-user training materials or documentation",
      "Ongoing infrastructure or hosting management",
    ],
    acceptance: [
      "Core workflow runs end-to-end in staging environment",
      "AI-generated output reviewed and approved by client stakeholder",
      "Authentication and data isolation verified",
      "Performance meets agreed thresholds",
      "Named client approver signs off on deliverable",
    ],
  },
  voicebot: {
    inclusions: [
      "Voice agent with defined call flows (quantity agreed during discovery)",
      "Integration with specified phone system or platform",
      "Prompt engineering and conversation tuning",
      "Testing with sample calls across defined scenarios",
      "Production deployment",
      "1-week post-launch call monitoring",
    ],
    exclusions: [
      "Unlimited new intents or call flow changes after acceptance",
      "Multi-language support",
      "Custom voice synthesis or cloning",
      "CRM data migration or cleanup",
      "Call center staff training",
      "Ongoing call volume management",
    ],
    acceptance: [
      "Voice agent handles all defined intents in test calls",
      "Integration with client systems verified end-to-end",
      "Handoff/escalation flow to human agent working",
      "Call quality meets agreed standards in test environment",
      "Named client approver signs off on deliverable",
    ],
  },
  automation: {
    inclusions: [
      "Automated workflow (steps and triggers agreed during discovery)",
      "Integration with specified systems (quantity agreed during discovery)",
      "Error handling, logging, and retry logic",
      "Deployment and monitoring setup",
      "Workflow documentation",
      "1-week post-launch monitoring",
    ],
    exclusions: [
      "Unlimited additional workflow branches or steps",
      "Legacy system rewrites or data migrations",
      "Data cleanup or transformation beyond agreed scope",
      "Enterprise security audit or penetration testing",
      "Ongoing manual data operations",
    ],
    acceptance: [
      "Workflow runs end-to-end with production-representative data",
      "Error cases handled per agreed specification",
      "Monitoring and alerting configured and verified",
      "Performance within agreed thresholds",
      "Named client approver signs off on deliverable",
    ],
  },
  custom: {
    inclusions: [
      "Core deliverable as agreed during discovery",
      "Integration with specified systems",
      "Testing and quality assurance",
      "Production deployment",
      "1-week post-launch support",
    ],
    exclusions: [
      "Features or changes not specified in the scope document",
      "Unlimited revision cycles",
      "Third-party platform costs or licensing",
      "End-user training or documentation",
      "Ongoing maintenance beyond 1-week post-launch",
    ],
    acceptance: [
      "Core functionality works as specified in scope document",
      "Integrations verified with test data",
      "Named client approver signs off on deliverable",
    ],
  },
};

var CHANGE_ORDER_CLAUSE =
  "Any features, changes, or additions outside this scope will be quoted as separate fixed-price change orders. Work begins only after written approval and does not affect the current timeline unless explicitly agreed.";

// ========== STATE ==========

var state = {
  floor: {
    targetIncome: 150000,
    monthlyOverhead: 2000,
    taxRate: 35,
    billableHours: 20,
    floorRate: 0,
  },
  deal: {
    serviceType: "ai_platform",
    clientName: "",
    projectSummary: "",
    proposedFee: 0,
    estimatedHours: 0,
    complexity: "medium",
    impliedHourly: 0,
    marketRange: [0, 0],
    verdict: "",
  },
};

// ========== HELPERS ==========

function formatMoney(value) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value);
}

function roundTo50(value) {
  return Math.round(value / 50) * 50;
}

function roundTo500(value) {
  return Math.round(value / 500) * 500;
}

function applyMultiplier(range, multiplier) {
  return [roundTo500(range[0] * multiplier), roundTo500(range[1] * multiplier)];
}

function bandText(range) {
  return formatMoney(range[0]) + " \u2013 " + formatMoney(range[1]);
}

// ========== LOCAL STORAGE ==========

function loadFloorFromStorage() {
  try {
    var saved = localStorage.getItem("dealcopilot_floor");
    if (saved) {
      var parsed = JSON.parse(saved);
      if (parsed.targetIncome) state.floor.targetIncome = parsed.targetIncome;
      if (parsed.monthlyOverhead !== undefined) state.floor.monthlyOverhead = parsed.monthlyOverhead;
      if (parsed.taxRate) state.floor.taxRate = parsed.taxRate;
      if (parsed.billableHours) state.floor.billableHours = parsed.billableHours;
      if (parsed.floorRate) state.floor.floorRate = parsed.floorRate;

      document.getElementById("targetIncome").value = state.floor.targetIncome;
      document.getElementById("monthlyOverhead").value = state.floor.monthlyOverhead;
      document.getElementById("taxRate").value = state.floor.taxRate;
      document.getElementById("billableHours").value = state.floor.billableHours;

      if (state.floor.floorRate > 0) {
        showFloorResult();
      }
    }
  } catch (e) {
    // ignore storage errors
  }
}

function saveFloorToStorage() {
  try {
    localStorage.setItem("dealcopilot_floor", JSON.stringify(state.floor));
  } catch (e) {
    // ignore storage errors
  }
}

// ========== TAB NAVIGATION ==========

function initTabs() {
  var tabs = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".tab-panel");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.dataset.tab;
      tabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      panels.forEach(function (p) {
        p.classList.remove("active");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      document.getElementById(target).classList.add("active");
    });
  });

  // Navigation hint buttons
  document.querySelectorAll("[data-goto]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.dataset.goto;
      var targetTab = document.querySelector('[data-tab="' + target + '"]');
      if (targetTab) targetTab.click();
    });
  });
}

function markTabHasData(tabId) {
  var tab = document.querySelector('[data-tab="' + tabId + '"]');
  if (tab) tab.classList.add("has-data");
}

// ========== FLOOR CALCULATOR ==========

function calculateFloor() {
  var income = state.floor.targetIncome;
  var overhead = state.floor.monthlyOverhead * 12;
  var taxRate = state.floor.taxRate / 100;
  var hoursPerYear = state.floor.billableHours * 50;

  var requiredGross = (income + overhead) / Math.max(0.1, 1 - taxRate);
  var floorRate = roundTo50(requiredGross / Math.max(1, hoursPerYear));

  state.floor.floorRate = floorRate;
  saveFloorToStorage();
  showFloorResult();
  markTabHasData("floor");
}

function showFloorResult() {
  var resultEl = document.getElementById("floor-result");
  var rateEl = document.getElementById("floorRateDisplay");
  var noteEl = document.getElementById("floorNote");
  var hoursPerYear = state.floor.billableHours * 50;
  var overhead = state.floor.monthlyOverhead * 12;

  resultEl.hidden = false;
  rateEl.textContent = formatMoney(state.floor.floorRate);
  noteEl.textContent =
    "Based on " +
    formatMoney(state.floor.targetIncome) +
    " take-home, " +
    formatMoney(overhead) +
    " annual overhead, " +
    state.floor.taxRate +
    "% tax buffer, and " +
    state.floor.billableHours +
    " billable hours/week (" +
    hoursPerYear +
    " hrs/year). Below this rate, you\u2019re losing money.";
}

function initFloorForm() {
  var form = document.getElementById("floor-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    state.floor.targetIncome = Number(document.getElementById("targetIncome").value) || 150000;
    state.floor.monthlyOverhead = Number(document.getElementById("monthlyOverhead").value) || 2000;
    state.floor.taxRate = Number(document.getElementById("taxRate").value) || 35;
    state.floor.billableHours = Number(document.getElementById("billableHours").value) || 20;
    calculateFloor();
  });
}

// ========== DEAL CHECK ==========

function getMarketRanges(serviceType, complexity) {
  var data = MARKET_DATA[serviceType] || MARKET_DATA.custom;
  var mult = COMPLEXITY_MULTIPLIER[complexity] || 1;
  return {
    label: data.label,
    freelancer: applyMultiplier(data.freelancer, mult),
    you: applyMultiplier(data.you, mult),
    studio: applyMultiplier(data.studio, mult),
    monthly: data.monthly,
  };
}

function checkDeal() {
  var serviceType = state.deal.serviceType;
  var proposedFee = state.deal.proposedFee;
  var estimatedHours = state.deal.estimatedHours;
  var complexity = state.deal.complexity;

  var market = getMarketRanges(serviceType, complexity);
  var impliedHourly = estimatedHours > 0 ? roundTo50(proposedFee / estimatedHours) : 0;
  var floorRate = state.floor.floorRate > 0 ? state.floor.floorRate : 200;
  var marketMid = Math.round((market.you[0] + market.you[1]) / 2);

  state.deal.impliedHourly = impliedHourly;
  state.deal.marketRange = market.you;

  // Determine verdict
  var verdict, advice;

  if (proposedFee > 0 && proposedFee < market.you[0] * 0.5) {
    verdict = "red";
    advice =
      "You\u2019re at less than half the market low (" +
      formatMoney(market.you[0]) +
      "). For " +
      market.label +
      " work, consider " +
      formatMoney(market.you[0]) +
      "\u2013" +
      formatMoney(marketMid) +
      " as a starting range. You\u2019re leaving at least " +
      formatMoney(market.you[0] - proposedFee) +
      " on the table.";
  } else if (impliedHourly > 0 && impliedHourly < floorRate * 0.85) {
    verdict = "red";
    var suggestedMin = Math.max(market.you[0], roundTo500(floorRate * estimatedHours));
    advice =
      "Your implied rate (" +
      formatMoney(impliedHourly) +
      "/hr) is well below your floor (" +
      formatMoney(floorRate) +
      "/hr). Either raise to at least " +
      formatMoney(suggestedMin) +
      " or reduce scope to " +
      Math.max(5, Math.floor(proposedFee / floorRate)) +
      " hours.";
  } else if (proposedFee > 0 && proposedFee < market.you[0]) {
    verdict = "amber";
    advice =
      "Below market range for " +
      market.label +
      ". The low end is " +
      formatMoney(market.you[0]) +
      ". You\u2019re " +
      formatMoney(market.you[0] - proposedFee) +
      " short. Tighten scope or add a retainer to compensate.";
  } else if (impliedHourly > 0 && impliedHourly < floorRate) {
    verdict = "amber";
    advice =
      "Implied rate is slightly below your floor but within market range. Tighten scope boundaries and make sure you have a monthly retainer lined up post-launch.";
  } else {
    verdict = "green";
    advice =
      "Price is within market range and above your floor. Midpoint for " +
      market.label +
      " is " +
      formatMoney(marketMid) +
      ". Proceed with confidence.";
  }

  state.deal.verdict = verdict;

  // Update verdict UI
  var resultEl = document.getElementById("deal-result");
  var cardEl = document.getElementById("verdictCard");
  var badgeEl = document.getElementById("verdictBadge");

  resultEl.hidden = false;
  cardEl.className = "verdict-card " + verdict;

  var labels = { red: "UNDERPRICED", amber: "TIGHT", green: "HEALTHY" };
  badgeEl.textContent = labels[verdict] || "CHECKING";

  document.getElementById("impliedHourly").textContent =
    impliedHourly > 0 ? formatMoney(impliedHourly) + "/hr" : "\u2014";
  document.getElementById("floorComparison").textContent = formatMoney(floorRate) + "/hr";
  document.getElementById("marketRange").textContent = bandText(market.you);
  document.getElementById("proposedDisplay").textContent =
    proposedFee > 0 ? formatMoney(proposedFee) : "\u2014";
  document.getElementById("verdictAdvice").textContent = advice;

  // Market reference rows
  document.getElementById("refFreelancer").textContent = bandText(market.freelancer);
  document.getElementById("refYou").textContent = bandText(market.you);
  document.getElementById("refStudio").textContent = bandText(market.studio);
  document.getElementById("refMonthly").textContent = bandText(market.monthly);

  markTabHasData("check");

  // Update downstream tabs
  updateScopeTemplates();
  updateEmailOutput();
}

function initDealForm() {
  var form = document.getElementById("deal-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    state.deal.serviceType = document.getElementById("serviceType").value;
    state.deal.clientName = document.getElementById("clientName").value.trim();
    state.deal.projectSummary = document.getElementById("projectSummary").value.trim();
    state.deal.proposedFee = Number(document.getElementById("proposedFee").value) || 0;
    state.deal.estimatedHours = Number(document.getElementById("estimatedHours").value) || 0;
    state.deal.complexity = document.getElementById("complexity").value;
    checkDeal();
  });

  // Also update scope when service type changes
  document.getElementById("serviceType").addEventListener("change", function () {
    state.deal.serviceType = this.value;
    updateScopeTemplates();
  });
}

// ========== SCOPE GUARD ==========

function updateScopeTemplates() {
  var type = state.deal.serviceType || "custom";
  var template = SCOPE_TEMPLATES[type] || SCOPE_TEMPLATES.custom;
  var data = MARKET_DATA[type] || MARKET_DATA.custom;

  document.getElementById("scopeInclusions").value = template.inclusions
    .map(function (i) { return "\u2022 " + i; })
    .join("\n");
  document.getElementById("scopeExclusions").value = template.exclusions
    .map(function (i) { return "\u2022 " + i; })
    .join("\n");
  document.getElementById("scopeAcceptance").value = template.acceptance
    .map(function (i) { return "\u2022 " + i; })
    .join("\n");
  document.getElementById("scopeChangeOrder").value = CHANGE_ORDER_CLAUSE;

  var labelEl = document.getElementById("scopeLabel");
  if (state.deal.projectSummary) {
    labelEl.textContent = "Scope template for: " + state.deal.projectSummary + " (" + data.label + ")";
  } else {
    labelEl.textContent = "Template: " + data.label;
  }

  markTabHasData("scope");
}

function getScopeText() {
  var project = state.deal.projectSummary || "[Project Name]";
  var client = state.deal.clientName || "[Client]";

  return [
    "SCOPE SUMMARY \u2014 " + project + " (" + client + ")",
    "",
    "IN SCOPE:",
    document.getElementById("scopeInclusions").value,
    "",
    "OUT OF SCOPE:",
    document.getElementById("scopeExclusions").value,
    "",
    "ACCEPTANCE CRITERIA:",
    document.getElementById("scopeAcceptance").value,
    "",
    "CHANGE CONTROL:",
    document.getElementById("scopeChangeOrder").value,
  ].join("\n");
}

function initScopeForm() {
  document.getElementById("copyScopeBtn").addEventListener("click", function () {
    copyWithFeedback("copyScopeBtn", getScopeText(), "Copy scope summary");
  });

  // Initialize with default template
  updateScopeTemplates();
}

// ========== EMAIL GENERATOR ==========

function buildEmail(stage) {
  var name = state.deal.clientName || "[Client Name]";
  var project = state.deal.projectSummary || "[Project Summary]";
  var fee = state.deal.proposedFee || 12000;

  var discoveryFee = roundTo50(Math.max(1500, fee * 0.15));
  var pilotFee = roundTo50(Math.max(3500, fee * 0.55));
  var premiumFee = roundTo50(fee * 1.8);

  var starterRetainer = roundTo50(Math.max(500, fee * 0.08));
  var growthRetainer = roundTo50(Math.max(1000, fee * 0.15));
  var priorityRetainer = roundTo50(Math.max(2000, fee * 0.25));

  var exclusions = document.getElementById("scopeExclusions")
    ? document.getElementById("scopeExclusions").value
    : "";

  if (stage === "first_reply") {
    return {
      subject: "Re: " + project + " \u2014 next steps to scope and price accurately",
      body: [
        "Hi " + name + ",",
        "",
        "Thanks for reaching out about " + project + ". The outcome you\u2019re after is clear, and I\u2019d like to make sure we get the scope and price right before committing.",
        "",
        "I start every project with a short paid discovery phase (" + formatMoney(discoveryFee) + ", 2\u20133 business days). You get:",
        "",
        "\u2022 Confirmed scope with clear boundaries and exclusions",
        "\u2022 Architecture and risk assessment",
        "\u2022 Fixed-price build quote with milestone payments",
        "\u2022 Timeline and acceptance criteria",
        "",
        "This protects us both from scope surprises and gives you a confident number before any major commitment.",
        "",
        "Provisional build range (confirmed after discovery):",
        "\u2022 Pilot: " + formatMoney(pilotFee),
        "\u2022 Standard: " + formatMoney(fee),
        "\u2022 Premium: " + formatMoney(premiumFee),
        "",
        "Interested? Reply and I\u2019ll send the discovery brief.",
        "",
        "Best,",
        "Pieter",
      ].join("\n"),
    };
  }

  if (stage === "proposal") {
    return {
      subject: project + " \u2014 fixed-price options",
      body: [
        "Hi " + name + ",",
        "",
        "Based on our discovery work, here are fixed-price options for " + project + ":",
        "",
        "OPTION 1: Pilot \u2014 " + formatMoney(pilotFee),
        "\u2022 Reduced scope: core workflow + 1 integration",
        "\u2022 Shorter timeline",
        "\u2022 Milestones: 50% kickoff, 30% demo, 20% launch",
        "",
        "OPTION 2: Standard \u2014 " + formatMoney(fee),
        "\u2022 Full scope as agreed in discovery",
        "\u2022 Milestones: 40% kickoff, 40% working demo, 20% launch",
        "",
        "OPTION 3: Premium \u2014 " + formatMoney(premiumFee),
        "\u2022 Expanded scope with additional workflows and enablement",
        "\u2022 Milestones: 35% kickoff, 25% architecture, 25% UAT, 15% go-live",
        "",
        "Not included:",
        exclusions || "\u2022 Features outside agreed scope\n\u2022 Unlimited revisions\n\u2022 Ongoing maintenance",
        "",
        "Post-launch support (monthly):",
        "\u2022 Starter: " + formatMoney(starterRetainer) + "/mo \u2014 1 business day response",
        "\u2022 Growth: " + formatMoney(growthRetainer) + "/mo \u2014 4-hour response",
        "\u2022 Priority: " + formatMoney(priorityRetainer) + "/mo \u2014 1-hour response",
        "",
        "New features outside the retainer are quoted separately as fixed-scope projects.",
        "",
        "Reply with Option 1, 2, or 3 and I\u2019ll send the kickoff invoice.",
        "",
        "Best,",
        "Pieter",
      ].join("\n"),
    };
  }

  if (stage === "change_order") {
    var addOnPrice = roundTo50(Math.max(900, fee * 0.18));
    return {
      subject: project + " \u2014 change order",
      body: [
        "Hi " + name + ",",
        "",
        "Thanks for the request. It\u2019s a valuable addition to the project.",
        "",
        "This sits outside our current signed scope, so here are two clean paths:",
        "",
        "Path A: Change order (+" + formatMoney(addOnPrice) + ")",
        "\u2022 Feature added to scope with updated acceptance criteria",
        "\u2022 Timeline impact: +1 week",
        "",
        "Path B: Scope swap (no cost change)",
        "\u2022 We include this feature and remove one equivalent-effort item",
        "\u2022 Timeline unchanged if approved immediately",
        "",
        "Which works better for you?",
        "",
        "Best,",
        "Pieter",
      ].join("\n"),
    };
  }

  // retainer
  return {
    subject: project + " \u2014 monthly support options",
    body: [
      "Hi " + name + ",",
      "",
      "Now that " + project + " is live, I want to make sure it stays healthy and keeps improving.",
      "",
      "AI systems need active maintenance \u2014 models change, edge cases surface, and there\u2019s always room to optimize performance and cost. Here are three support tiers:",
      "",
      "STARTER \u2014 " + formatMoney(starterRetainer) + "/month",
      "\u2022 Response: 1 business day",
      "\u2022 Monitoring, bugfixes, minor improvements",
      "\u2022 Monthly performance report",
      "",
      "GROWTH \u2014 " + formatMoney(growthRetainer) + "/month",
      "\u2022 Response: 4 business hours",
      "\u2022 Everything in Starter",
      "\u2022 Monthly strategy call + optimization backlog",
      "",
      "PRIORITY \u2014 " + formatMoney(priorityRetainer) + "/month",
      "\u2022 Response: 1 business hour",
      "\u2022 Everything in Growth",
      "\u2022 Priority queue, faster turnaround, deeper monthly tuning",
      "",
      "Not included: net-new features or major new integrations (quoted separately as fixed-scope projects).",
      "",
      "Which tier fits your needs?",
      "",
      "Best,",
      "Pieter",
    ].join("\n"),
  };
}

function updateEmailOutput() {
  var stage = document.getElementById("emailStage").value;
  var email = buildEmail(stage);

  document.getElementById("emailSubject").value = email.subject;
  document.getElementById("emailBody").value = email.body;
  markTabHasData("send");
}

function initEmailForm() {
  document.getElementById("emailStage").addEventListener("change", updateEmailOutput);

  document.getElementById("copySubjectBtn").addEventListener("click", function () {
    copyWithFeedback("copySubjectBtn", document.getElementById("emailSubject").value, "Copy");
  });

  document.getElementById("copyBodyBtn").addEventListener("click", function () {
    copyWithFeedback("copyBodyBtn", document.getElementById("emailBody").value, "Copy");
  });

  // Generate initial email
  updateEmailOutput();
}

// ========== COPY TO CLIPBOARD ==========

function copyWithFeedback(buttonId, text, defaultLabel) {
  var btn = document.getElementById(buttonId);
  if (!btn || !text) return;

  navigator.clipboard
    .writeText(text)
    .then(function () {
      btn.textContent = "Copied!";
      setTimeout(function () {
        btn.textContent = defaultLabel;
      }, 1200);
    })
    .catch(function () {
      btn.textContent = "Failed";
      setTimeout(function () {
        btn.textContent = defaultLabel;
      }, 1200);
    });
}

// ========== INIT ==========

document.addEventListener("DOMContentLoaded", function () {
  initTabs();
  initFloorForm();
  initDealForm();
  initScopeForm();
  initEmailForm();
  loadFloorFromStorage();
});
