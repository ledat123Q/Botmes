const config = {
		name: "spam",
		description: "spam spam spam",
		usage: "[nội dung]",
		cooldown: 3,
		permissions: [2],
		credits: "",
};

module.exports.config = config;

if (!global.spam) {
		global.spam = [];
}

async function run({ api, event, args }) {
	const { threadID, messageID } = event;
	const isStop = args[0]?.toLowerCase() === "stop";
	if (isStop) {
		const index = global.spam.indexOf(threadID);
		if (index > -1) {
			global.spam.splice(index, 1);
			return api.sendMessage("Đã dừng spam", threadID, messageID);
		} else {
			return api.sendMessage("Chưa bắt đầu spam", threadID, messageID);
		}
	} else {
		const spam_content = args.join(" ");

		if (spam_content.length === 0) {
			return api.sendMessage("spam đê", threadID, messageID);
		}

		if (global.spam.indexOf(threadID) > -1) {
			return api.sendMessage("Đang spam rồi, vui lòng dừng trước khi spam tiếp", threadID, messageID);
		} else {
			global.spam.push(threadID);
			while (global.spam.indexOf(threadID) > -1) {
				api.sendMessage(spam_content, threadID).catch(e => { console.error(e) });
				await new Promise(resolve => setTimeout(resolve, 5000)); // delay 5000 mili giây = 5 giây
			}
		}
	}
}

module.exports.run = run;
