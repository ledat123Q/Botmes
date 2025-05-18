const config = {
    name: "out",
    aliases: ["leave"],
    description: "Leave the group/all groups, please note that the out all will not include the message request/spam group",
    usage: "[groupID/all]",
    cooldown: 5,
    permissions: [2],
    credits: "XaviaTeam",
    isAbsolute: true
};

module.exports.config = config;

const langData = {
    "vi_VN": {
        "noThreadToOut": "Không có nhóm nào để rời.",
        "invalidThreadIDs": "ID nhóm không hợp lệ.",
        "confirm": "React 👍 để xác nhận.",
        "moderator": "Quản trị Bot",
        "out": "⚠️ THÔNG BÁO ⚠️\n\nBot đã được nhận lệnh rời khỏi nhóm!\nLiên hệ {authorName} để biết thêm chi tiết.",
        "successOut": "Đã rời khỏi {successCount} nhóm.",
        "failOut": "Không thể rời khỏi nhóm:\n{fail}",
        "error": "Đã có lỗi xảy ra, vui lòng thử lại sau."
    },
    "en_US": {
        "noThreadToOut": "There is no group to leave.",
        "invalidThreadIDs": "Invalid group IDs.",
        "confirm": "React 👍 to confirm.",
        "moderator": "Bot Moderator",
        "out": "⚠️ NOTICE ⚠️\n\nBot has been ordered to leave the group!\nContact {authorName} for more details.",
        "successOut": "Left {successCount} groups.",
        "failOut": "Unable to leave group:\n{fail}",
        "error": "An error has occurred, please try again later."
    },
    "ar_SY": {
        "noThreadToOut": "لا توجد مجموعة لتغادر.",
        "invalidThreadIDs": "معرفات المجموعة غير صالحة.",
        "confirm": "تفاعل ب 👍 للتأكيد.",
        "moderator": "مشرف الروبوت",
        "out": "⚠️ انتبه⚠️\n\nأمر البوت بمغادرة المجموعة!\nاتصال {authorName} لمزيد من التفاصيل.",
        "successOut": "غادر {successCount} المجموعات.",
        "failOut": "غير قادر على مغادرة المجموعة:\n{fail}",
        "error": "حصل خطأ. الرجاء المحاوله مرة اخرى."
    }
};

module.exports.langData = langData;

function out(api, botID, threadID) {
    return new Promise(resolve => {
        api.removeUserFromGroup(botID, threadID, err => {
            if (err) {
                console.error(err);
                return resolve(null);
            };
            resolve(true);
        });
    });
}

async function verifyAccess({ api, event, getLang, eventData, data }) {
    try {
        const { reaction, userID, threadID: currentThreadID, messageID: currentMessageID } = event;
        if (reaction != "👍") return;

        let threadIDs = eventData.threadIDs;

        const isHavingCurrentThreadID = threadIDs.some(id => id == currentThreadID);
        if (isHavingCurrentThreadID) {
            threadIDs = threadIDs.filter(id => id != currentThreadID);
            threadIDs.push(currentThreadID);
        }

        let authorName = data?.user?.info?.name || getLang("moderator");

        const fail = [];
        for (const targetThreadID of threadIDs) {
            await api.sendMessage({
                body: getLang("out", { authorName }),
                mentions: [{ tag: authorName, id: userID }]
            }, targetThreadID);

            const result = await out(api, global.botID, targetThreadID);
            if (result == null) fail.push(targetThreadID);

            await new Promise(resolve => setTimeout(resolve, 500));
        }

        const sendTarget = isHavingCurrentThreadID && !fail.some(id => id == currentThreadID) ? userID : null;

        const successCount = threadIDs.length - fail.length;

        if (sendTarget) {
            await api.sendMessage(getLang("successOut", { successCount }), sendTarget);
            if (fail.length > 0) await api.sendMessage(getLang("failOut", { fail: fail.join("\n") }), sendTarget);
        } else {
            await api.sendMessage(getLang("successOut", { successCount }), currentThreadID);
            if (fail.length > 0) await api.sendMessage(getLang("failOut", { fail: fail.join("\n") }), currentThreadID);
        }

        return;
    } catch (e) {
        console.error(e);
        return api.sendMessage(getLang("error"), event.threadID, event.messageID);
    }
}

async function run({ api, event, args, getLang }) {
    try {
        const input = args[0]?.toLowerCase();
        const threadIDs = [];
        const { threadID, messageID, senderID } = event;

        if (input == "all") {
            const threadList = (await api.getThreadList(100, null, ["INBOX"]) || [])
                .filter(thread =>
                    thread.threadID != threadID &&
                    thread.isGroup &&
                    thread.isSubscribed
                );

            if (threadList.length == 0) return api.sendMessage(getLang("noThreadToOut"), threadID, messageID);

            threadIDs.push(...threadList.map(thread => thread.threadID));
        } else if (args.length > 0) {
            const inputThreadIDs =
                args
                    .map(id => id.replace(/[^0-9]/g, ""))
                    .filter(arg => arg.length >= 16 && !isNaN(arg));

            if (inputThreadIDs.length == 0) return api.sendMessage(getLang("invalidThreadIDs"), threadID, messageID);

            threadIDs.push(...inputThreadIDs);
        } else {
            threadIDs.push(threadID);
        }

        return api.sendMessage(getLang("confirm"), threadID, messageID)
            .then(info => global.client.handleReply.push({
                name: config.name,
                messageID: info.messageID,
                author: senderID,
                threadIDs,
                callback: verifyAccess
            }))
            .catch(e => {
                console.error(e);
                return api.sendMessage(getLang("error"), threadID, messageID);
            });
    } catch (e) {
        console.error(e);
        return api.sendMessage(getLang("error"), event.threadID, event.messageID);
    }
}

module.exports.run = run;
