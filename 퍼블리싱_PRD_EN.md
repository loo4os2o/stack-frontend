아래 PRD 작성을 위한 프롬프트:

PRD 작성 지침서인데, 굳이 이렇게 단계를 거칠 필요는 없겠어. 그냥 PRD 를 작성해줘. 기획 내용은 굳이 필요 없겠고 PRD 내용은 기획서를 제공받아서 지침에 따른 퍼블리싱을 수행하는 PRD

---

## 1. Overview

A web‑based tool that ingests a planner’s document and automatically produces a wireframe‑level PRD—complete with HTML/CSS/JS skeleton code and designer/developer annotations—so publishers can hand off immediately to designers and developers.

## 2. Goals

- **Speed up** handoff from planning to design/development.
- **Standardize** wireframe outputs (HTML/CSS/JS) with structural placeholders.
- **Embed** guidance for designers (styling suggestions) and developers (data/API notes).
- **Minimize** manual wireframing effort while preserving clarity.

## 3. Target Users

- **Publishers** who prepare planning docs but lack coding skills.
- **Designers** needing structural templates and styling hints.
- **Developers** needing clear placeholders and integration notes.

## 4. Key Features

| Feature                   | Description                                                                                |
|---------------------------|--------------------------------------------------------------------------------------------|
| **Document Upload & Parsing** | Upload Word/PDF/Markdown planning docs; auto‑extract headings, sections, assets.           |
| **Q&A Clarification Widget**  | Interactive chat to ask missing details (e.g., “What sections go in the dashboard?”).      |
| **Wireframe Generator**       | Produce HTML/CSS wireframe placeholders with gray boxes, headings, and `<div>` structure.    |
| **Interaction Stubs**         | Generate minimal JS for common interactions (modals, tabs, simple form validation).        |
| **Designer Notes**            | In‑code comments or on‑screen text for styling guidance (colors, spacing, responsiveness). |
| **Developer Notes**           | In‑code comments for data/API integration, routing, state management hints.                |
| **Export Options**            | Download PRD as Markdown, ZIP of HTML/CSS/JS files, or view live preview in browser.       |
| **Next.js Toggle**            | Optional scaffolding instructions if user opts into Next.js for development phase.         |

## 5. User Stories

1. **As a publisher**, I want to upload my planning document so that the system can parse its structure automatically.
2. **As a publisher**, I want to answer follow‑up questions to clarify missing details before wireframe generation.
3. **As a publisher**, I want to generate a complete wireframe PRD (HTML/CSS/JS) so I can hand it off without extra coding.
4. **As a designer**, I want on‑screen placeholders with styling suggestions so I can apply visual design efficiently.
5. **As a developer**, I want embedded comments describing data bindings and integrations so I can implement functionality without ambiguity.
6. **As a publisher**, I want to export the PRD in Markdown and as code files so I can archive it in our wiki and share with the team.

## 6. Functional Requirements

### 6.1 Document Upload & Parsing

- **FR‑1**: Support `.docx`, `.pdf`, `.md` uploads up to 10 MB.
- **FR‑2**: Extract headings (H1–H4), lists, images, and tables.
- **FR‑3**: Display a parsed outline for review.

### 6.2 Interactive Clarification

- **FR‑4**: Chat interface that pulls context from parsed outline.
- **FR‑5**: Allow publisher to answer or skip questions; log decisions.

### 6.3 Wireframe HTML/CSS

- **FR‑6**: Generate plain HTML pages with `<header>`, `<aside>`, `<main>`, `<footer>` as needed.
- **FR‑7**: Use CSS classes `.placeholder`, `.wireframe-header`, `.wireframe-section`.
- **FR‑8**: Render gray backgrounds (`#ccc`) and borders (`1px solid #999`) for placeholders.

### 6.4 JavaScript Interaction Stubs

- **FR‑9**: Provide stub functions for “Open Modal,” “Submit Form,” “Toggle Sidebar.”
- **FR‑10**: Include inline comments indicating where to hook real logic.

### 6.5 Designer & Developer Guidance

- **FR‑11**: For each wireframe block, embed on‑screen text:
  - Title
  - Purpose description
  - “Designer: …” hint
  - “Developer: …” hint
- **FR‑12**: Alternatively, include the same in HTML comments.

### 6.6 Export & Preview

- **FR‑13**: Live preview pane showing rendered wireframes.
- **FR‑14**: Download options:
  - Single Markdown (`PRD.md`) with embedded code snippets.
  - ZIP archive (`wireframe.zip`) containing `index.html`, `styles.css`, `scripts.js`.
- **FR‑15**: “Use Next.js” checkbox toggles generation of a basic `pages/` scaffold.

## 7. Wireframe & Flow

1. **Landing Page**
   - **Upload widget**
   - **Parsed outline** preview
2. **Clarification Chat**
   - Sidebar with outline
   - Chat window for Q&A
3. **PRD Generation**
   - Button: “Generate Wireframe PRD”
   - Shows HTML/CSS/JS code blocks side by side with live preview
4. **Export**
   - Buttons: “Download Markdown” / “Download ZIP”

## 8. Technical Notes

- **Frontend**: React or vanilla JS; ensure minimal dependencies.
- **Parsing**: Use server‑side library (e.g., Pandoc or PDF.js + custom parser).
- **Styling**: SCSS or plain CSS; keep classes semantic.
- **Hosting**: Static export for HTML/CSS/JS; backend required only for upload & parse.
- **Optional**: Next.js scaffold if user opts in—generate `pages/index.js`, `_app.js`.

## 9. Non‑Functional Requirements

- **NFR‑1**: ≥ 90% uptime.
- **NFR‑2**: Response time for generation ≤ 5 s for a 10 page doc.
- **NFR‑3**: Secure file handling; delete uploads after 24 h.

## 10. Success Metrics

- **SM‑1**: 80% reduction in manual wireframe hours per project.
- **SM‑2**: ≥ 70% of publishers adopt the tool in first month.
- **SM‑3**: Designer/developer satisfaction ≥ 4/5 on handoff clarity.