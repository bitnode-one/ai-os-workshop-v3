# Changelog

Alle wesentlichen Inhalts-, Design-, Handout- und Funktionsänderungen werden hier dokumentiert.

## 3.3.2 · 2026-08-11

### Sprachumschaltung korrigiert

- Folien 16, 22, 25, 26, 27, 35 und 37 auf eine robuste Ein-Bild-Umschaltung umgestellt; beim Sprachwechsel wird die Bildquelle ersetzt, statt zwei Grafiken per CSS ein- und auszublenden
- Englische Grafik für Folie 37 mit `LOCAL` statt `LOKAL` ergänzt
- Fehlende Übersetzungen auf Folie 39 (`Very good`, `Controllable`) und Folie 41 (`Yes`) ergänzt
- Automatischen Regressionstest gegen doppelte Sprachgrafiken, fehlende Bildpaare und unmarkierte deutsche Tabellenwerte ergänzt
- Versionsgebundene CSS-/JavaScript-URLs ergänzt, damit GitHub Pages nach Updates keine veraltete Sprachlogik aus dem Browser-Cache verwendet
- Betroffene Folien in DE und EN mit lokalem Browser-Rendering geprüft

### Unverändert

- Inhalte und Reihenfolge aller 65 Präsentationsfolien
- Alle nicht ausdrücklich genannten Folien und Handouts

## 3.3.1 · 2026-07-27

### Hermes-Quickstart ergänzt

- Fedora-Voraussetzungen mit `dnf` für Git, curl, xz, C++-Compiler und make ergänzt
- Fedora-Entwicklungswerkzeuggruppe als alternative Installation dokumentiert
- Hermes-Einzel-PDF und vollständiges Handout-Paket neu erzeugt

### Unverändert

- Inhalte und Reihenfolge aller 65 Präsentationsfolien
- Alle nicht ausdrücklich genannten Handout-Inhalte

## 3.3.0 · 2026-07-27

### PDF-Publikation

- Eigenständiges A4-Printdesign im Stil der Handout-Webseiten mit Farben, Karten, Codeblöcken und Tabellen erstellt
- Playwright-Generator für sechs Einzel-PDFs und ein zusammengeführtes Gesamtpaket ergänzt
- Klickbare Links, Dokumentmetadaten, Seitenzahlen sowie Max-Peter- und CC-BY-SA-Footer integriert
- Direkte PDF-Downloadlinks in allen Handouts und auf der Handout-Übersicht ergänzt
- Browser-Druckdialog als Offline-Fallback beibehalten
- Automatische PDF-Erzeugung in den GitHub-Pages-Workflow integriert
- PDF-Seiten vollständig gerendert und visuell auf Umbrüche, Lesbarkeit und Layoutfehler geprüft

### Unverändert

- Inhalte und Reihenfolge aller 65 Präsentationsfolien
- Inhaltliche Substanz der bestehenden Handouts und Übungen

## 3.2.0 · 2026-07-27

### Handouts erweitert

- Referentenprofil mit Profilfoto, Schwerpunkten und LinkedIn auf der Handout-Übersicht ergänzt
- Einheitlichen Footer mit Max Peter, LinkedIn, CC BY-SA 4.0 und Drittmaterial-Hinweis in alle Handouts integriert
- Hermes-Quickstart um offiziellen Windows-PowerShell-Installer, Prüfung und Desktop-Start ergänzt
- Linux-Quickstart für Debian/Ubuntu um Voraussetzungen, offiziellen Installer, Diagnose, Desktop-Build und Nous-Portal-Setup ergänzt
- Aktualitätsstand und Links zu offizieller Installation und Plattformmatrix ergänzt
- Schaltfläche „Als PDF speichern“ in jedes Handout integriert; Export erfolgt offline über den Browser-Druckdialog
- Automatische Prüfung für gemeinsame Handout-Lizenz- und PDF-Funktion ergänzt

### Unverändert

- Inhalte und Reihenfolge aller 65 Präsentationsfolien
- Bestehende Übungen, Prompts und LM-Studio-Anleitungen

## 3.1.1 · 2026-07-27

### Hinzugefügt

- Referentenprofil und LinkedIn-Link in der Repository-README
- Eigenständige `LICENSE.md` mit CC-BY-SA-4.0-Bedingungen, Attributionsvorschlag und Ausnahmen
- Dezenter, klickbarer Hinweis `© Max Peter · CC BY-SA 4.0` auf allen 65 Präsentationsfolien
- Automatischer Regressionstest für den folienweiten Lizenzhinweis

### Unverändert

- Inhalte und Reihenfolge aller 65 Folien
- Sämtliche Handouts, Übungen, Demos und Setup-Anleitungen

