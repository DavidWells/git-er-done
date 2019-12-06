// Graciously vendored from
// https://github.com/paulmelnikow/chainsmoker
//
import micromatch from "micromatch";
import mapValues from "lodash.mapvalues";
const isExclude = (p) => p.startsWith("!");
export default function chainsmoker(keyedPaths) {
    function matchPatterns(patterns) {
        return mapValues(keyedPaths, (paths) => {
            const excludePatterns = patterns.filter(p => isExclude(p));
            const includePatterns = patterns.filter(p => !isExclude(p));
            const included = includePatterns.reduce((accum, pattern) => accum.concat(micromatch.match(paths, pattern)), []);
            return excludePatterns.reduce((accum, pattern) => micromatch.match(accum, pattern), included);
        });
    }
    function finalize(keyedPaths) {
        return Object.assign(Object.assign({}, mapValues(keyedPaths, (paths) => paths.length > 0)), { getKeyedPaths: () => keyedPaths });
    }
    return (...patterns) => finalize(matchPatterns(patterns));
}
