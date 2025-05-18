const config = {
    name: "mods",
    aliases: ["moderators"],
    version: "1.0.1",
    description: "List, Add or remove moderators",
    permissions: [2],
    cooldown: 5
};

module.exports.config = config;

const langData = {
    "en_US": {
        "notAbsolute": "You are not an absolute moderator.",
        "alreadyModerator": "This user is already a moderator.",
        "notModerator": "This user is not a moderator.",
        "missingTarget": "Please mention or reply someone.",
        "add.success": "Added to moderator list:\n{added}",
        "remove.success": "Removed from moderator list:\n{removed}",
        "list": "Moderators:\n{moderators}",
        "error": "Error: {error}"
    },
    "vi_VN": {
        "notAbsolute": "Bạn không phải là quản trị viên tuyệt đối.",
        "alreadyModerator": "Người dùng này đã là quản trị viên.",
        "notModerator": "Người dùng này không phải là quản trị viên.",
        "missingTarget": "Vui lòng nhắc đến hoặc trả lời một người.",
        "add.success": "Đã thêm vào danh sách quản trị viên:\n{added}",
        "remove.success": "Đã xóa khỏi danh sách quản trị viên:\n{removed}",
        "list": "Quyền admin BOT \n{moderators}",
        "error": "Lỗi: {error}"
    },
    "ar_SY": {
        "notAbsolute": "أنت لست المشرف المطلق.",
        "alreadyModerator": "هذا المستخدم هو بالفعل مسؤول.",
        "notModerator": "هذا المستخدم ليس مسؤولاً.",
        "missingTarget": "يرجى ذكر أو الرد على شخص.",
        "add.success": "تمت الإضافة إلى قائمة المشرفين:\n{added}",
        "remove.success": "تمت إزالته من قائمة الإدارة:\n{removed}",
        "list": "المسؤولين:\n{moderators}",
        "error": "خطأ: {error}"
    }
};

module.exports.langData = langData;

async function run({ api, event, args, getLang }) {
    const { type, messageReply, mentions, senderID, threadID, messageID } = event;

    try {
        const isAbsolute = global.config.ABSOLUTES.some(id => id == senderID);

        let query = args[0]?.toLowerCase();
        switch (query) {
            case "add":
                {
                    if (!isAbsolute) return api.sendMessage(getLang("notAbsolute"), threadID, messageID);

                    let success = [];
                    if (type == "message_reply") {
                        let userID = messageReply.senderID;
                        if (global.config.MODERATORS.some(id => id == userID)) return api.sendMessage(getLang("alreadyModerator"), threadID, messageID);
                        global.config.MODERATORS.push(String(userID));
                        success.push({
                            id: userID,
                            name: (await global.controllers.Users.getInfo(userID))?.name || userID
                        });
                    } else if (Object.keys(mentions).length > 0) {
                        for (const userID in mentions) {
                            if (global.config.MODERATORS.some(id => id == userID)) continue;
                            global.config.MODERATORS.push(String(userID));
                            success.push({
                                id: userID,
                                name: mentions[userID].replace(/@/g, '')
                            });
                        }
                    } else return api.sendMessage(getLang("missingTarget"), threadID, messageID);

                    global.config.save();
                    api.sendMessage({
                        body: getLang("add.success", { added: success.map(user => user.name).join(", ") }),
                        mentions: success.map(user => ({ tag: user.name, id: user.id }))
                    }, threadID, messageID);

                    break;
                }
            case "remove":
            case "rm":
            case "delete":
            case "del":
                {
                    if (!isAbsolute) return api.sendMessage(getLang("notAbsolute"), threadID, messageID);

                    let success = [];
                    if (type == "message_reply") {
                        let userID = messageReply.senderID;
                        if (!global.config.MODERATORS.some(id => id == userID)) return api.sendMessage(getLang("notModerator"), threadID, messageID);
                        global.config.MODERATORS = global.config.MODERATORS.filter(id => id != userID);
                        success.push({
                            id: userID,
                            name: (await global.controllers.Users.getInfo(userID))?.name || userID
                        });
                    } else if (Object.keys(mentions).length > 0) {
                        for (const userID in mentions) {
                            if (!global.config.MODERATORS.some(id => id == userID)) continue;
                            global.config.MODERATORS = global.config.MODERATORS.filter(id => id != userID);
                            success.push({
                                id: userID,
                                name: mentions[userID].replace(/@/g, '')
                            });
                        }
                    } else return api.sendMessage(getLang("missingTarget"), threadID, messageID);

                    global.config.save();
                    api.sendMessage({
                        body: getLang("remove.success", { removed: success.map(user => user.name).join(", ") }),
                        mentions: success.map(user => ({ tag: user.name, id: user.id }))
                    }, threadID, messageID);

                    break;
                }
            default:
                {
                    let moderators = global.config.MODERATORS.map(async id => {
                        let info = await global.controllers.Users.getInfo(id);
                        return `${info?.name || id} (${id})`;
                    });
                    moderators = await Promise.all(moderators);

                    api.sendMessage(getLang("list", { moderators: moderators.join("\n") }), threadID, messageID);
                    break;
                }
        }
    } catch (error) {
        api.sendMessage(getLang("error", { error }), threadID, messageID);
    }

    return;
}

module.exports.run = run;
