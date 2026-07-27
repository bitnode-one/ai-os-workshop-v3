const actions = document.createElement("div");
actions.className = "handout-actions";
actions.innerHTML = '<button type="button" class="pdf-export">Als PDF speichern</button>';
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
