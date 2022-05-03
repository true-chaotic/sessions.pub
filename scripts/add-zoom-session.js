const fs = require("fs");
const path = require("path");

const [ creationDate ] = new Date().toISOString().split("T");
const [ slug, date, time ] = process.argv.slice(2);
const args = {date, slug, time};

function showExample() {
    console.error("Example: node scripts/add-zoom-session.js zoom 2022-05-03 17:00");
}

Object.entries(args).forEach(function([key, value]) {
    if (!value) {
        console.error(`Must have a ${key} part to name new post`);
        showExample();

        process.exit(1);
    }
});

// TODO: add -n if file exists
const newPostPath = path.resolve(
    __dirname,
    `../_posts/${creationDate}-${slug}.md`
);
const sessionDateTime = `${date} ${time}:00 +0300`;
const localDate = new Date(sessionDateTime).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: undefined
}).replace("понедельник", "в понедельник")
    .replace("вторник", "во вторник")
    .replace("среда", "в среду")
    .replace("четверг", "в четверг")
    .replace("пятница", "в пятницу")
    .replace("суббота", "в субботу")
    .replace("воскресенье", "в воскресенье");

const content = `---
layout: session
title:  "Zoom-сейшн в ${time} ${localDate}"
category: session
session:
    type: zoom
    date: ${sessionDateTime}
    past: false
---`;

try {
    fs.writeFileSync(newPostPath, content);
} catch (err) {
    console.error(err);
}
