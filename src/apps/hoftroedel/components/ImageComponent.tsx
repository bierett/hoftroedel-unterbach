// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { useIntl } from "open-pioneer:react-hooks";

export function ImageComponent() {
    const intl = useIntl();

    return (
        <svg
            style={{ display: "block", width: "100%", height: "auto" }}
            viewBox="0 0 580 550"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="hoftroedel-art-title hoftroedel-art-description"
        >
            <title id="hoftroedel-art-title">{intl.formatMessage({ id: "art.title" })}</title>
            <desc id="hoftroedel-art-description">
                {intl.formatMessage({ id: "art.description" })}
            </desc>
            <defs>
                <pattern id="hoftroedel-hatch" width="7" height="7" patternUnits="userSpaceOnUse">
                    <path d="M0 7 7 0" stroke="#233e34" strokeOpacity=".08" strokeWidth="1" />
                </pattern>
            </defs>
            <path d="M35 450V267C35 133 135 39 286 39c149 0 259 102 259 235v176Z" fill="#e5e7d9" />
            <circle cx="429" cy="127" r="42" fill="#e6bd75" opacity=".75" />
            <g stroke="#233e34" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M37 302 136 214l99 88v147H37Z" fill="#efe9da" />
                <path d="m24 303 112-104 111 104" fill="none" />
                <path d="M63 279v-55h24v32" fill="#efe9da" />
                <path d="M76 331h34v48H76Zm74 0h34v48h-34Z" fill="#c2cbb9" />
                <path d="M93 332v47m-17-25h34m57-22v47m-17-25h34" />
                <path d="M249 449V214l103-95 105 95v235" fill="#d5ddcd" />
                <path d="m236 219 116-111 117 111" fill="none" />
                <path d="M402 155v-41h23v63" fill="#d5ddcd" />
                <path d="M280 248h40v53h-40Zm105 0h40v53h-40Zm-34-84v30" fill="#efe9da" />
                <path d="M300 248v53m-20-27h40m85-26v53m-20-27h40" />
                <path d="M367 449v-99h56v99" fill="#899c83" />
                <path d="M374 359h42v51h-42" fill="url(#hoftroedel-hatch)" />
                <circle cx="413" cy="424" r="2" fill="#233e34" />
                <path d="M43 194Q263 264 517 204" fill="none" />
                <path
                    d="m76 204 12 29 20-22m28 6 13 29 19-25m30 6 15 29 17-26m34 3 16 28 16-27m34-1 19 25 13-28m34-4 21 23 11-28m31-7 22 20 8-28"
                    fill="#b96b4b"
                    strokeWidth="1.5"
                />
                <path
                    d="M24 450h530M54 467h152m157 0h154M246 483h153"
                    fill="none"
                    stroke="#8e9d87"
                />
                <path d="M119 385h232v15H119Z" fill="#ba7856" />
                <path d="m132 400-9 67m214-67 9 67" fill="none" strokeWidth="5" />
                <path d="M139 385v-14h49v14Zm4-14v-13h38v13" fill="#e2c387" />
                <path d="M210 385v-12m-12 12h24m-12-12v-50" fill="none" />
                <path d="m187 347 11-32h25l11 32Z" fill="#e3bb78" />
                <path d="M256 385v-30h36v30Zm-5-30h46l-11-14h-24Z" fill="#c2cbb9" />
                <path
                    d="M311 385v-19h23v19m-23-15c-13-7-12-18-4-16 6 2 9 6 14 13m2-1c2-16 12-23 17-17 4 6-4 13-17 17"
                    fill="#8c9d7c"
                />
                <path d="M451 449h37l6-43h-49Z" fill="#bd7858" />
                <path
                    d="M470 406v-77m0 47c-33-1-40-21-27-25 13-3 22 8 27 25m0-18c30-5 41-25 27-28-12-2-24 10-27 28m0-18c-22-8-27-25-16-27 12-2 16 15 16 27"
                    fill="#8a9d7e"
                />
                <path d="M72 449v-40h33v40m-40-1h47" fill="#e5c793" />
                <path d="m71 420 31 13m-30 0 31-13" fill="none" strokeWidth="1.2" />
            </g>
        </svg>
    );
}
