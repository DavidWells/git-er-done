import { debug } from "../debug";
import JSON5 from "json5";
import { spawn } from "child_process";
const d = debug("localGetDiff");
const sha = "%H";
const parents = "%p";
const authorName = "%an";
const authorEmail = "%ae";
const authorDate = "%ai";
const committerName = "%cn";
const committerEmail = "%ce";
const committerDate = "%ci";
const message = "%f"; // this is subject, not message, so it'll only be one line
const author = `"author": {"name": "${authorName}", "email": "${authorEmail}", "date": "${authorDate}" }`;
const committer = `"committer": {"name": "${committerName}", "email": "${committerEmail}", "date": "${committerDate}" }`;

export const formatJSON = `{ "sha": "${sha}", "parents": "${parents}", ${author}, ${committer}, "message": "${message}"},`;

export const localGetCommits = (base, head) => new Promise(done => {
    const args = ["log", `${base}...${head}`, `--pretty=format:${formatJSON}`];
    const child = spawn("git", args, { env: process.env });
    d("> git", args.join(" "));
    child.stdout.on("data", async (data) => {
        data = data.toString();
        // remove trailing comma, and wrap into an array
        const asJSONString = `[${data.substring(0, data.length - 1)}]`;
        const commits = JSON5.parse(asJSONString);
        const realCommits = commits.map((c) => (Object.assign(Object.assign({}, c), { parents: c.parents.split(" ") })));
        done(realCommits);
    });
    child.stderr.on("data", data => {
        console.error(`Could not get commits from git between ${base} and ${head}`);
        throw new Error(data.toString());
    });
});
