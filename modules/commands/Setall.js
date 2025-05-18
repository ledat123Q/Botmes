module.exports.config = {
    name: "setbietdanh",
    aliases: ["vml"],
    description: "set biet danh cho toan bo thanh vien trong nhom",
    usage: "[cl]/[bietdanh]",
    cooldown: 1,
    permissions: [2],
    credits: "",
    extra: {}
};

module.exports.run = async function ({ api, event, args }) {
    const isClear = args[0]?.toLowerCase() === "cl";

    if (isClear) {
        for (const uid of event.participantIDs) {
            await api.changeNickname(null, event.threadID, uid);
            // await new Promise(res => setTimeout(res, 100)); // nếu bị block request thì mở cái này
        }
        return api.sendMessage("đọ set không 😂😂👍", event.threadID, event.messageID);
    }

    const nickname = args.join(" ");

    if (!nickname) {
        return api.sendMessage("óc chó sài lệnh kiểu 🤢👈", event.threadID, event.messageID);
    }

    for (const uid of event.participantIDs) {
        await api.changeNickname(nickname, event.threadID, uid);
        // await new Promise(res => setTimeout(res, 200)); // thêm delay nếu cần
    }

    return api.sendMessage("cay cay cay 🤣🤣👈", event.threadID, event.messageID);
};
