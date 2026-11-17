# Hoftrödel Unterbach

[![Build und Tests](https://github.com/bierett/hoftroedel-unterbach/actions/workflows/pr-checks.yml/badge.svg?branch=main)](https://github.com/bierett/hoftroedel-unterbach/actions/workflows/pr-checks.yml?query=branch%3Amain)
[![Dependency-Audit](https://github.com/bierett/hoftroedel-unterbach/actions/workflows/audit-dependencies.yml/badge.svg?branch=main)](https://github.com/bierett/hoftroedel-unterbach/actions/workflows/audit-dependencies.yml?query=branch%3Amain)
[![Lizenzen](https://github.com/bierett/hoftroedel-unterbach/actions/workflows/license-check.yml/badge.svg?branch=main)](https://github.com/bierett/hoftroedel-unterbach/actions/workflows/license-check.yml?query=branch%3Amain)
[![CodeQL](https://github.com/bierett/hoftroedel-unterbach/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/bierett/hoftroedel-unterbach/actions/workflows/codeql.yml?query=branch%3Amain)

Infoseite zum Hoftrödel in Düsseldorf-Unterbach, gebaut mit dem [Open Pioneer Trails Starter](https://github.com/open-pioneer/trails-starter) und Chakra UI.

Das Projekt enthält genau eine App (`src/apps/hoftroedel`) und keine eigenen Pakete.

## Schnellstart

Voraussetzung: [Node](https://nodejs.org/en/) (Version 24 oder neuer) und [pnpm](https://pnpm.io/) (Version 10 oder neuer).

```bash
pnpm install   # Abhängigkeiten installieren
pnpm dev       # Entwicklungsserver starten (http://localhost:5173/)
pnpm build     # Produktionsbuild nach dist/www
```

## Veranstaltungstermin und SEO

Der Termin wird zentral in `src/event.ts` gepflegt. Für den nächsten Hoftrödel nur `date`
im Format `YYYY-MM-DD` ändern, zum Beispiel `"2027-09-18"`, anschließend neu bauen und veröffentlichen.
Wochentag, angezeigtes Datum, Anmeldefrist am Vortag, Anmelde-E-Mail, Seitentitel,
Beschreibungen und strukturierte Veranstaltungsdaten werden daraus berechnet.
Bei Bedarf sind dort auch Beginn (`startTime`), Fristabstand (`registrationDaysBefore`),
Zeitzone und öffentliche Website-URL einstellbar. Nach Änderungen den Entwicklungsserver neu starten.

Beim Build entstehen Seitentitel, Canonical-URLs, Open-Graph-/Twitter-Vorschauen,
JSON-LD-Veranstaltungsdaten, `robots.txt`, `sitemap.xml` sowie eigene HTML-Einstiegsdateien
für die Unterseiten. Metadaten sind damit schon ohne JavaScript im HTML vorhanden und werden
bei Navigation im Browser aktualisiert. Den gesamten Inhalt von `dist/www` veröffentlichen.

Die Startseite ist für Suchmaschinen freigegeben. Kontakt, Impressum und Datenschutz enthalten
noch Platzhalter, die Karte enthält Demo-Standorte. Deshalb sind diese Unterseiten vorerst
mit `noindex,follow` markiert und fehlen in der Sitemap. Sobald die Inhalte fertig sind,
das jeweilige `index`-Feld in `src/seo.ts` auf `true` setzen.

Die Flyer-PDF und -Bilder werden nicht automatisch verändert. Enthalten sie einen Termin,
müssen sie separat aktualisiert werden; das PNG dient auch als Vorschau beim Teilen von Links.
Strukturierte Daten garantieren keine besondere Darstellung in Suchmaschinen.

## Flyer zum Herunterladen

Der Bereich „Hoftrödel zum Weitersagen“ auf der Startseite lädt seine Dateien aus
`src/public/downloads/`:

- `hoftrödel-unterbach-flyer.pdf`: druckbarer Flyer in DIN A4
- `hoftrödel-unterbach-flyer.png`: Bild zum Teilen und alternative Vorschau
- `hoftrödel-unterbach-flyer.webp`: kleinere Datei für die Vorschau

Die Dateien werden unverändert unter ihrer öffentlichen URL ausgeliefert. Sobald sie dort
verfügbar sind, werden die jeweiligen Download-Buttons beim Laden der Seite automatisch aktiv.
Neue oder geänderte Dateien müssen vor dem Build in diesem Ordner liegen und anschließend
zusammen mit der Website veröffentlicht werden.
Ohne WebP wird PNG für die Vorschau verwendet. Ohne beide Bilder erscheint eine gekennzeichnete Gestaltungsvorschau;
für fehlende Dateien bleiben die Buttons deaktiviert.

## Smoke-Tests

Die Playwright-Tests prüfen Navigation, Karte und Anmeldeformular in Chromium mit Desktop- und Handy-Ansicht.
Sie laufen gegen den Produktionsbuild. Der externe basemap.de-Stil wird durch einen festen Teststil ersetzt;
die Verfügbarkeit des Kartendienstes wird damit nicht geprüft. Es werden keine Anmeldungen versendet.

```bash
pnpm exec playwright install chromium # einmalig nach Installation bzw. Playwright-Update
pnpm build
pnpm test:smoke
pnpm exec playwright show-report
```

Der Vorschau-Server auf Port 4173 startet und endet automatisch. Bei fehlgeschlagenen Tests enthalten
`playwright-report/` und `test-results/` den Bericht, Screenshots und Traces. GitHub Actions lädt diese
als Artefakt hoch. Die Smoke-Tests sind Teil des bestehenden verpflichtenden PR-Checks.

## Aufbau

- `src/index.html`: die Seite mit `<hoftroedel-app>`
- `src/apps/hoftroedel/AppUI.tsx`: die Oberfläche, aufgebaut mit Chakra-UI-Komponenten
- `src/apps/hoftroedel/theme/config.ts`: Design-Tokens (Farben `hoftroedel.*`, Schriften `body` und `heading`)
- `src/apps/hoftroedel/components/`: Header, Hero, Footer und die Illustration
- `src/apps/hoftroedel/i18n/de.yaml`: alle Texte
- `src/apps/hoftroedel/build.config.mjs`: Build-Konfiguration der App

## Unterseiten

Die App nutzt React Router mit Browser-Routing: `/karte`, `/kontakt`, `/impressum` und `/datenschutz`.
Für direkte Aufrufe und Neuladen einer Unterseite muss der Webserver die `index.html` ausliefern.

Für Apache liegt die passende Konfiguration in `src/public/.htaccess`; sie wird beim Build
nach `dist/www/.htaccess` kopiert. Beim Hochladen auch diese versteckte Datei übertragen.
Apache muss `mod_rewrite` und Rewrite-Regeln in `.htaccess` erlauben (`AllowOverride FileInfo`).
Vorhandene Dateien und Verzeichnisse, etwa Flyer-Downloads, werden weiterhin direkt ausgeliefert.

Standardmäßig wird die Website im Stammverzeichnis der Domain bereitgestellt (`base: "/"`).
Bei Hosting in einem Unterverzeichnis den Vite-Basispfad entsprechend setzen, z. B.
`pnpm build --base=/hoftroedel/`; der Router übernimmt diesen Pfad als `basename`.
