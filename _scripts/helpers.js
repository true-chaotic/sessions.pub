const path = require("path");
const fs = require("fs");

const directoryPath = path.resolve(__dirname, "../_posts");

/**
 *
 * @callback forEachSessionPostCallback
 * @param {Object} file - post file
 * @param {string} file.path - resolved path
 * @param {string} file.fullPath - resolved path
 * @param {string} file.contents - string with file contents
 */

/**
 * forEach over the posts array
 *
 * @param {forEachSessionPostCallback} callback
 */
function forEachSessionPost(callback) {
    const files = fs.readdirSync(directoryPath);

    files.reverse().forEach(function (file) {
        const filePath = path.resolve(directoryPath, file);

        const contents = fs.readFileSync(filePath, "utf8");

        const isSession = contents.includes("session:");

        if (!isSession) {
            return;
        }

        callback({
            path: file,
            fullPath: filePath,
            contents,
        })
    });
}

/**
 * parse script arguments
 *
 * @returns {Object}
 */
function parseArgs() {
    return process.argv.slice(2).reduce((result, current) => {
        const [key, value] = current.split('=');

        result[key] = value || true;

        return result;
    }, {});
}

/**
 * Get post link with title
 *
 * @param {string} host - https://example.com
 * @param {string} path - 2021-12-08-zoom.md
 * @param {string} contents - file content
 * @returns {string}
 */
function getPostLink(host, path, contents) {
    const title = contents
        .match(/title: (.+)/)[1]
        .replaceAll("\"", '')
        .replaceAll("-", '\\-');

    const urlPath = path.replaceAll('-', '/').replace('.md', '.html')

    return `[${title}](${host}/session/${urlPath})`;
}

module.exports = {
    forEachSessionPost,
    parseArgs,
    getPostLink
}
