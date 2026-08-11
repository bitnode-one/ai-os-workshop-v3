# Zentrale Agenten-Steuerdatei

Diese Datei gilt für das gesamte Repository. Sie ist der zentrale Einstiegspunkt für Menschen und KI-Agenten, die Präsentation, Handouts, Grafiken, Release-Dateien oder Projektsteuerung bearbeiten.

Direkte Anweisungen des Nutzers haben Vorrang. Danach gelten diese Datei und die hier referenzierten Steuerdateien. Bei Widersprüchen ist die strengere Regel anzuwenden und der Konflikt vor einer Änderung offenzulegen.

## 1. Verbindlicher Ausgangsstand

- Aktuelle eingefrorene Workshop-Baseline: Release `3.3.2`
- Umfang: 65 Präsentationsfolien und 6 Handout-Seiten
- Validierter Inhalts-Commit: `7f608ad`
- Governance-Commit der eingefrorenen Baseline: `298d656`
- Unveränderliches Git-Tag: `v3.3.2`
- Prüfsummen-Snapshot: `baselines/3.3.2.json`
- Historische Konsolidierungsbasis: Release `3.0.1`, Commit `f54bbcc`

Das Tag `v3.3.2` darf niemals verschoben, überschrieben oder neu gesetzt werden. Künftige Änderungen erfolgen auf einem neuen Release-Stand.

## 2. Nicht verhandelbare Direktiven

1. **Nur ausdrücklich genannte Inhalte ändern.** Bei Korrekturaufträgen dürfen ausschließlich die genannten Folien, Handouts oder Dateien verändert werden.
2. **Keine stillen Entfernungen.** Vor vollständiger oder teilweiser Entfernung eines Inhalts ist eine ausdrückliche Genehmigung gemäß `REMOVAL-REQUEST-TEMPLATE.md` einzuholen und in `REMOVAL-APPROVALS.json` zu dokumentieren.
3. **Keine Regressionen gegenüber der Baseline.** Nicht genannte Inhalte, Reihenfolgen, Übungen, Beispiele, Grafiken, Links und Handouts bleiben erhalten.
4. **Neue Inhalte bevorzugt additiv ergänzen.** Bestehende Folien werden nicht umgebaut, wenn eine zusätzliche Folie oder ein Anhang denselben Zweck erfüllt.
5. **Deutsch und Englisch besitzen denselben Informationsumfang.** Übersetzt werden auch SVG-Texte, Tabellenzellen, Diagramme, Buttons, Alternativtexte und Links.
6. **Pro lokalisierter Grafik genau ein DOM-Bild.** Sprachvarianten werden über `data-src-de`, `data-src-en`, `data-alt-de` und `data-alt-en` umgeschaltet. Zwei parallele Sprachbilder sind verboten.
7. **Handouts sind Teil des Produkts.** Jede Übung, jeder Prompt und jeder Setup-Schritt der Präsentation muss vollständig im passenden Handout verfügbar sein.
8. **Keine internen Inhalte veröffentlichen.** Geräteberatung, persönliche Infrastrukturfragen, Arbeitsdateien und interne Quellen gehören nicht in Präsentation oder öffentliche Handouts, sofern dies nicht ausdrücklich verlangt wird.
9. **Keine externen Laufzeitabhängigkeiten.** Präsentation und QR-Funktion müssen offline ohne externe JavaScript- oder CSS-Dienste funktionieren.
10. **Cache-Sicherheit erhalten.** CSS und JavaScript werden mit der aktuellen Release-Version als Cache-Buster geladen.
11. **Baseline niemals still aktualisieren.** Ein Hash-Fehler wird nicht durch einfaches Neuschreiben der Prüfsummen behoben. Er erfordert Prüfung, Freigabe, Versionsänderung und Changelog.
12. **Temporäre Dateien entfernen.** Screenshots, Render-Skripte und Testartefakte werden vor Abschluss aus `tmp/` und dem Git-Status entfernt.

## 3. Repository-Struktur

| Pfad | Zweck |
|---|---|
| `index.html` | Vollständiger bilingualer HTML-Foliensatz |
| `assets/css/` | Präsentationsdesign und Druckregeln |
| `assets/js/` | Navigation, Sprache, QR, Timer und Bedienlogik |
| `assets/images/` | Flyer, Profilbild und Rasterbilder |
| `assets/illustrations/` | Eigene SVG-Illustrationen und Sprachvarianten |
| `assets/diagrams/` | KI-OS-Architektur als SVG und editierbare Excalidraw-Quelle |
| `assets/vendor/` | Lokal eingebettete Laufzeitbibliotheken |
| `handouts/` | Web-Handouts, Styles, Funktionen und PDF-Downloads |
| `handouts/pdf/` | Erzeugte Einzel-PDFs und Gesamtpaket |
| `tools/` | Server, Qualitäts-, Governance-, PDF- und Baseline-Prüfungen |
| `baselines/` | Unveränderliche Prüfsummen-Snapshots veröffentlichter Releases |
| `.github/workflows/` | GitHub-Pages-Build und Deployment |

## 4. Steuerdateien und Rangfolge

