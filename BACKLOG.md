# Workshop Backlog

Dieses Backlog ist die verbindliche Arbeitsliste für V3 und folgende Releases. Inhalte dürfen nur als erledigt markiert werden, wenn sie im Release enthalten und geprüft sind.

## P0 · Muss für V3

- [x] V1 als didaktische Basis und V2 als fachliche Erweiterung konsolidieren
- [x] 55 Kernfolien plus optionalen Anhang erstellen
- [x] Kapitelzeiten auf insgesamt 240 Minuten abstimmen
- [x] Helles, warmes Design mit gezielten dunklen Fokusfolien umsetzen
- [x] Durchgehendes Beispiel vom Chat über Agent bis zum KI-OS integrieren
- [x] News-Radar als erste Hermes-Desktop-Demo integrieren
- [x] Dokumente-zu-Entscheidungen als Teilnehmerübung integrieren
- [x] Hermes-Desktop-Quickstart mit Nous Portal und Provideralternativen integrieren
- [x] Modellwahl nach Aufgabenklassen erklären
- [x] SOUL.md, sichere Grundeinstellungen und Voice/TTS als Bonus behandeln
- [x] LM Studio installieren, anbinden und mit demselben Testauftrag vergleichen
- [x] Sämtliche Übungen mit mindestens zwei Beispiel-Prompts in Handouts abbilden
- [x] V1-Handouts als Mindeststandard wiederherstellen und erweitern
- [x] Sichtbaren Home-Button ergänzen
- [x] QR- und Bedienelemente außerhalb der Inhaltsfläche anordnen
- [x] QR-Code vollständig lokal erzeugen
- [x] Deutsch/Englisch-Parität prüfen
- [x] Desktop-, Android-, Druck- und Offline-QA durchführen

## P1 · Sollte für V3

- [x] Bilinguales Referentenprofil mit lokalem Profilfoto und LinkedIn ergänzen
- [x] CC-BY-SA-4.0-Lizenzfolie einschließlich Drittmaterial-Hinweis ergänzen
- [x] Profil und Lizenzbedingungen im Repository dokumentieren
- [x] Klickbaren CC-BY-SA-4.0-Hinweis auf jeder Folie anzeigen
- [x] Illustrationen für Modell, Kontext, Harness, Memory, Skills, MCP und Loops erstellen
- [ ] Offline-Fallback für News-Demo bereitstellen
- [ ] Trainerhinweise und erwartete Demo-Ergebnisse ergänzen
- [x] Mobiler Lesemodus ergänzen
- [x] Aktualisierbare Modellübersicht als Anhang und Handout bereitstellen
- [ ] Teilnehmer- und Traineransicht der Übungen unterscheiden

## P2 · Später

- [ ] Präsentationsmodus mit automatisch ausgeblendeter Steuerleiste
- [ ] Export der Handouts als getrennte DE- und EN-PDFs
- [ ] Optionaler Presenter View mit Notizen und Timer
- [x] Veröffentlichung über GitHub Pages

## Entscheidungsregeln

- Release 3.0.1 mit 63 Folien ist die eingefrorene Workshop-Baseline.
- Neue Inhalte werden angehängt; bestehende Folien bleiben unverändert.
- Korrekturen sind nur an ausdrücklich genannten Folien zulässig.
- Inhalte werden nicht stillschweigend entfernt.
- Jede Entfernung benötigt vorab einen Eintrag in `REMOVAL-APPROVALS.json`.
- Entfernte oder wesentlich gekürzte Inhalte werden im `CHANGELOG.md` dokumentiert.
- Neue Releases müssen `npm run check:governance` bestehen.
