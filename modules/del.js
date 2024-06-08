module.exports.config = {
	name: "delete",
	access: 3,
	info: "delete file",
	alts: ["del","rmf"],
	usage: "{p}delete {filename}",
	needPrefix: false,
	cd: 5,
};

module.exports.run = async function ({ api, event, args }) {
	const fs = require('fs');
	const path = require('path');

	const fileName = args[0];

	if (!fileName) {
		api.sendMessage("Please provide a file name to delete.", event.threadID);
		return;
	}

	const filePath = path.join(__dirname, fileName);

	fs.unlink(filePath, (err) => {
		if (err) {
			console.error(err);
			api.sendMessage(`Failed to delete ${fileName}.`, event.threadID);
			return;
		}
		api.sendMessage(`( ${fileName} ) Deleted successfully!`, event.threadID);
	});
};
