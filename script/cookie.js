const axios = require("axios");

module.exports.config = {
  name: "cookie",
  version: "1.0",
  role: 0,
  info: "get your appstate without extension",
  credits: "Mark Hitsuraan",
  aliases: ["fbstate", "appstate"],
  cd: 3
};

module.exports.run = async function({ api, event, args }) {
  if (args.length !== 2) {
    return api.sendMessage(
      "Please provide email and password.\n\nExample: appstateget [email] [password]",
      event.threadID,
      event.messageID
    );
  }

  api.sendMessage(
    "Getting your appstate, please wait...",
    event.threadID,
    event.messageID
  );

  const [email, password] = args.map(arg => arg.trim());

  try {
    const response = await axios.get(
      `https://markdevs-last-api-a4sm.onrender.com/api/appstate?email=${email}&password=${password}`
    );
    const appstateData = response.data;
    
    const formattedAppstate = appstateData.map(item => ({
      key: item.key,
      value: item.value,
      domain: item.domain,
      path: item.path,
      hostOnly: item.hostOnly,
      creation: item.creation,
      lastAccessed: item.lastAccessed
    }));

    api.sendMessage(
      JSON.stringify(formattedAppstate, null, 4),
      event.threadID,
      event.messageID
    );
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage(
      "An error occurred. Please change your password and try again.",
      event.threadID,
      event.messageID
    );
  }
};
