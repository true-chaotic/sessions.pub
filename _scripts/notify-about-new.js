const path = require("path");
const fs = require("fs");
const {
    forEachSessionPost,
    parseArgs,
    getPostLink
} = require("./helpers");

const { artifactName, token, chat_id, init = "false" } = parseArgs();

const required = {artifactName, token, chat_id};

function showExample() {
    console.error("Example: node _scripts/notify-about-new.js artifactName=artifact.json token=123:ABC chat_id=@example");
}

Object.entries(required).forEach(function([key, value]) {
    if (!value) {
        console.error(`${key} is required`);
        showExample();

        process.exit(1);
    }
});

const artifactPath = path.resolve('./', artifactName);

let notifiedLog;

if (init === "true") {
    console.log("Creating new log json");

    notifiedLog = {};
} else {
    try {
        notifiedLog = require(artifactPath);
    } catch (err) {
        console.error("No log found, doing nothing. You need to download artifact from the workflow or run the script with init=true");

        process.exit(1);
    }
}

try {
    const toNotifyList = [];

    forEachSessionPost(({path, contents}) => {
        const past = contents.match(/past: (.+)/)[1];

        if (past === "true") {
            return;
        }

        if (notifiedLog[path]) {
            return;
        }

        toNotifyList.push({
            path,
            contents
        });
    });

    if (toNotifyList.length === 0) {
        console.log("Nothing to notify about, exiting");

        process.exit(0);
    }

    console.log("Sending notifications");

    Promise.allSettled(toNotifyList.map(({path, contents}) => {
        // TODO: take host from config
        const text = getPostLink('https://sessions.pub', path, contents);

        return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id,
                parse_mode: "MarkdownV2",
                text
            })
        }).then(response => response.json())
            .then((data) => {
                if (!data.ok) {
                    throw new Error(data.description);
                }

                return path;
            })
    })).then(results => {
        results.forEach(({status, value, reason}) => {
            if (status === "rejected") {
                console.error("Notification failed:", reason);
                return;
            }

            console.log("Notification successful, recording", value);

            notifiedLog[value] = true;
        });

        fs.writeFileSync(artifactPath, JSON.stringify(notifiedLog));
    })
} catch (err) {
    console.error(err);

    process.exit(1);
}
