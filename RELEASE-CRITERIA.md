# Release-Kriterien

Diese Kriterien gelten ab V3 für jedes Release.

## 0. Eingefrorene Workshop-Baseline

- Release `3.3.2` mit 65 Folien und validiertem Inhalts-Commit `7f608ad` ist die aktuelle eingefrorene Workshop-Baseline.
- Release `3.0.1` mit 63 Folien und Git-Commit `f54bbcc` bleibt als historische Konsolidierungsbasis dokumentiert.
- Die Datei `baselines/3.3.2.json` hält kryptografische Prüfsummen der ausgelieferten Präsentations-, Grafik- und Handout-Dateien fest.
- Änderungen an eingefrorenen Dateien erfordern eine neue Release-Version, einen Changelog-Eintrag und eine bewusst neu erzeugte Baseline.
- Neue Inhalte werden grundsätzlich als zusätzliche Folien angehängt.
- Bestehende Folien dürfen nur verändert werden, wenn eine Anforderung die jeweilige Folie ausdrücklich nennt.
- Nicht ausdrücklich genannte Folien bleiben in Inhalt, Reihenfolge und Gestaltung unverändert.
- Vollständige oder teilweise Entfernungen benötigen weiterhin eine vorherige Genehmigung gemäß `REMOVAL-APPROVALS.json`.
- Jede erlaubte Korrektur nennt im Changelog die betroffene Folie und den Änderungsgrund.

## 1. Inhaltsvollständigkeit

- Jedes Release führt ein maschinenlesbares `CONTENT-MANIFEST.json`.
- `CONTENT-BASELINE.json` ist append-only und bewahrt alle jemals verpflichtenden IDs.
- Jeder verpflichtende Inhaltsblock besitzt eine stabile ID.
- Jede Kernfolie erhält künftig ein passendes `data-content-id`.
- Ein verpflichtender Inhalt darf nur mit genehmigtem Löschantrag entfallen.
- Kürzungen, Zusammenlegungen und Verschiebungen werden im Changelog genannt.
- Modell- und Produktinformationen tragen einen Prüfstand oder verweisen auf Live-Quellen.

## 2. Didaktik

- Die Kernagenda passt einschließlich Pause in 240 Minuten.
- Kapiteltrenner zeigen Titel, Lernziel und Zeitbudget.
- Die Lernreise führt vom Problem über Verständnis und Demonstration zur eigenen Anwendung.
- Grundlagen werden jeweils mit Definition, Illustration, Beispiel und typischem Fehler erklärt.
- Mindestens ein durchgehender Use Case verbindet Chat, Assistent, Agent, KI-OS und lokale KI.
- Übungen sind über den Workshop verteilt und nicht ausschließlich am Ende gebündelt.

## 3. Übungen und Demonstrationen

- Jede Übung ist vollständig im Handout dokumentiert.
- Jede Übung enthält mindestens zwei konkrete Beispiel-Prompts.
- Jede Übung nennt Lernziel, Dauer, Vorbereitung, Hermes-Funktionen, Modellklasse, Kontrollfragen und Fallback.
- Live-Demos besitzen einen vorbereiteten Offline- oder Screenshot-Fallback.
- Dateiveränderungen werden nur in Testordnern und nach menschlicher Freigabe demonstriert.

## 4. Handouts

- Die inhaltliche Tiefe von V1 ist der Mindeststandard.
- Hermes Desktop und LM Studio erhalten getrennte, druckbare Setup-Anleitungen.
- Windows- und Linux-Unterschiede werden explizit beschrieben.
- Update, Diagnose, Fehlersuche und Sicherheitscheck sind enthalten.
- Online-Handouts sind umschaltbar; Druckexporte werden je Sprache getrennt erzeugt.

## 5. Design und Barrierefreiheit

- Die Grundwirkung ist hell, warm, freundlich und workshoporientiert.
- Dunkle Folien werden gezielt für Kapitel, Risiken oder technische Architektur eingesetzt.
- Illustrationen und Diagramme unterstützen das Verständnis und sind keine reine Dekoration.
- Bedienelemente überdecken weder Kapitelmarken noch Folieninhalte.
- Kontrast, Schriftgröße, Projektorlesbarkeit und Farbsinnstörungen werden geprüft.
- Sprachabhängige Grafiken verwenden genau ein DOM-Bild; beim Umschalten wird dessen Quelle ersetzt.
- Eine DE/EN-Matrixprüfung kontrolliert bei jeder lokalisierten Grafik Bildanzahl, Bildquelle und sichtbare Sprache.

## 6. Bedienung und Technik

- Navigation: vor, zurück, Home, Übersicht, Handouts, Sprache, QR und Vollbild.
- Home ist als Taste und sichtbare Schaltfläche verfügbar.
- Deutsch und Englisch besitzen denselben Informationsumfang.
- Präsentation funktioniert offline und ohne Build-Schritt.
- LAN- und Android-Aufruf werden getestet.
- QR-Codes werden lokal erzeugt und senden keine LAN-Adresse an externe Dienste.
- Mobile Darstellung bietet mindestens Querformat und möglichst einen Lesemodus.

## 7. Release-Prozess

1. Backlog aktualisieren.
2. Inhaltsmanifest gegen das vorherige Release vergleichen.
3. Fehlende Inhalte als Löschantrag vorlegen.
4. Antrag mit Foliennummern, Begründung, Auswirkung und Ersatz gemäß `REMOVAL-REQUEST-TEMPLATE.md` vorlegen.
5. Vor Umsetzung der Löschung eine ausdrückliche Genehmigung einholen.
6. Genehmigung in `REMOVAL-APPROVALS.json` dokumentieren.
7. Changelog aktualisieren.
8. Inhalts-, Layout-, Handout- und Technikchecks ausführen.
9. Browser-Cache-Buster auf die neue Release-Version setzen.
10. Visuelle Stichprobe aller geänderten Folien in DE und EN durchführen.
11. Prüfsummen-Baseline erzeugen und `npm run check:baseline` ausführen.
12. Erst danach ein neues Release kennzeichnen.

## 8. Definition of Done

- `npm run check`
- `npm run check:baseline`
- `npm run check:governance`
- Keine ungeklärten P0-Punkte
- Keine ungenehmigten entfernten Pflichtinhalte
- Desktop- und Android-QA bestanden
- DE/EN-Parität bestanden
- Pro lokalisierter Folie genau eine sichtbare Grafik
- Handout- und Druck-QA bestanden
