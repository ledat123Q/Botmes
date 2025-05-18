module.exports = {
  config: {
    name: "tagall",
    aliases: ["all", "everyone"],
    permissions: [1, 2],
    description: "Mention all members in group",
    usage: "<text>",
    cooldown: 10,
    commandCategory: "group", // bắt buộc phải có nếu bot yêu cầu
    credits: "XaviaTeam"
  },

  langData: {
    "en_US": {
      "tagall.defaultText": "@everyone"
    },
    "vi_VN": {
      "tagall.defaultText": "@mọi người"
    }
  },

  onCall({ message, args, getLang }) {
    const { isGroup, senderID, participantIDs } = message;
    if (!isGroup) return;

    const emptyChar = '\u200B';
    const text = args.join(" ") || getLang("tagall.defaultText");
    const mentions = participantIDs
      .filter(e => e != global.botID && e != senderID)
      .map((e, i) => ({ tag: text[i] || emptyChar, id: e }));

    if (mentions.length > 0) {
      message.reply({
        body:
          mentions.length > text.length
            ? text + emptyChar.repeat(mentions.length - text.length)
            : text,
        mentions
      });
    }
  }
};