| Datei | Verbindliche Funktion |
|---|---|
| `AGENTS.md` | Zentraler Einstieg und Arbeitsregeln für alle Agenten |
| `RELEASE-CRITERIA.md` | Qualitätsanforderungen und Definition of Done |
| `CONTENT-BASELINE.json` | Append-only-Liste aller dauerhaft geschützten Inhalts- und Feature-IDs |
| `CONTENT-MANIFEST.json` | Aktueller Sollumfang und Status der Inhalte, Handouts und Funktionen |
| `BACKLOG.md` | Verbindliche offene und erledigte Anforderungen |
| `CHANGELOG.md` | Nachvollziehbare Änderungen je Release und Governance-Schritt |
| `LESSONS-LEARNED.md` | Technische und organisatorische Erkenntnisse aus bisherigen Regressionen |
| `REMOVAL-APPROVALS.json` | Genehmigungsnachweis für Inhaltsentfernungen |
| `REMOVAL-REQUEST-TEMPLATE.md` | Pflichtformat für beantragte Entfernungen oder wesentliche Kürzungen |
| `baselines/<version>.json` | Hash-Snapshot der ausgelieferten Dateien eines eingefrorenen Releases |
| `NOTEBOOK-SETUP.md` | Anforderungen und Prüfung des Präsentationsrechners |
| `LICENSE.md` | CC-BY-SA-4.0-Lizenz und Ausnahmen |
| `THIRD_PARTY_NOTICES.md` | Hinweise und Rechte zu Drittmaterial |

## 5. Arbeitsablauf für Änderungen

1. `AGENTS.md`, `RELEASE-CRITERIA.md`, `CONTENT-BASELINE.json`, `CONTENT-MANIFEST.json`, `BACKLOG.md` und den aktuellen Changelog lesen.
2. Git-Status prüfen und vorhandene fremde Änderungen nicht überschreiben.
3. Betroffene Folien anhand der tatsächlichen laufenden Nummer und möglichst der stabilen `data-content-id` identifizieren.
4. Änderungsumfang schriftlich auf die explizit genannten Inhalte begrenzen.
5. Bei einer Entfernung vorab den Genehmigungsprozess durchführen.
6. Änderung minimal und im bestehenden Designsystem umsetzen.
7. DE- und EN-Fassung einschließlich eingebetteter Grafiktexte aktualisieren.
8. Betroffene Handouts und PDFs nur dann anpassen, wenn der Auftrag sie betrifft oder Präsentationsinhalte sonst fehlen würden.
9. Backlog, Manifest und Changelog passend zum tatsächlichen Umfang aktualisieren.
10. Automatische Prüfungen und visuelle DE/EN-Validierung durchführen.
11. Temporäre Artefakte löschen und finalen Git-Diff kontrollieren.
12. Nur auf ausdrücklichen Wunsch committen, taggen oder pushen. Ein bestehendes Release-Tag wird nie verändert.

## 6. Pflichtprüfungen

```powershell
npm run check
npm run check:baseline
npm run check:governance
```

Zusätzlich bei relevanten Änderungen:

```powershell
npm run build:pdf
npm run check:notebook
```

### Visuelle Mindestprüfung

- Jede geänderte Folie in Deutsch und Englisch rendern.
- Pro lokalisierter Folie genau eine sichtbare Grafik bestätigen.
- Richtige Sprachdatei und Alternativtext bestätigen.
- Textüberlauf, Überlagerung, abgeschnittene Inhalte und unlesbare Links prüfen.
- Handout-PDFs nach Neuerzeugung seitenweise auf Umbrüche und Lesbarkeit prüfen.
- GitHub-Pages-Version nach dem Deployment mit der lokalen Version vergleichen.

## 7. Umgang mit Baseline-Fehlern

Wenn `npm run check:baseline` fehlschlägt:

1. Betroffene Datei und beabsichtigten Änderungsauftrag vergleichen.
2. Unbeabsichtigte Änderungen rückgängig machen.
3. Bei beabsichtigten Änderungen eine neue Patch- oder Minor-Version festlegen.
4. Changelog, Manifest, Baseline-Historie und Cache-Buster aktualisieren.
5. Inhalt und Layout erneut in DE und EN prüfen.
6. Erst danach eine neue Prüfsummen-Baseline erzeugen.

Die Baseline darf nicht aktualisiert werden, nur um einen fehlschlagenden Test grün zu machen.

## 8. Definition of Done

Eine Aufgabe ist erst abgeschlossen, wenn:

- der Nutzerauftrag vollständig und ohne Zusatzänderungen umgesetzt ist,
- alle nicht genannten Inhalte unverändert geblieben sind,
- DE/EN-Parität für die geänderten Bereiche besteht,
- Übungen und Setup-Inhalte in den Handouts vollständig bleiben,
- alle erforderlichen automatischen Prüfungen erfolgreich sind,
- die geänderten Ansichten visuell geprüft wurden,
- Backlog, Manifest und Changelog konsistent sind,
- keine temporären oder internen Dateien veröffentlicht werden,
- Git-Status und finaler Diff nachvollziehbar sind.
