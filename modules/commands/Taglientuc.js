let isStopped = false;

module.exports.config = {
    name: "taglientuc",
    aliases: ["tag"],
    description: "",
    usage: "",
    cooldown: 3,
    permissions: [2],
    credits: "WaifuCat",
    extra: {}
};

module.exports.run = async function ({ api, event }) {
    const args = event.body.split(" ").slice(1);
    const mentionObj = event.mentions;

    if (args[0] === "s") {
        isStopped = true;
        return api.sendMessage("bị tag cay khét boài=)))", event.threadID, event.messageID);
    }

    if (isStopped) {
        isStopped = false;
    }

    if (!mentionObj || Object.keys(mentionObj).length === 0) {
        return api.sendMessage("Vui lòng tag ai đó.", event.threadID, event.messageID);
    }

    const mentionID = Object.keys(mentionObj)[0];
    let tagName = mentionObj[mentionID].replace(/@/g, "");

    // Detect mobile, nhưng bỏ vì không chạy được trong môi trường node
    // => luôn thêm tag
    const tag = `@${tagName}`;

    if (args.length > 0) {
        const messageToSend = args.join(" ");
        const sendTagMessage = (text) => {
            api.sendMessage({
                body: text,
                mentions: [{ tag, id: mentionID }]
            }, event.threadID);

            if (!isStopped) {
                setTimeout(() => sendTagMessage(text), 2500);
            }
        };
        sendTagMessage(messageToSend);
    } else {
        return api.sendMessage("Vui lòng nhập tin nhắn để lặp lại.", event.threadID, event.messageID);
    }
};
