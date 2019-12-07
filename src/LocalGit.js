const { gitJSONToGitDSL } = require("./git/gitJSONToGitDSL");
const { diffToGitJSONDSL } = require("./git/diffToGitJSONDSL");
const { localGetDiff } = require("./git/localGetDiff");
const { localGetFileAtSHA } = require("./git/localGetFileAtSHA");
const { localGetCommits } = require("./git/localGetCommits");
const { readFileSync } = require("fs");

class LocalGit {
    constructor(options) {
        this.options = options;
        this.getFileContents = (path) => new Promise(res => res(readFileSync(path, "utf8")));
        this.name = "local git";
    }
    async getGitDiff() {
        if (this.gitDiff) {
            return this.gitDiff;
        }
        const base = this.options.base || "master";
        const head = "HEAD";
        this.gitDiff = await localGetDiff(base, head);
        return this.gitDiff;
    }
    async validateThereAreChanges() {
        const diff = await this.getGitDiff();
        return diff.trim().length > 0;
    }
    async getPlatformReviewDSLRepresentation() {
        return null;
    }
    async getPlatformGitRepresentation() {
        const base = this.options.base || "master";
        const head = "HEAD";
        const diff = await this.getGitDiff();
        const commits = await localGetCommits(base, head);
        const gitJSON = diffToGitJSONDSL(diff, commits);
        const config = {
            repo: process.cwd(),
            baseSHA: this.options.base || "master",
            headSHA: "HEAD",
            getFileContents: localGetFileAtSHA,
            getFullDiff: localGetDiff,
        };
        return gitJSONToGitDSL(gitJSON, config);
    }
    async getInlineComments(_) {
        return [];
    }
    supportsCommenting() {
        return false;
    }
    supportsInlineComments() {
        return true;
    }
    async updateOrCreateComment(_dangerID, _newComment) {
        return undefined;
    }
    async createComment(_comment) {
        return true;
    }
    async createInlineComment(_git, _comment, _path, _line) {
        return true;
    }
    async updateInlineComment(_comment, _commentId) {
        return true;
    }
    async deleteInlineComment(_id) {
        return true;
    }
    async deleteMainComment() {
        return true;
    }
    async editMainComment(_comment) {
        return true;
    }
    async updateStatus() {
        return true;
    }
    async getReviewInfo() {
        return {};
    }
}

module.exports.LocalGit = LocalGit
