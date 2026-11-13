import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync } from "node:fs";

const mode = process.argv[2];
if (!["audit", "licenses"].includes(mode)) {
    throw new Error("Expected audit or licenses mode");
}
const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
const eventName = process.env.GITHUB_EVENT_NAME;
let run = true;

if (["pull_request", "push"].includes(eventName)) {
    const base = eventName === "pull_request" ? event.pull_request.base.sha : event.before;
    const head = eventName === "pull_request" ? event.pull_request.head.sha : event.after;
    // New branches and unavailable history must run the check rather than skip it.
    if (base && !/^0+$/.test(base) && head) {
        const range = eventName === "pull_request" ? `${base}...${head}` : `${base}..${head}`;
        const files = execFileSync("git", ["diff", "--name-only", "-z", range], {
            encoding: "utf8"
        }).split("\0");
        run = files.some(
            (file) =>
                /(^|\/)package\.json$/.test(file) ||
                ["pnpm-lock.yaml", "pnpm-workspace.yaml", ".npmrc", ".pnpmfile.cjs"].includes(
                    file
                ) ||
                file.startsWith("patches/") ||
                file === ".github/scripts/dependency-changes.mjs" ||
                file ===
                    `.github/workflows/${mode === "audit" ? "audit-dependencies" : "license-check"}.yml` ||
                (mode === "licenses" &&
                    (file === "support/license-config.yaml" ||
                        file.startsWith("support/licenses/")))
        );
    }
}

appendFileSync(process.env.GITHUB_OUTPUT, `run=${run}\n`);
appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    run
        ? `Dependency ${mode}: running checks.\n`
        : `Dependency ${mode}: skipped (no relevant file changes).\n`
);
