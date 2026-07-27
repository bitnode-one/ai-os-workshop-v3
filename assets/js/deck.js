const slides = [...document.querySelectorAll(".slide")];
const deck = document.querySelector(".deck");
const progress = document.querySelector(".progress-bar");
const counter = document.querySelector(".counter");
const elapsed = document.querySelector(".elapsed");
const overview = document.querySelector(".overview");
const qrDialog = document.querySelector(".qr-dialog");
const qrCode = document.querySelector(".qr-code");
const qrUrl = document.querySelector(".qr-url");
const startedAt = Date.now();
let current = Math.min(Math.max(Number(location.hash.slice(1)) || 1, 1), slides.length) - 1;
let language = localStorage.getItem("ai-os-language") || "de";
let pointerStart;
let suppressClickUntil = 0;
let timerHandle;
let timerRemaining = 8 * 60;

for (const slide of slides) {
  const license = document.createElement("a");
  license.className = "slide-license";
  license.href = "https://creativecommons.org/licenses/by-sa/4.0/";
  license.target = "_blank";
  license.rel = "license noreferrer";
  license.title = "Max Peter · Creative Commons BY-SA 4.0";
  license.setAttribute("aria-label", "Max Peter · Creative Commons BY-SA 4.0");
  license.textContent = "© Max Peter · CC BY-SA 4.0";
  slide.append(license);
}

function titleFor(slide) {
  return language === "de" ? slide.dataset.titleDe : slide.dataset.titleEn;
}

function sectionFor(slide) {
  return language === "de" ? slide.dataset.sectionDe : slide.dataset.sectionEn;
}

function applyLanguage(nextLanguage) {
  language = nextLanguage;
  document.body.classList.toggle("lang-de", language === "de");
  document.body.classList.toggle("lang-en", language === "en");
  document.documentElement.lang = language;
  document.querySelector(".language").textContent = language === "de" ? "DE / EN" : "EN / DE";
  localStorage.setItem("ai-os-language", language);
  renderOverview();
  show(current, false);
}

function show(index, updateHash = true) {
  current = Math.min(Math.max(index, 0), slides.length - 1);
  slides.forEach((slide, position) => {
    slide.classList.toggle("is-active", position === current);
    slide.setAttribute("aria-hidden", String(position !== current));
  });
  const slide = slides[current];
  slide.dataset.section = sectionFor(slide);
  progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  counter.textContent = `${String(current + 1).padStart(2, "0")} / ${slides.length}`;
  document.title = `${titleFor(slide)} · ${current + 1}/${slides.length}`;
  if (updateHash) history.replaceState(null, "", `#${current + 1}`);
}

function renderOverview() {
  overview.innerHTML = slides.map((slide, index) => `
    <button data-slide="${index}" class="${index === current ? "is-current" : ""}">
      <span>${String(index + 1).padStart(2, "0")}</span>${titleFor(slide)}
    </button>`).join("");
}

function toggleOverview() {
  renderOverview();
  overview.classList.toggle("is-open");
}

async function getShareUrl() {
  try {
    const response = await fetch("/__workshop.json", { cache: "no-store" });
    if (response.ok) {
      const status = await response.json();
      if (status.lanUrls?.length) return `${status.lanUrls[0]}/#${current + 1}`;
    }
  } catch {}
  return location.href;
}

async function openQr() {
  const url = await getShareUrl();
  qrUrl.textContent = url;
  const code = window.qrcode(0, "M");
  code.addData(url);
  code.make();
  qrCode.innerHTML = code.createSvgTag({ cellSize: 7, margin: 2, scalable: true });
  qrDialog.classList.add("is-open");
}

function closeQr() {
  qrDialog.classList.remove("is-open");
}

function fitMobileDeck() {
  if (innerWidth > 1100) {
    deck.style.removeProperty("--mobile-scale");
    return;
  }
  const scale = Math.min(innerWidth / 1280, (innerHeight - 54) / 720);
  deck.style.setProperty("--mobile-scale", String(scale));
}