## 3.1.0 · 2026-07-27

### Hinzugefügt

- Folie 64: bilinguales Profil von Max Peter mit lokal eingebettetem Profilfoto und aktivem LinkedIn-Link
- Folie 65: bilinguale Lizenzinformation zu CC BY-SA 4.0 einschließlich Hinweis auf ausgenommenes Drittmaterial
- Release 3.0.1 mit 63 Folien und Git-Commit `f54bbcc` als unveränderliche Workshop-Baseline festgeschrieben
- Additive Änderungsregel: neue Inhalte werden angehängt; Korrekturen sind nur an ausdrücklich genannten Folien zulässig

### Unverändert

- Alle bisherigen 63 Präsentationsfolien
- Sämtliche Handouts, Übungen, Demos und Setup-Anleitungen

## 3.0.1 · 2026-07-25

### Korrigiert

- Warm-up zu Erfahrung, Delegationswünschen und persönlichen Grenzen ergänzt
- Symbole für Chat, Assistenz und Agent sprachneutral und eindeutiger gestaltet
- Tool Use als Kette von Alltagssprache über Code zum Taschenrechner-Ergebnis erklärt
- Harness, RAG, Second Brain, Command und MCP verständlich definiert
- Quantisierung mit Bildvergleich und Q4-Beispiel ergänzt
- Abkürzungslexikon für AI/KI, LLM, RAG, MCP, API, OAuth, TTS, GGUF, RAM/VRAM und Q4 ergänzt
- KI-OS-Architektur heller, großzügiger und weniger gedrängt neu aufgebaut
- Peer-Review-Formulierung verständlicher gefasst
- Modell- und Quellenlinks sichtbar und direkt anklickbar gemacht
- Automatische Veröffentlichung als direkt aufrufbare GitHub-Pages-Webseite ergänzt

### Entfernt · ausdrücklich genehmigt

- Interne Codex-/Surface-Book-Setupfolie und zugehöriges Notebook-Handout
- Interner Surface-Book-/MINISFORUM-/Remote-Infrastrukturvergleich
- Genehmigungen: `REM-2026-07-25-01` und `REM-2026-07-25-02`

## 3.0.0 · 2026-07-24

### Hinzugefügt

- 62 bilinguale Folien für eine vierstündige, zeitlich gegliederte Lernreise
- Helles, warmes Grunddesign mit gezielten dunklen Kapitel- und Risikofolien
- Sechs neue didaktische SVG-Illustrationen und editierbare Excalidraw-Architektur
- Hermes-News-Radar, Dokumenten-Workflow, Agent Canvas und Lokal-/Cloud-Vergleich
- Hermes-Quickstart mit Nous Portal, Codex OAuth, Grok OAuth, SOUL.md und Voice-Hinweisen
- Hardware-Prüfprompt, LM-Studio-Server-Setup und Hermes-Anbindung
- Ausführliche mobile und druckbare Handouts mit mindestens zwei Prompts je Kernübung
- Home-, Übersichts-, Sprach-, QR-, Vollbild- und Timer-Steuerung außerhalb der Folien
- Lokale QR-Erzeugung sowie LAN-, Android-, Touch-, Offline- und Druckunterstützung
- Automatisierte Struktur-, Link-, Governance- und Notebook-Prüfungen

### Konsolidiert

- V1-Dramaturgie, Kapitelzeiten, Übungen und Handout-Tiefe
- V2-Geschichte, Beschleunigung, Chancen/Risiken, KI-OS und lokale KI
- Keine Baseline-Inhalte entfernt; keine Löschfreigabe erforderlich

## 2.0.0 · 2026-07-24

### Hinzugefügt

- Bilinguale Präsentation mit 50 Folien
- Geschichte, Beschleunigung, Chancen und Risiken der KI-Entwicklung
- Erweiterte KI-Grundlagen und KI-OS-Architektur
- System- und Modellvergleiche
- LAN-, Android-, Touch- und QR-Unterstützung

### Regressionen gegenüber V1

- Weniger Demonstrationen, Übungen und konkrete Kommunikationsbeispiele
- Keine Kapitelzeitplanung
- Deutlich dunkleres und technischeres Design
- Stark komprimierte Setup- und Übungshandouts
- Bedienelemente überlagern teilweise Kapitelkennzeichnungen

## 1.0.0 · 2026-07-24

### Enthalten

- 43 Folien mit fünf zeitlich gekennzeichneten Kapiteln
- Didaktische Entwicklung vom Chat zum Handeln
- Use-Case-Beispiele, Live-Demo und Mini-Agent-Praxisblock
- Ausführliche Hermes-, LM-Studio- und Übungshandouts
