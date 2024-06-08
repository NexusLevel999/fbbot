module.exports.config = {
	name: "out",
	access: 1,
	needPrefix: false,
	alts: [],
	info: "Bot leaves the thread",
	usage: "out",
	cd: 10,

};

module.exports.run = async function({ api, event, args, admin }) {
	try { 
	if (!args[0]) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
	if (!isNaN(args[0])) return api.removeUserFromGroup(api.getCurrentUserID(), args.join(" "));
		} catch (error) {
			api.sendMessage(error.message, event.threadID, event.messageID);
		}
};
