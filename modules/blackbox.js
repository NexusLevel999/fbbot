const axios = require('axios');

module.exports.config = {
	name: "blackbox",
	access: 0,
	needPrefix: false,
	info: "AI powered by blackbox",
	alts: ["black","box"],
	cd: 0,
};

module.exports.run = async function ({api, event, args}) {
	if (!args[0]) {
		api.sendMessage("How can I help you today? Please provide a question.", event.threadID, event.messageID);
		return;
	}

	const query = encodeURIComponent(args.join(" "));
	const apiUrl = `https://api.easy-api.online/api/blackbox?query=${query}`;

	try {
		const response = await axios.get(apiUrl);
		const ans = response.data.response;
		api.sendMessage(ans, event.threadID, event.messageID);
	} catch (error) {
		console.error("Error:", error);
		api.sendMessage("An error occurred while fetching the response.", event.threadID, event.messageID);
	}
};
