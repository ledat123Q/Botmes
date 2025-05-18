const config = {
    name: "taginfo",
    credits: "XaviaTeam"
};

module.exports.config = config;

function run({ api, event }) {
    const { senderID, mentions, threadID, messageID, type, messageReply } = event;
    let msg = "";

    if (Object.keys(mentions).length > 0) {
        msg = Object.entries(mentions)
            .map(e => `${e[1].replace(/@/g, '')} - ${e[0]}`)
            .join("\n");
    } else if (type === "message_reply") {
        msg = `${messageReply.senderID}`;
    } else {
        msg = `${senderID}`;
    }

    api.sendMessage(msg, threadID, messageID);
}

module.exports.run = run;
