const { existsSync, readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

module.exports.config = {
  name: "chuilientuc3",
  version: "1.0.0",
  hasPermssion: 1, // chỉ admin nhóm
  credits: "vml sửa bởi mày",
  description: "Chửi liên tục mỗi 6s (tag người)",
  commandCategory: "Troll",
  usages: "[tag | off]",
  cooldowns: 5
};

const path = join(global.assetsPath, 'reotag.json');
const reotag = [
  "sủa lẹ đi", "úi cn bướm khắm:))))", "cn già mày đập đt mày à eyy:))) ",
  "úi coi cn bẻm nó bị chà đạp kìa:)))", "khắm chui dô bướm con đĩ già nó chặn keo núp trỏng à:))))",
  "câm à con ngu:)))", " eyyy:))", "úi cái con hôi:)))", "chết cn già mày à:)))",
  "địt con cụ mày phọt khí bướm:)))", "úi cha bị úp:))) con trốn đâu r ae:)))",
  "ơi sao m ngu vậy", "M là con chó dưới chân t phải k?", "êi culi", // ...
  "cay cú ôm hận tao suốt đời nè phải không", "úi cái con chó này bị ngu à"
];

function onLoad() {
  if (!existsSync(path)) {
    writeFileSync(path, JSON.stringify({}), "utf-8");
  }

  setInterval(() => {
    const data = JSON.parse(readFileSync(path, "utf-8"));
    for (let [threadID, value] of Object.entries(data)) {
      if (value.enable) {
        if (value.index >= reotag.length) value.index = 0;
        global.api.sendMessage({
          body: `${reotag[value.index]} ${value.name}`,
          mentions: [{ tag: value.name, id: value.id }]
        }, threadID, () => {
          value.index++;
          writeFileSync(path, JSON.stringify(data, null, 4), "utf-8");
        });
      }
    }
  }, 6000);
}

async function onCall({ message, args, event, api }) {
  const { threadID, senderID, isGroup } = message;

  // Check quyền admin nhóm
  if (isGroup) {
    const threadInfo = await api.getThreadInfo(threadID);
    const isAdmin = threadInfo.adminIDs.some(admin => admin.id === senderID);
    if (!isAdmin) return message.reply("Lệnh này chỉ admin nhóm dùng được.");
  }

  let data = JSON.parse(readFileSync(path, "utf-8"));
  if (!data[threadID]) {
    data[threadID] = {
      enable: false,
      index: 0,
      id: "",
      name: ""
    };
  }

  const input = args.join(" ");
  if (input == "off") {
    data[threadID].enable = false;
    data[threadID].index = 0;
    data[threadID].id = "";
    data[threadID].name = "";
  } else {
    if (Object.keys(message.mentions).length === 0)
      return message.reply("Thiếu tag ai để chửi");

    data[threadID].enable = true;
    data[threadID].id = Object.keys(message.mentions)[0];
    data[threadID].name = Object.values(message.mentions)[0];
  }

  writeFileSync(path, JSON.stringify(data, null, 4), "utf-8");
  return message.reply(`Đã ${(input == "off" ? "tắt" : "bật")} chửi`);
}

module.exports = {
  config: module.exports.config,
  onLoad,
  onCall
};