function updateElapsed() {
  const seconds = Math.floor((Date.now() - startedAt) / 1000);
  const minutes = Math.floor(seconds / 60);
  elapsed.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function activeTimerDisplay() {
  return slides[current].querySelector(".timer-box strong");
}

function renderTimer() {
  const display = activeTimerDisplay();
  if (!display) return;
  const minutes = Math.floor(timerRemaining / 60);
  const seconds = timerRemaining % 60;
  display.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function toggleExerciseTimer() {
  if (!activeTimerDisplay()) return;
  if (timerHandle) {
    clearInterval(timerHandle);
    timerHandle = undefined;
    return;
  }
  timerHandle = setInterval(() => {
    timerRemaining = Math.max(0, timerRemaining - 1);
    renderTimer();
    if (timerRemaining === 0) {
      clearInterval(timerHandle);
      timerHandle = undefined;
    }
  }, 1000);
}

document.addEventListener("keydown", (event) => {
  if (["ArrowRight", "PageDown", " "].includes(event.key)) show(current + 1);
  if (["ArrowLeft", "PageUp"].includes(event.key)) show(current - 1);
  if (event.key === "Home") show(0);
  if (event.key === "End") show(slides.length - 1);
  if (event.key.toLowerCase() === "o") toggleOverview();
  if (event.key.toLowerCase() === "l") applyLanguage(language === "de" ? "en" : "de");
  if (event.key.toLowerCase() === "f") document.documentElement.requestFullscreen?.();
  if (event.key.toLowerCase() === "h") location.href = "handouts/";
  if (event.key.toLowerCase() === "q") openQr();
  if (event.key.toLowerCase() === "t") toggleExerciseTimer();
  if (event.key === "Escape") {
    overview.classList.remove("is-open");
    closeQr();
  }
});

document.addEventListener("click", (event) => {
  if (Date.now() < suppressClickUntil) return;
  const jump = event.target.closest("[data-slide]");
  if (jump) {
    show(Number(jump.dataset.slide));
    overview.classList.remove("is-open");
    return;
  }
  if (event.target.closest("a,button,.qr-dialog")) return;
  if (innerWidth <= 1100 && event.clientX < innerWidth * .28) show(current - 1);
  else show(current + 1);
});

document.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" || event.target.closest("a,button,.overview,.qr-dialog")) return;
  pointerStart = { x: event.clientX, y: event.clientY };
});

document.addEventListener("pointerup", (event) => {
  if (!pointerStart) return;
  const deltaX = event.clientX - pointerStart.x;
  const deltaY = event.clientY - pointerStart.y;
  pointerStart = undefined;
  if (Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;
  suppressClickUntil = Date.now() + 400;
  show(current + (deltaX < 0 ? 1 : -1));
});

document.querySelector(".home").addEventListener("click", () => show(0));
document.querySelector(".previous").addEventListener("click", () => show(current - 1));
document.querySelector(".next").addEventListener("click", () => show(current + 1));
document.querySelector(".overview-toggle").addEventListener("click", toggleOverview);
document.querySelector(".handouts").addEventListener("click", () => location.href = "handouts/");
document.querySelector(".language").addEventListener("click", () => applyLanguage(language === "de" ? "en" : "de"));
document.querySelector(".qr-open").addEventListener("click", openQr);
document.querySelector(".fullscreen").addEventListener("click", () => document.documentElement.requestFullscreen?.());
document.querySelector(".qr-close").addEventListener("click", closeQr);
qrDialog.addEventListener("click", (event) => {
  if (event.target === qrDialog) closeQr();
});
document.querySelector(".qr-copy").addEventListener("click", async () => {
  await navigator.clipboard.writeText(qrUrl.textContent);
});
window.addEventListener("hashchange", () => show((Number(location.hash.slice(1)) || 1) - 1, false));
window.addEventListener("resize", fitMobileDeck);

setInterval(updateElapsed, 1000);
fitMobileDeck();
applyLanguage(language);
updateElapsed();
