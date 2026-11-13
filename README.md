# Hoftrödel Unterbach

Infoseite zum Hoftrödel in Düsseldorf-Unterbach, gebaut mit dem [Open Pioneer Trails Starter](https://github.com/open-pioneer/trails-starter) und Chakra UI.

Das Projekt enthält genau eine App (`src/apps/hoftroedel`) und keine eigenen Pakete.

## Schnellstart

Voraussetzung: [Node](https://nodejs.org/en/) (Version 24 oder neuer) und [pnpm](https://pnpm.io/) (Version 10 oder neuer).

```bash
pnpm install   # Abhängigkeiten installieren
pnpm dev       # Entwicklungsserver starten (http://localhost:5173/)
pnpm build     # Produktionsbuild nach dist/www
```

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

Die App nutzt React Router mit Hash-Routing: `#/impressum` und `#/datenschutz`.
Dadurch sind auf statischem Hosting keine zusätzlichen Server-Rewrites erforderlich.
