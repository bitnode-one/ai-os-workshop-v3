const pdfFiles = {
  "index.html": "handouts-uebersicht.pdf",
  "concepts.html": "00-grundbegriffe.pdf",
  "quickstart.html": "01-hermes-quickstart.pdf",
  "exercises.html": "02-uebungen-prompts.pdf",
  "local-ai.html": "03-lokale-ki-lm-studio.pdf",
  "security.html": "04-sicherheit-troubleshooting.pdf"
};
const currentFile = location.pathname.split("/").pop() || "index.html";
const pdfFile = pdfFiles[currentFile];
const actions = document.createElement("div");
actions.className = "handout-actions";
actions.innerHTML = `<a class="pdf-download" href="pdf/${pdfFile}" download>PDF herunterladen</a><button type="button" class="pdf-export">Druckdialog</button>`;
document.body.append(actions);

document.querySelector(".pdf-export").addEventListener("click", () => window.print());

const footer = document.querySelector("footer");
const legal = document.createElement("div");
legal.className = "handout-legal";
legal.innerHTML = `
  <strong>Max Peter</strong> ·
  <a href="https://www.linkedin.com/in/maxpeter/" target="_blank" rel="noreferrer">LinkedIn</a> ·
  <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="license noreferrer">CC BY-SA 4.0</a>
  <span>· Drittmaterial ausgenommen</span>`;
footer.append(legal);
