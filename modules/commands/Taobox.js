const config = {
  name: "taobox",
  aliases: ["rb"],
  description: "Tao box",
  usage: "[số lượng] [tên box]",
  cooldown: 3,
  permissions: [2],
  credits: ""
};

module.exports.config = config;

if (!global.taobox) global.taobox = new Set();

const DELAY = 450;

async function run({ api, event, args }) {
  if (event.senderID != global.botID) return;
  if (event.isGroup) return;

  let isStop = args[0]?.toLowerCase() == "stop";
  api.setMessageReaction("🃏", event.messageID);
  if (isStop) {
    global.taobox.delete(event.threadID);
    return;
  }

  let amount = parseInt(args[0]) || 1;
  let boxname = args[1] ?? null;

  const groupMembers = [event.senderID, event.threadID];
  global.taobox.add(event.threadID);

  for (let i = 0; i < amount; i++) {
    if (!global.taobox.has(event.threadID)) return;

    try {
      const newThreadID = await api.createNewGroup(groupMembers, boxname);
      api.sendMessage("Và đây là Hotwar VML 😎😎", newThreadID);
      await new Promise(resolve => setTimeout(resolve, DELAY));
    } catch (error) {
      console.error("Lỗi khi tạo box:", error);
      api.sendMessage("Đã có lỗi xảy ra khi tạo box.", event.threadID, event.messageID);
      global.taobox.delete(event.threadID);
      return;
    }
  }
}

module.exports.run = run;
