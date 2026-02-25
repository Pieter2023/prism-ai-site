#!/usr/bin/env python3
"""Build the SMB Automation Audit Checklist PDF."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.enums import TA_LEFT, TA_CENTER
import os

OUTPUT = os.path.join(os.path.dirname(__file__), "smb-automation-audit-checklist.pdf")

# Brand colours
PURPLE = HexColor("#6C3CE1")
PURPLE_LIGHT = HexColor("#8B5CF6")
CYAN = HexColor("#06B6D4")
BG_DARK = HexColor("#0F0F1A")
GRAY = HexColor("#94A3B8")
LIGHT_GRAY = HexColor("#F1F5F9")
DARK_TEXT = HexColor("#1E293B")
CHECK_BG = HexColor("#F8F5FF")

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    rightMargin=18*mm,
    leftMargin=18*mm,
    topMargin=18*mm,
    bottomMargin=18*mm,
)

styles = getSampleStyleSheet()

title_style = ParagraphStyle("Title", fontSize=26, textColor=PURPLE, fontName="Helvetica-Bold",
                              spaceAfter=4, alignment=TA_CENTER)
subtitle_style = ParagraphStyle("Subtitle", fontSize=13, textColor=GRAY, fontName="Helvetica",
                                 spaceAfter=2, alignment=TA_CENTER)
tagline_style = ParagraphStyle("Tagline", fontSize=10, textColor=GRAY, fontName="Helvetica-Oblique",
                                spaceAfter=12, alignment=TA_CENTER)
section_style = ParagraphStyle("Section", fontSize=14, textColor=white, fontName="Helvetica-Bold",
                                spaceAfter=6, spaceBefore=14, backColor=PURPLE,
                                leftIndent=-4, borderPad=6)
section_label = ParagraphStyle("SectionLabel", fontSize=14, textColor=PURPLE, fontName="Helvetica-Bold",
                                spaceAfter=4, spaceBefore=14)
item_style = ParagraphStyle("Item", fontSize=10, textColor=DARK_TEXT, fontName="Helvetica",
                              spaceAfter=2, leftIndent=8, leading=16)
note_style = ParagraphStyle("Note", fontSize=9, textColor=GRAY, fontName="Helvetica-Oblique",
                              spaceAfter=8, leftIndent=8)
footer_style = ParagraphStyle("Footer", fontSize=8, textColor=GRAY, fontName="Helvetica",
                               alignment=TA_CENTER)
intro_style = ParagraphStyle("Intro", fontSize=10, textColor=DARK_TEXT, fontName="Helvetica",
                               spaceAfter=8, leading=16)
score_label = ParagraphStyle("ScoreLabel", fontSize=10, textColor=DARK_TEXT, fontName="Helvetica-Bold",
                               spaceAfter=3)

def checkbox(text, note=None):
    items = [Paragraph(f"☐  {text}", item_style)]
    if note:
        items.append(Paragraph(f"    ↳ {note}", note_style))
    return items

def section(number, title):
    return [
        Spacer(1, 4*mm),
        Paragraph(f"SECTION {number}: {title.upper()}", section_label),
        HRFlowable(width="100%", thickness=2, color=PURPLE, spaceAfter=6),
    ]

story = []

# Header
story.append(Spacer(1, 6*mm))
story.append(Paragraph("PRISM AI", title_style))
story.append(Paragraph("SMB Automation Audit Checklist", subtitle_style))
story.append(Paragraph("Identify what to automate first — and stop leaking time and revenue", tagline_style))
story.append(HRFlowable(width="100%", thickness=1, color=PURPLE_LIGHT, spaceAfter=8))

# Intro
story.append(Paragraph(
    "This checklist helps you map your current workflows, identify the biggest automation "
    "opportunities, and prioritise what to fix first. Work through each section honestly. "
    "The more boxes you tick, the more time and money you're leaving on the table.",
    intro_style
))
story.append(Paragraph(
    "Score guide: <b>0–10 boxes checked</b> = strong foundation · "
    "<b>11–20</b> = moderate opportunity · <b>21+</b> = significant automation ROI available",
    intro_style
))
story.append(Spacer(1, 4*mm))

# Section 1
story += section(1, "Lead Capture & Response")
for item, note in [
    ("New leads are entered manually into your CRM", "Every manual entry = delay + errors"),
    ("Lead source is not automatically tracked", None),
    ("First response to a new lead takes more than 1 hour", "Speed to lead = conversion rate"),
    ("Follow-up reminders are set manually", None),
    ("No automated acknowledgement email/SMS on lead submission", None),
    ("Leads from different sources (web, phone, referral) land in different places", None),
    ("You rely on memory or sticky notes to track follow-ups", None),
]:
    story += checkbox(item, note)

# Section 2
story += section(2, "Sales Pipeline & Follow-Up")
for item, note in [
    ("Pipeline stages are updated manually after each interaction", None),
    ("No automated follow-up sequence after initial contact", "Most deals close on follow-up 5–8"),
    ("Proposals/quotes are built from scratch each time", None),
    ("No automated reminder when a deal goes cold (no activity 3+ days)", None),
    ("Win/loss data is not tracked or analysed automatically", None),
    ("Onboarding a new client requires manual steps each time", None),
]:
    story += checkbox(item, note)

# Section 3
story += section(3, "Operations & Internal Workflows")
for item, note in [
    ("Team task assignment happens via WhatsApp/email/verbal", None),
    ("Weekly reports are built manually", "If it takes >30 min, automate it"),
    ("Invoices are created and sent manually", None),
    ("No automated payment reminders for overdue invoices", None),
    ("Staff onboarding has no documented automated checklist", None),
    ("Recurring tasks (weekly/monthly) are not automated or templated", None),
    ("Data is copied between systems manually (e.g. CRM → spreadsheet)", None),
]:
    story += checkbox(item, note)

# Section 4
story += section(4, "Customer Communication")
for item, note in [
    ("No automated appointment reminders to clients", "Reduces no-shows by up to 80%"),
    ("Post-service follow-up is manual or doesn't happen", None),
    ("No automated review/testimonial request after job completion", None),
    ("Client status updates require manual messages", None),
    ("FAQ responses are written from scratch each time", None),
    ("No chatbot or AI handling after-hours enquiries", None),
]:
    story += checkbox(item, note)

# Section 5
story += section(5, "Reporting & Analytics")
for item, note in [
    ("Revenue/pipeline reports require manual data pulls", None),
    ("No dashboard showing real-time lead-to-close metrics", None),
    ("Marketing spend vs revenue attribution is not tracked automatically", None),
    ("Team performance data requires manual compilation", None),
    ("No automated alert when a KPI drops below threshold", None),
]:
    story += checkbox(item, note)

# Score box
story.append(Spacer(1, 6*mm))
score_data = [
    ["MY SCORE", "PRIORITY AUTOMATION", "ESTIMATED TIME SAVED/WEEK"],
    ["_____ / 31", "________________________", "________________________"],
]
score_table = Table(score_data, colWidths=[50*mm, 70*mm, 65*mm])
score_table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), PURPLE),
    ("TEXTCOLOR", (0, 0), (-1, 0), white),
    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
    ("FONTSIZE", (0, 0), (-1, 0), 9),
    ("FONTNAME", (0, 1), (-1, 1), "Helvetica"),
    ("FONTSIZE", (0, 1), (-1, 1), 10),
    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [LIGHT_GRAY]),
    ("GRID", (0, 0), (-1, -1), 0.5, GRAY),
    ("TOPPADDING", (0, 0), (-1, -1), 8),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
]))
story.append(score_table)

# CTA
story.append(Spacer(1, 6*mm))
story.append(HRFlowable(width="100%", thickness=1, color=PURPLE_LIGHT, spaceAfter=6))
cta_data = [[
    Paragraph("<b>Want us to do this audit for you?</b><br/>"
              "We'll map your workflows, identify your top 3 automation wins, and give you "
              "a prioritised implementation plan — free 30-minute session.<br/>"
              "<b>Book at: prismaiservices.netlify.app</b>", 
              ParagraphStyle("CTA", fontSize=10, textColor=DARK_TEXT, fontName="Helvetica", leading=16))
]]
cta_table = Table(cta_data, colWidths=[174*mm])
cta_table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), CHECK_BG),
    ("BOX", (0, 0), (-1, -1), 1.5, PURPLE),
    ("TOPPADDING", (0, 0), (-1, -1), 12),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ("LEFTPADDING", (0, 0), (-1, -1), 14),
    ("RIGHTPADDING", (0, 0), (-1, -1), 14),
]))
story.append(cta_table)

story.append(Spacer(1, 4*mm))
story.append(Paragraph("© 2026 PRISM AI Services · prismaiservices.netlify.app · No hype. Only workflows that ship.", footer_style))

doc.build(story)
print(f"PDF built: {OUTPUT}")
