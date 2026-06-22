const { discloud } = require("discloud.app");
const fs = require("fs");

async function run() {
  // Authenticate using the token from environment variables
  await discloud.login(process.env.DISCLOUD_TOKEN);
  
  const appId = process.env.APP_ID;
  const zipPath = "/dev/shm/bot.zip";

  console.log(`Committing/Uploading to ${appId}...`);
  
  // Use the update (commit) method to refresh your bot
  await discloud.apps.update(appId, {
    file: {
      data: fs.readFileSync(zipPath),
      name: "bot.zip"
    }
  });

  console.log("Upload successful.");
  
  // Fetch status to verify
  const status = await discloud.apps.status.fetch(appId);
  console.log("App Status:", status.container);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
