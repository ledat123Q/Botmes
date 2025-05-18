const langData = {
    "en_US": {
        "isAFK": "This person is busy.",
        "isAFKReason": "This person is busy. Reason: {reason}",
        "botMention": "What can I help you?"
    },
    "vi_VN": {
        "isAFK": "Người này đang bận.",
        "isAFKReason": "Người này đang bận. Lý do: {reason}",
        "botMention": "Tag cái khố dai,nuwng lâu chưa?"
    }
};

module.exports.langData = langData;

function checkAFK({ api, event, getLang }) {
    const { mentions } = event;
    for (const mention of Object.keys(mentions)) {
        const mentionData = global.data.users.get(mention) || {};
        if (mentionData.data && mentionData.data.afk && mentionData.data.afk.status) {
            api.sendMessage(
                mentionData.data.afk.reason
                    ? getLang("isAFKReason", { reason: mentionData.data.afk.reason })
                    : getLang("isAFK"),
                event.threadID,
                event.messageID
            );
        }
    }
}

function checkBotMention({ api, event, getLang }) {
    if (Object.keys(event.mentions).some(mention => mention == global.botID)) {
        api.sendMessage(getLang("botMention"), event.threadID, event.messageID);
    }
}

async function run({ api, event, getLang }) {
    if (Object.keys(event.mentions).length === 0 || event.senderID === global.botID) {
        return;
    }

    checkAFK({ api, event, getLang });
    checkBotMention({ api, event, getLang });
}

module.exports.run = run;
