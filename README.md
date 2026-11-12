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
