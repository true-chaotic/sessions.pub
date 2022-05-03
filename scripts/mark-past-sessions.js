const path = require("path");
const fs = require("fs");

const directoryPath = path.resolve(__dirname, "../_posts");

const currentDate = Date.now();

try {
    const files = fs.readdirSync(directoryPath);

    files.reverse().forEach(function (file) {
        const filePath = path.resolve(directoryPath, file);

        const contents = fs.readFileSync(filePath, "utf8");

        const isSession = contents.includes("session:");

        if (!isSession) {
            return;
        }

        const past = contents.match(/past: (.+)/)[1];

        if (past === "true") {
            return;
        }

        const date = Number(new Date(contents.match(/date: (.+)/)[1]));

        const shouldBePast = currentDate > date;

        if (!shouldBePast) {
            return;
        }

        fs.writeFileSync(filePath, contents.replace("past: false", "past: true"));
    });
} catch (err) {
    console.error(err);

    process.exit(1);
}
