# [sessions.pub](https://sessions.pub/) website

Built using Jekyll, published on Github Pages

## Available GitHub workflows and necessary secrets

### Add post (`add-post.yml`)

Creates a new zoom-session post for a date. 

Needs `MY_TOKEN` secret with your personal access token to commit and push the result back to repository. Updates commited without your token will not trigger pages build.

### Mark past sessions (`mark-past.yml`)

Marks session posts with session date that is before the script run time as `past: true`

Needs `MY_TOKEN` secret to commit and push the result back to repository. 

If no posts are marked, nothing is commited.

### Send telegram notifications

Runs after GitHub Pages build.

Sends links to new posts to a Telegram channel. Stores post names that had notifications in a workflow artifact, so further runs don't spam notifications.

Needs

 * `NOTIFY_ARTIFACT_NAME` — secret to name the file. Can be something like `artifact.json` (should be a json file)
 * `NOTIFY_CHAT_ID` — for a chat to send notifications to. Right now set to `@sessions_pub`, you can set your own. For a private chat it will be numerical id, you will need a special bot to get your private chat id.
 * `NOTIFY_TOKEN` — your bot token (you should get it from `@BotFather`

## Automated site flow

1. Run **Add post** or create a new post and commit and push the result
2. GitHub Pages workflow should build and publish the new version
3. **Send telegram notifications** should run after that and send notifications for posts that need them
4. **Mark past sessions** should run at scheduled time each day and mark posts as `past: true` (step 3 should run in case some posts changed)
