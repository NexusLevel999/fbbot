const axios = require('axios');
module.exports.config = {
  name: "quote",
  access: 0,
  needPrefix: false,
  info: "Get a random inspirational quote.",
  alts: [],
  usage: "quote",
  cd: 0
};
module.exports.run = async ({
  api,
  event
}) => {
  const {
    threadID,
    messageID
  } = event;
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const {
      content,
      author
    } = response.data;
    api.sendMessage(`"${content}" - ${author}`, threadID, messageID);
  } catch (error) {
    api.sendMessage("Sorry, I couldn't fetch a quote at the moment. Please try again later.", threadID, messageID);
  }
};
