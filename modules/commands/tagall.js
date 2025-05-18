module.exports.config = {
  name: "tagall",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "XaviaTeam",
  description: "Tag toàn bộ thành viên trong nhóm",
  commandCategory: "group",
  usages: "[Text]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const botID = api.getCurrentUserID();
  const allUser = event.participantIDs.filter(id => id !== botID && id !== event.senderID);

  const text = args.join(" ") || "@mọi người";
  const mentions = [];

  for (let id of allUser) {
    mentions.push({
      tag: text,
      id
    });
  }

  return api.sendMessage({ body: text, mentions }, event.threadID, event.messageID);
};
