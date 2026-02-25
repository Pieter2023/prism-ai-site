#!/usr/bin/env python3
"""Build the Lead Follow-Up Automation Playbook PDF."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak
from reportlab.lib.enums import TA_LEFT, TA_CENTER
import os

OUTPUT = os.path.join(os.path.dirname(__file__), "lead-followup-automation-playbook.pdf")

PURPLE = HexColor("#6C3CE1")
PURPLE_LIGHT = HexColor("#8B5CF6")
CYAN = HexColor("#06B6D4")
DARK_TEXT = HexColor("#1E293B")
GRAY = HexColor("#94A3B8")
LIGHT_GRAY = HexColor("#F1F5F9")
CHECK_BG = HexColor("#F8F5FF")
DARK_BG = HexColor("#1E1B4B")
GREEN = HexColor("#10B981")
AMBER = HexColor("#F59E0B")

doc = SimpleDocTemplate(OUTPUT, pagesize=A4,
    rightMargin=18*mm, leftMargin=18*mm, topMargin=18*mm, bottomMargin=18*mm)

styles = getSampleStyleSheet()

title_style = ParagraphStyle("Title", fontSize=28, textColor=PURPLE, fontName="Helvetica-Bold", spaceAfter=4, alignment=TA_CENTER)
subtitle_style = ParagraphStyle("Subtitle", fontSize=13, textColor=GRAY, fontName="Helvetica", spaceAfter=2, alignment=TA_CENTER)
tagline_style = ParagraphStyle("Tagline", fontSize=10, textColor=GRAY, fontName="Helvetica-Oblique", spaceAfter=12, alignment=TA_CENTER)
section_label = ParagraphStyle("SectionLabel", fontSize=14, textColor=PURPLE, fontName="Helvetica-Bold", spaceAfter=4, spaceBefore=14)
body_style = ParagraphStyle("Body", fontSize=10, textColor=DARK_TEXT, fontName="Helvetica", spaceAfter=6, leading=16)
bold_body = ParagraphStyle("BoldBody", fontSize=10, textColor=DARK_TEXT, fontName="Helvetica-Bold", spaceAfter=4, leading=16)
item_style = ParagraphStyle("Item", fontSize=10, textColor=DARK_TEXT, fontName="Helvetica", spaceAfter=3, leftIndent=8, leading=16)
note_style = ParagraphStyle("Note", fontSize=9, textColor=GRAY, fontName="Helvetica-Oblique", spaceAfter=6, leftIndent=16)
footer_style = ParagraphStyle("Footer", fontSize=8, textColor=GRAY, fontName="Helvetica", alignment=TA_CENTER)
step_title = ParagraphStyle("StepTitle", fontSize=11, textColor=white, fontName="Helvetica-Bold", spaceAfter=2)
step_body = ParagraphStyle("StepBody", fontSize=9, textColor=LIGHT_GRAY, fontName="Helvetica", spaceAfter=0, leading=14)
callout_style = ParagraphStyle("Callout", fontSize=10, textColor=DARK_TEXT, fontName="Helvetica", leading=16)
h3_style = ParagraphStyle("H3", fontSize=11, textColor=PURPLE, fontName="Helvetica-Bold", spaceAfter=4, spaceBefore=8)

def section(number, title):
    return [
        Spacer(1, 4*mm),
        Paragraph(f"CHAPTER {number}: {title.upper()}", section_label),
        HRFlowable(width="100%", thickness=2, color=PURPLE, spaceAfter=6),
    ]

def step_card(number, title, content_lines, color=PURPLE):
    content = f"<b>Step {number}: {title}</b><br/>" + "<br/>".join(content_lines)
    data = [[Paragraph(content, ParagraphStyle("SC", fontSize=10, textColor=white, fontName="Helvetica", leading=15))]]
    t = Table(data, colWidths=[174*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), color),
        ("TOPPADDING", (0,0), (-1,-1), 10),
        ("BOTTOMPADDING", (0,0), (-1,-1), 10),
        ("LEFTPADDING", (0,0), (-1,-1), 14),
        ("RIGHTPADDING", (0,0), (-1,-1), 14),
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [color]),
    ]))
    return [t, Spacer(1, 3*mm)]

def callout(text, bg=CHECK_BG, border=PURPLE):
    data = [[Paragraph(text, callout_style)]]
    t = Table(data, colWidths=[174*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), bg),
        ("BOX", (0,0), (-1,-1), 1.5, border),
        ("TOPPADDING", (0,0), (-1,-1), 10),
        ("BOTTOMPADDING", (0,0), (-1,-1), 10),
        ("LEFTPADDING", (0,0), (-1,-1), 14),
        ("RIGHTPADDING", (0,0), (-1,-1), 14),
    ]))
    return [t, Spacer(1, 4*mm)]

def sequence_row(day, trigger, message_preview, channel, goal):
    return [day, trigger, message_preview, channel, goal]

story = []

# ── COVER ──────────────────────────────────────────────────────────────────
story.append(Spacer(1, 8*mm))
story.append(Paragraph("PRISM AI", title_style))
story.append(Paragraph("Lead Follow-Up Automation Playbook", subtitle_style))
story.append(Paragraph("Stop losing deals to silence. Automate the follow-up that closes.", tagline_style))
story.append(HRFlowable(width="100%", thickness=1, color=PURPLE_LIGHT, spaceAfter=8))

story.append(Paragraph(
    "80% of sales require 5+ follow-ups. 44% of salespeople give up after one. "
    "This playbook gives you the exact sequences, triggers, and automation logic to "
    "follow up faster, smarter, and more consistently — without lifting a finger after setup.",
    body_style))

story += callout(
    "⚡ <b>What you'll build:</b> A fully automated lead follow-up system that responds in minutes, "
    "nurtures over days, and escalates to humans only when a lead is warm. "
    "Works with any CRM (HubSpot, Go High Level, Pipedrive, or even a spreadsheet).",
    bg=CHECK_BG, border=PURPLE)

story.append(Spacer(1, 4*mm))

# ── CHAPTER 1 ───────────────────────────────────────────────────────────────
story += section(1, "The Follow-Up Problem (and Why Automation Fixes It)")

story.append(Paragraph("Why most businesses lose leads they should close:", bold_body))
for item in [
    "First response takes >1 hour — conversion drops by 10x after that",
    "No follow-up system — reps forget, get busy, or give up",
    "Generic follow-ups — same message to every lead regardless of source or behaviour",
    "No escalation logic — warm leads sit in a queue next to cold ones",
    "Leads fall out of the pipeline between tools — CRM ≠ email ≠ WhatsApp",
]:
    story.append(Paragraph(f"✗  {item}", item_style))

story.append(Spacer(1, 4*mm))
story.append(Paragraph("The automation fix:", bold_body))
for item in [
    "Auto-acknowledge every lead within 60 seconds of submission",
    "Trigger a timed sequence based on lead source and behaviour",
    "Escalate automatically when a lead opens, clicks, or replies",
    "Remove leads from sequences the moment they respond (no robotic pile-ons)",
    "Notify the human only when a lead is genuinely warm",
]:
    story.append(Paragraph(f"✓  {item}", item_style))

# ── CHAPTER 2 ───────────────────────────────────────────────────────────────
story += section(2, "The 5-Touch Sequence Framework")

story.append(Paragraph(
    "Every lead follow-up sequence should have 5 touches across 14 days. "
    "After that, move them to a long-term nurture. Here's the exact structure:", body_style))

seq_data = [
    ["Touch", "Timing", "Channel", "Goal", "Template"],
    ["1", "< 5 min", "Email/SMS", "Acknowledge + set expectation", "See Ch. 3"],
    ["2", "Day 1 (+4h)", "Email", "Value add + soft CTA", "See Ch. 3"],
    ["3", "Day 3", "Email", "Social proof + objection handle", "See Ch. 3"],
    ["4", "Day 7", "SMS or WhatsApp", "Direct ask — are you still interested?", "See Ch. 3"],
    ["5", "Day 14", "Email", "Breakup email — permission to close", "See Ch. 3"],
]
seq_table = Table(seq_data, colWidths=[18*mm, 22*mm, 28*mm, 60*mm, 22*mm])
seq_table.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), PURPLE),
    ("TEXTCOLOR", (0,0), (-1,0), white),
    ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
    ("FONTSIZE", (0,0), (-1,-1), 8),
    ("ALIGN", (0,0), (-1,-1), "CENTER"),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [LIGHT_GRAY, white]),
    ("GRID", (0,0), (-1,-1), 0.5, GRAY),
    ("TOPPADDING", (0,0), (-1,-1), 6),
    ("BOTTOMPADDING", (0,0), (-1,-1), 6),
]))
story.append(seq_table)
story.append(Spacer(1, 4*mm))

story += callout(
    "💡 <b>Key rule:</b> The moment a lead replies, books, or takes action — "
    "pull them OUT of the sequence immediately. Nothing kills a warm conversation "
    "faster than a robotic follow-up arriving after they've already responded.",
    bg=HexColor("#F0FDF4"), border=GREEN)

# ── CHAPTER 3 ───────────────────────────────────────────────────────────────
story += section(3, "Copy-Paste Message Templates")

story.append(Paragraph("Touch 1 — Immediate acknowledgement (within 5 minutes)", h3_style))
story += callout(
    '<b>Subject:</b> Got your enquiry — here\'s what happens next<br/><br/>'
    'Hi [First Name],<br/><br/>'
    'Thanks for reaching out — I\'ve got your message and will be in touch within [X hours/by end of day].<br/><br/>'
    'In the meantime, here\'s what you can expect:<br/>'
    '→ A quick call to understand exactly what you need<br/>'
    '→ A tailored recommendation (not a generic pitch)<br/>'
    '→ Clear next steps — no pressure<br/><br/>'
    'If you need anything urgently, reply to this email or call [number].<br/><br/>'
    'Talk soon,<br/>[Your name]',
    bg=LIGHT_GRAY, border=GRAY)

story.append(Paragraph("Touch 2 — Day 1 value add", h3_style))
story += callout(
    '<b>Subject:</b> One thing most [industry] businesses get wrong<br/><br/>'
    'Hi [First Name],<br/><br/>'
    'While I prepare your recommendation, I thought this might be useful:<br/><br/>'
    '[Insert 1 practical tip relevant to their pain point — 2-3 sentences max]<br/><br/>'
    'Most of the businesses I work with tell me [common pain point]. '
    'If that resonates, it\'s worth a 15-minute conversation.<br/><br/>'
    '[Book a call: link] or just reply here.<br/><br/>'
    '[Your name]',
    bg=LIGHT_GRAY, border=GRAY)

story.append(Paragraph("Touch 3 — Day 3 social proof", h3_style))
story += callout(
    '<b>Subject:</b> How [similar business] solved [problem]<br/><br/>'
    'Hi [First Name],<br/><br/>'
    'Quick one — we recently helped [type of business] go from [before] to [after] in [timeframe].<br/><br/>'
    'The main thing that made the difference: [one-line insight].<br/><br/>'
    'Happy to walk you through exactly how we did it — takes 15 minutes.<br/><br/>'
    '[Book here: link]<br/><br/>'
    '[Your name]',
    bg=LIGHT_GRAY, border=GRAY)

story.append(Paragraph("Touch 4 — Day 7 SMS/WhatsApp (direct)", h3_style))
story += callout(
    'Hi [First Name], [Your name] here from [Company]. '
    'Just checking in on your enquiry from last week — '
    'are you still looking for help with [topic]? '
    'Happy to jump on a quick call this week if so. 🙂',
    bg=LIGHT_GRAY, border=GRAY)

story.append(Paragraph("Touch 5 — Day 14 breakup email", h3_style))
story += callout(
    '<b>Subject:</b> Should I close your file?<br/><br/>'
    'Hi [First Name],<br/><br/>'
    'I\'ve reached out a few times but haven\'t heard back — '
    'which usually means one of three things:<br/><br/>'
    '1. You\'ve sorted it yourself (great!)<br/>'
    '2. The timing isn\'t right<br/>'
    '3. My emails are landing in spam<br/><br/>'
    'Either way — no hard feelings. I\'ll close your file unless I hear from you.<br/><br/>'
    'If timing was the issue, just reply "not yet" and I\'ll check back in 30 days.<br/><br/>'
    '[Your name]',
    bg=LIGHT_GRAY, border=GRAY)

story.append(Paragraph(
    "⚡ Breakup emails consistently get the highest reply rates in the sequence. "
    "The subject line alone triggers responses from people who've gone cold for weeks.",
    note_style))

# ── CHAPTER 4 ───────────────────────────────────────────────────────────────
story.append(PageBreak())
story += section(4, "Automation Setup — Tool-by-Tool")

for tool, steps in [
    ("HubSpot (Free)", [
        "Create a Contact-based Workflow",
        "Trigger: Form submitted OR Contact created",
        "Add delay steps between each email",
        "Use 'If/then' branch: if email opened → send Touch 2 sooner",
        "Add 'Contact replies' as an unenrollment trigger",
    ]),
    ("Go High Level", [
        "Build a new Automation → trigger: Lead created",
        "Add SMS + email steps with wait timers",
        "Use the 'Conversation replied' trigger to stop sequence",
        "Tag leads as 'warm' when they click a link",
        "Route warm leads to your pipeline board automatically",
    ]),
    ("Make.com (Zapier alternative)", [
        "Trigger: New row in Google Sheets OR new CRM contact",
        "Action 1: Send email via Gmail/Mailgun",
        "Add a delay module (hours/days)",
        "Action 2: Send follow-up if no reply (check email thread)",
        "Action 3: Send Slack/WhatsApp notification when lead replies",
    ]),
    ("Spreadsheet + Zapier (no CRM)", [
        "Google Form → Google Sheet (lead capture)",
        "Zap: New row in Sheet → send email via Gmail",
        "Use Zapier Delay → send follow-up email Day 3",
        "Mark 'replied' manually → Zap stops sending",
        "Weekly: filter sheet for Day 7 leads → SMS manually or via Zap",
    ]),
]:
    story.append(Paragraph(tool, h3_style))
    for i, s in enumerate(steps, 1):
        story.append(Paragraph(f"{i}. {s}", item_style))
    story.append(Spacer(1, 3*mm))

# ── CHAPTER 5 ───────────────────────────────────────────────────────────────
story += section(5, "Escalation Logic — When to Hand Off to a Human")

story.append(Paragraph(
    "Automation handles the volume. Humans close the deals. "
    "Here's exactly when to trigger a human hand-off:", body_style))

escalation_data = [
    ["Signal", "What it means", "Action"],
    ["Lead replies to any touch", "Interested, engaged", "Notify rep immediately, remove from sequence"],
    ["Lead clicks CTA link 2+ times", "High intent", "Notify rep, move to 'hot' pipeline stage"],
    ["Lead books a call", "Ready to talk", "Confirm booking, prep rep with lead context"],
    ["Lead asks a specific question", "Research mode", "Rep responds personally within 1 hour"],
    ["Lead says 'not yet' / 'later'", "Timing issue", "Move to 30-day nurture, re-enter sequence"],
    ["No response after Touch 5", "Cold/unqualified", "Move to monthly newsletter list only"],
]
esc_table = Table(escalation_data, colWidths=[42*mm, 60*mm, 72*mm])
esc_table.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), PURPLE),
    ("TEXTCOLOR", (0,0), (-1,0), white),
    ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
    ("FONTSIZE", (0,0), (-1,-1), 8),
    ("ALIGN", (0,0), (-1,-1), "LEFT"),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [LIGHT_GRAY, white]),
    ("GRID", (0,0), (-1,-1), 0.5, GRAY),
    ("TOPPADDING", (0,0), (-1,-1), 6),
    ("BOTTOMPADDING", (0,0), (-1,-1), 6),
    ("LEFTPADDING", (0,0), (-1,-1), 6),
]))
story.append(esc_table)
story.append(Spacer(1, 4*mm))

# ── CHAPTER 6 ───────────────────────────────────────────────────────────────
story += section(6, "Implementation Checklist")

story.append(Paragraph("Week 1 — Build the foundation:", bold_body))
for item in [
    "Map your current lead sources (web form, referral, ads, social)",
    "Choose your automation tool (HubSpot free is a solid start)",
    "Write your 5 message templates (use Ch. 3 as base, personalise)",
    "Set up Touch 1 auto-acknowledgement — this alone will improve conversion",
    "Test the sequence end-to-end before going live",
]:
    story.append(Paragraph(f"☐  {item}", item_style))

story.append(Spacer(1, 3*mm))
story.append(Paragraph("Week 2 — Optimise:", bold_body))
for item in [
    "Add unenrollment triggers (reply, booking, click)",
    "Set up escalation notifications to your phone/Slack",
    "A/B test subject lines on Touch 1 and Touch 2",
    "Review open rates and click rates after first 20 leads",
    "Adjust timing based on when your audience is most responsive",
]:
    story.append(Paragraph(f"☐  {item}", item_style))

story.append(Spacer(1, 3*mm))
story.append(Paragraph("Week 3+ — Scale:", bold_body))
for item in [
    "Segment sequences by lead source (different message for ads vs referrals)",
    "Add a post-sale sequence (onboarding, review request, upsell)",
    "Build a re-engagement sequence for leads that went cold 60+ days ago",
    "Track close rate before vs after automation — present ROI internally",
]:
    story.append(Paragraph(f"☐  {item}", item_style))

# ── CTA ─────────────────────────────────────────────────────────────────────
story.append(Spacer(1, 6*mm))
story.append(HRFlowable(width="100%", thickness=1, color=PURPLE_LIGHT, spaceAfter=6))
story += callout(
    "<b>Want us to build this for you?</b><br/>"
    "We'll audit your current lead process, map the automation, and implement the full "
    "follow-up system in your existing tools — free 30-minute discovery session.<br/>"
    "<b>Book at: prismaiservices.netlify.app</b>",
    bg=CHECK_BG, border=PURPLE)

story.append(Spacer(1, 4*mm))
story.append(Paragraph(
    "© 2026 PRISM AI Services · prismaiservices.netlify.app · No hype. Only workflows that ship.",
    footer_style))

doc.build(story)
print(f"PDF built: {OUTPUT}")
