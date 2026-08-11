# Lessons Learned · Release 3.3.2

Diese Regeln sind das verbindliche Ergebnis der Konsolidierung und des Korrekturlaufs bis Release 3.3.2. Sie ergänzen `RELEASE-CRITERIA.md` und sollen Inhalts-, Übersetzungs- und Darstellungsregressionen verhindern.

## 1. Baseline und Änderungsdisziplin

- Release 3.3.2 ist die aktuelle fachlich und visuell geprüfte Workshop-Baseline.
- Korrekturen erfolgen nur an ausdrücklich genannten Folien oder Handouts.
- Nicht genannte Inhalte, Reihenfolgen und Gestaltungen bleiben unverändert.
- Jede Änderung erhält eine neue Patch-Version, einen Changelog-Eintrag und eine erneuerte Prüfsummen-Baseline.
- Inhalte werden niemals stillschweigend entfernt; es gilt weiterhin der dokumentierte Freigabeprozess.

## 2. Lokalisierte Grafiken

**Problem:** Zwei Sprachvarianten als parallele `<img>`-Elemente waren nur über CSS verborgen. Bei einer Mischung aus neuem HTML und veraltetem Browser-CSS erschienen beide Grafiken gleichzeitig.

**Verbindliche Lösung:**

- Pro Folie existiert genau ein Bild im DOM.
- Das Bild trägt `data-src-de`, `data-src-en`, `data-alt-de` und `data-alt-en`.
- Die Sprachlogik ersetzt `src` und `alt` beim Umschalten.
- Zwei übereinander oder nebeneinander liegende Sprachbilder sind nicht zulässig.
- Der automatische Prüflauf kontrolliert Struktur, Dateipaar und Bildanzahl.

## 3. Browser-Cache und Deployment

- CSS und JavaScript werden mit der Release-Version als Cache-Buster geladen.
- HTML, CSS und JavaScript dürfen nach einem Deployment nicht aus unterschiedlichen Release-Ständen stammen.
- Ein Release gilt erst nach Prüfung der veröffentlichten GitHub-Pages-Version als vollständig ausgerollt.
- Bei visuellen Abweichungen wird zuerst die sichtbare Release-Version und danach der Browser-Cache geprüft.

## 4. Übersetzungsparität

- Nicht nur Fließtext, sondern auch SVG-Beschriftungen, Tabellenzellen, Diagrammlegenden, Buttons und Alternativtexte gehören zur Übersetzung.
- Neue oder geänderte Folien werden immer als DE/EN-Paar geprüft.
- Die Prüfung umfasst sichtbaren Text, Bildquelle, Bildanzahl, Zeilenumbrüche und Überläufe.
- Begriffe wie `LOCAL`, `Very good`, `Controllable` und `Yes` dürfen in der englischen Fassung nicht als deutsche Resttexte erscheinen.

## 5. Visuelle Validierung

Für jede geänderte Folie gilt mindestens folgende Matrix:

| Prüfung | Deutsch | Englisch |
|---|---:|---:|
| Folie vollständig gerendert | Pflicht | Pflicht |
| Genau eine sichtbare Sprachgrafik | Pflicht | Pflicht |
| Richtige Bildquelle | Pflicht | Pflicht |
| Keine Überlagerung oder Doppelanzeige | Pflicht | Pflicht |
| Keine abgeschnittenen Texte | Pflicht | Pflicht |
| Tabellen und Links lesbar | Pflicht | Pflicht |

Automatische Tests ersetzen die Sichtkontrolle nicht; die Sichtkontrolle ersetzt wiederum nicht die automatischen Tests.

## 6. Freigabecheck für kommende Releases

1. Nur genehmigte Folien und Handouts ändern.
2. Version und Changelog aktualisieren.
3. DE/EN-Inhalt einschließlich eingebetteter Grafiktexte prüfen.
4. `npm run check` ausführen.
5. `npm run check:governance` ausführen.
6. Geänderte Folien in beiden Sprachen rendern und ansehen.
7. Prüfsummen-Baseline bewusst aktualisieren.
8. Erst danach committen, pushen und die GitHub-Pages-Version kontrollieren.
