
// credits: deku and api

module.exports.config = {
  name: 'ai',
  description: 'Talk to GPT (conversational)',
  alts: ["kazeu","gojo","yo","man","hey","hoy","\n"]
  needPrefix: false,
  usage: '[prompt]',
  access: 0,
  cd: 3
};

module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  const prompt = args.join(' ');
  const uid = event.senderID;
  
  if (!prompt) {
    return api.sendMessage('Please enter a prompt.', event.threadID);
  }

  try {
    const response = await axios.get(`https://deku-rest-api-3ijr.onrender.com/gpt4?prompt=${prompt}&uid=${uid}`);
    return api.sendMessage(response.data.gpt4, event.threadID);
  } catch (error) {
    return api.sendMessage(error.message, event.threadID);
  }
};
