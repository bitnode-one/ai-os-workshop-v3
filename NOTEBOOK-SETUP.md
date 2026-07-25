# Präsentations-Notebook: Einrichtung und Prüfung

## Geprüfter Rechner am 24.07.2026

Der aktuell geprüfte Rechner meldet:

- Hersteller/Modell: MINISFORUM UM780XTX (Systemkennung: Micro Computer (HK) Tech Limited, Venus series)
- Betriebssystem: Windows 11 Pro
- CPU: AMD Ryzen 7 7840HS, 8 Kerne / 16 Threads
- RAM: 30,8 GB
- GPU: AMD Radeon 780M
- Grafikspeicher laut DirectX: 933 MB dediziert, 15.768 MB gemeinsam
- Systemlaufwerk: 242,5 GB, davon nur 5,3 GB frei
- Node.js: 24.18.0
- npm: 11.16.0
- Git: 2.55.0
- PowerShell: 7.6.4
- Hermes: installiert
- Hermes-Version: 0.19.0
- Hermes-Anmeldung: Nous Portal und OpenAI Codex aktiv; xAI OAuth nicht eingerichtet
- Hermes-Diagnose: bricht wegen nicht UTF-8-kodierter `SOUL.md` ab
- LM Studio: nicht gefunden

Dieser Rechner ist der Entwicklungsrechner, nicht das angekündigte Surface Book
für die Präsentation. Die dort genannten 32 GB RAM und 6 GB GPU-Speicher müssen
mit `tools/check-notebook.ps1` auf dem tatsächlichen Gerät erneut geprüft werden.

## Bewertung

| Bereich | Anforderung | Status |
|---|---|---|
| Präsentation | Windows 10/11, aktueller Browser | bestanden |
| Git-Repo | Git 2.x | bestanden |
| HTML-Server | Node.js 18 oder neuer | bestanden |
| Hermes Desktop | Windows 10/11 | installiert |
| Hermes-Konfiguration | `SOUL.md` als UTF-8 und `hermes doctor` erfolgreich | nicht bestanden |
| LM Studio RAM | mindestens 16 GB empfohlen | bestanden |
| LM Studio GPU | mindestens 4 GB dedizierter VRAM empfohlen | nur bedingt: integrierte GPU mit gemeinsamem RAM |
| Freier Speicher | mindestens 30 GB, besser 50 GB | nicht bestanden |
| LM Studio | Anwendung und `lms` CLI | nicht installiert |

Für die Workshop-Demo sind auf dem MINISFORUM kleine quantisierte Modelle bis
ungefähr 7–8B mit moderatem Kontext als verlässlicher Start vorgesehen. Auf dem
Surface Book entscheidet der erneute Hardware-Check; 7B–14B Q4 kann bei realen
6 GB dediziertem VRAM und geeigneten Treibern möglich sein, ist aber vorab zu testen.

## Vorbereitungen

1. Mindestens 30 GB, besser 50 GB Speicher auf Laufwerk C: freigeben.
2. Windows aktualisieren und neu starten.
3. Aktuellen AMD-Grafiktreiber installieren.
4. Hermes Desktop aktualisieren und einen Testchat durchführen.
5. Vor einer Änderung Sicherung von `%LOCALAPPDATA%\hermes\SOUL.md` erstellen und die Datei als UTF-8 speichern.
6. `hermes doctor` erneut ausführen.
7. LM Studio installieren.
8. Ein kleines Workshop-Modell vollständig herunterladen.
9. Präsentation, Hermes und LM Studio einmal ohne Internet-Fallback testen.

## Codex: lokal oder remote?

Empfohlen wird ein hybrides Setup:

1. Codex Desktop oder CLI, Git und das vollständige V3-Repo lokal auf dem
   Surface Book installieren.
2. Präsentation, Handouts und Workshop-Daten vollständig offline bereithalten.
3. Den MINISFORUM oder Codex Cloud für lange Entwicklungsaufgaben und größere
   Änderungen nutzen.
4. Remote-Zugriff nie als einzige Live-Abhängigkeit einplanen.

Für Codex ist die lokale GPU nicht maßgeblich, weil die Modellinferenz online
erfolgt. Für LM Studio ist die GPU dagegen entscheidend.

## Git-Repository auf dem Notebook anlegen

Sobald ein Git-Remote vorhanden ist:

```powershell
cd "$HOME\Documents"
git clone <GIT-REMOTE-URL> AI-OS-Agent-Workshop
cd AI-OS-Agent-Workshop
npm run check
npm run check:governance
npm start
```

Für den Zugriff per Android im gleichen Netzwerk:

```powershell
npm run start:lan
```

## Aktualisieren

```powershell
cd "$HOME\Documents\AI-OS-Agent-Workshop"
git pull --ff-only
npm run check
npm run check:governance
```

## Notebook-Check

```powershell
pwsh -File .\tools\check-notebook.ps1
```

Vor jedem Workshop zusätzlich prüfen:

- Netzteil und Adapter
- HDMI/USB-C-Ausgabe
- Präsentationsauflösung
- privates Netzwerkprofil für LAN-Demo
- Hermes-Anmeldung und Modellzugriff
- News-Demo mit Internet
- vorbereiteter Offline-Fallback
- LM-Studio-Modell vollständig lokal verfügbar
