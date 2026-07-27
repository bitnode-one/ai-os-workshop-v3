# KI-Agenten für den Alltag · Workshop V3

Konsolidiertes, bilinguales Release für einen vierstündigen Workshop mit 65 Folien, Hermes-Desktop-Demos, LM-Studio-Praxis und vollständigen Handouts.

## Referent

**Max Peter** ist Unternehmer, Researcher und Referent für Künstliche Intelligenz,
Agentic AI, IT-Sicherheit und dezentrale digitale Systeme. Er studiert Politik &
Technologie an der Hochschule für Politik München / TUM School of Social Sciences
and Technology und verbindet Forschung zu Political Data Science, Big Data,
KI-Ethik, Agentic AI und Cybersecurity Governance mit praktischer Erfahrung als
Datenschutz- und Informationssicherheitsauditor.

Schwerpunkte: KI-Kompetenz, sichere KI-Nutzung, KI-Governance, lokale und offene
KI-Systeme, Datenschutz, ISMS und digitale Selbstbestimmung.

[LinkedIn-Profil von Max Peter](https://www.linkedin.com/in/maxpeter/)

## Online öffnen

Nach Aktivierung von GitHub Pages ist die Präsentation direkt erreichbar:

**https://bitnode-one.github.io/ai-os-workshop-v3/**

Die normale GitHub-Repository-Ansicht zeigt nur die Dateien und führt
`index.html` nicht als Webseite aus.

### GitHub Pages einmalig aktivieren

1. Repository **Settings → Pages** öffnen.
2. Unter **Build and deployment** als Source **GitHub Actions** wählen.
3. Diese Einstellung speichern, bevor der Workflow erstmals ausgeführt wird.
4. Workflow **Deploy workshop to GitHub Pages** erneut ausführen oder auf `main` pushen.
5. Nach erfolgreichem Deployment den Online-Link oben öffnen.

Wenn `configure-pages` mit `Get Pages site failed: Not Found` abbricht, ist
GitHub Pages noch nicht aktiviert oder noch nicht auf **GitHub Actions** gestellt.

## Start

```powershell
npm start
```

Android und weitere Geräte im gleichen Netzwerk:

```powershell
npm run workshop
```

## Bedienung

- `←` / `→`: vorherige oder nächste Folie
- `Home`: Start
- `End`: letzte Folie
- `O`: Übersicht
- `L`: Deutsch/Englisch
- `H`: Handouts
- `Q`: lokaler QR-Code
- `F`: Vollbild
- `T`: Übungstimer starten oder pausieren

Auf Android die Präsentation im Querformat öffnen. Die Handouts sind zusätzlich
für das Lesen im Hochformat optimiert.

## Qualität

```powershell
npm run check
npm run check:governance
npm run check:notebook
```

Inhalte dürfen nicht ohne vorherige Genehmigung und dokumentierten Löschantrag entfernt werden.

## Lizenz

Sofern nicht anders gekennzeichnet, stehen Präsentation, Handouts und eigene
Workshop-Inhalte unter der Lizenz
[Creative Commons Namensnennung – Weitergabe unter gleichen Bedingungen 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/deed.de)
(`CC BY-SA 4.0`).

Bei Weiterverwendung ist **Max Peter** als Urheber zu nennen. Änderungen sind zu
kennzeichnen und abgeleitete Fassungen unter derselben Lizenz bereitzustellen.
Fremde Logos, Screenshots, Studiengrafiken und andere gekennzeichnete Inhalte
sind ausgenommen und unterliegen den Rechten ihrer jeweiligen Urheber. Details
stehen in [`LICENSE.md`](LICENSE.md) und [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
