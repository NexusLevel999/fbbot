module.exports.config = {
		name: "listbox",
		access: 0,
		info: "get tid of group contain bot",
		needPrefix: false,
	    alts: ["allbox","listgc"],
		usage: "allbox",
		cd: 5
};

module.exports.run = async function ({ api, event }) {
		var num = 0, box = "";
		api.getThreadList(100, null, ["INBOX"], (err, list) => {
				list.forEach(info => {
						if (info.isGroup && info.isSubscribed) {
								box += `${num+=1}. ${info.name} - ${info.threadID}\n`;
						}			
				});
				api.sendMessage(box, event.threadID, event.messageID);
		});
};
