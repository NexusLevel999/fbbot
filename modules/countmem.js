const axios = require("axios");

module.exports.config = {
  name: "countmem",
  access: 0,
  info: "Count all members in the current group chat, display their names, and optionally include the group's name and picture.",
  usage: "countmem",
  alts:["allmem","memcount"],
  cd: 0,
  needPrefix: false
};

module.exports.run = async function({ api, event, args }) {
  try {
    // Get the current group chat information
    const groupInfo = await api.getThreadInfo(event.threadID);

    if (!groupInfo) {
      api.sendMessage('Invalid group chat. Please try again later.', event.threadID);
      return;
    }

    // Count the number of members in the group chat
    const memberCount = groupInfo.participantIDs.length;

    // Get the names of all members in the group chat
    const memberNames = [];
    for (const participantID of groupInfo.participantIDs) {
      const participantInfo = await api.getUserInfo(participantID);
      if (participantInfo) {
        memberNames.push(participantInfo.name);
      }
    }

    // Send the result to the user
    let message = `Member Count: ${memberCount}\n`;
    message += memberNames.join("\n");

    // Optionally, include the group's name and picture
    if (groupInfo.threadName) {
      message = `Group Name: ${groupInfo.threadName}\n\n${message}`;
    }
    if (groupInfo.groupPic) {
      // Send the group photo
      await api.sendMessage({
        attachment: groupInfo.groupPic,
        type: "image"
      }, event.threadID);
    }
    
    // Send the member names and other info
    await api.sendMessage(message, event.threadID);
  } catch (error) {
    console.error("Error counting group chat members", error);
    api.sendMessage('An error occurred while counting the group chat members.\nPlease try again later.', event.threadID);
  }
};
