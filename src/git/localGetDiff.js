import { debug } from "../debug";
import { spawn } from "child_process";
const d = debug("localGetDiff");

export const localGetDiff = (base, head) => new Promise(done => {
    const args = ["diff", `${base}...${head}`];
    let stdout = "";
    const child = spawn("git", args, { env: process.env });
    d("> git", args.join(" "));
    child.stdout.on("data", chunk => {
        stdout += chunk;
    });
    child.stderr.on("data", data => {
        console.error(`Could not get diff from git between ${base} and ${head}`);
        throw new Error(data.toString());
    });
    child.on("close", function (code) {
        if (code === 0) {
            done(stdout);
        }
    });
});
