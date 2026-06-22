const { discloud } = require("discloud.app");
const fs = require("fs");

async function run() {
  try {
    await discloud.login(process.env.DISCLOUD_TOKEN);
    const zipPath = "/dev/shm/bot.zip";

    // 1. Attempt to delete existing app (Optional: keep only if you really want a fresh start)
    try {
      await discloud.apps.delete(process.env.APP_ID);
      console.log("Old app instance deleted.");
    } catch (err) {
      console.log("No existing app found to delete, proceeding...");
    }

    // 2. Upload/Create new app
    console.log("Uploading new build...");
    const result = await discloud.apps.create({
      file: {
        data: fs.readFileSync(zipPath),
        name: "bot.zip"
      }
    });
    console.log("Upload successful:", result.message);

    // 3. Fetch status
    const status = await discloud.apps.status.fetch(process.env.APP_ID);
    console.log("Deployment confirmed. Container status:", status.container);
    
  } catch (err) {
    console.error("Deployment failed:", err.message);
    process.exit(1);
  }
}

run();
