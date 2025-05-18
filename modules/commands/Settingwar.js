module.exports.config = {
    name: "settings",
    version: "1.0.0",
    hasPermission: 2,
    credits: "XaviaTeam",
    description: "Settings for better group management",
    commandCategory: "system",
    usages: "",
    cooldowns: 3,
    aliases: ["setting"]
};

const langData = {"vi_VN": {
        "menu": "⌈ 𝚃𝙷𝙴 𝙿𝙾𝚆𝙴𝚁 𝙾𝙵 𝚅𝙼𝙻 ⌋\n\n1. [{antiSpam}] 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠\n2. [{antiOut}] 𝗔𝗡𝗧𝗜 𝗢𝗨𝗧\n3. [{antiChangeGroupName}] 𝗔𝗡𝗧𝗜 𝗡𝗔𝗠𝗘𝗕𝗢𝗫\n4. [{antiChangeGroupImage}] 𝗔𝗡𝗧𝗜 𝗜𝗠𝗚𝗕𝗢𝗫\n5. [{antiChangeNickname}] 𝗔𝗡𝗧𝗜 𝗡𝗔𝗠𝗘\n\n6. [{notifyChange}] 𝗡𝗼𝘁𝗶 𝗘𝘃𝗲𝗻𝘁 𝗕𝗼𝘅\n\n⇒ Reply với các số thứ tự để chọn cài đặt bạn muốn thay đổi",

        "DataNotReady": "Dữ liệu chưa sẵn sàng, vui lòng thử lại sau\nHoặc dùng lệnh: ${prefix}refresh và thử lại",
        "notGroup": "Lệnh này chỉ có thể được sử dụng trong nhóm!",
        "error": "Đã xảy ra lỗi, vui lòng thử lại sau",

        "invalid": "Nhập liệu không hợp lệ",
        "botNotAdmin": "Bot không có quyền quản lý nhóm nên cài đặt antispam và antiout sẽ bị bỏ qua",

        "newSettings": "⚙ 🆅🅼🅻 🆂🅴🆃🆄🅿 ⚙\n\n1. [{antiSpam}] 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠\n2. [{antiOut}] 𝗔𝗡𝗧𝗜 𝗢𝗨𝗧\n3. [{antiChangeGroupName}] 𝗔𝗡𝗧𝗜 𝗡𝗔𝗠𝗘𝗕𝗢𝗫\n4. [{antiChangeGroupImage}] 𝗔𝗡𝗧𝗜 𝗜𝗠𝗚𝗕𝗢𝗫\n5. [{antiChangeNickname}] 𝗔𝗡𝗧𝗜 𝗡𝗔𝗠𝗘\n\n6. [{notifyChange}] 𝗡𝗼𝘁𝗶 𝗘𝘃𝗲𝗻𝘁 𝗕𝗼𝘅\n\n⇒ Thả 👍 để ban án tử =)))",

        "success": "BOX TAO LUẬT TAO 🔥🤣",
    },
    "en_US": {
        "menu": "⌈ GROUP SETTINGS ⌋\n\n1. [{antiSpam}] Anti Spam\n2. [{antiOut}] Anti Out\n3. [{antiChangeGroupName}] Anti Change Group Name\n4. [{antiChangeGroupImage}] Anti Change Group Image\n5. [{antiChangeNickname}] Anti Change Nickname\n\n6. [{notifyChange}] Notify group events\n\n⇒ Reply with numbers to choose the setting you want to change",
        "DataNotReady": "Data is not ready, please try again later\nOr use: ${prefix}refresh and try again",
        "notGroup": "This command can only be used in group!",
        "error": "An error occurred, please try again later",

        "invalid": "Invalid input",
        "botNotAdmin": "Bot is not admin in this group, so antispam and antiout will be ignored",

        "newSettings": "New setting:\n\n1. [{antiSpam}] Anti Spam\n2. [{antiOut}] Anti Out\n3. [{antiChangeGroupName}] Anti Change Group Name\n4. [{antiChangeGroupImage}] Anti Change Group Image\n5. [{antiChangeNickname}] Anti Change Nickname\n\n6. [{notifyChange}] Notify group events\n\n⇒ React 👍 to save the new settings",

        "success": "Successfully changed settings",
    },
    "ar_SY": {
        "menu": "⌈ اعـدادات الـمـجـموعـة ⌋\n\n1. [{antiSpam}] مكافحة الازعاج\n2. [{antiOut}] مكافحة الخروج\n3. [{antiChangeGroupName}] مكافحة تغيير اسم المجموعة\n4. [{antiChangeGroupImage}] مكافحة تغيير صورة المجموعة\n5. [{antiChangeNickname}] مكافحة تغيير الكنية\n\n6. [{notifyChange}] اخطار احداث المجموعة\n\n⇒ رد بأرقام لاختيار الإعداد الذي تريد تغييره",
        "DataNotReady": "البيانات ليست جاهزة ، يرجى المحاولة مرة أخرى في وقت لاحق\nاو استعمل: ${prefix}قم بالتحديث وحاول مرة أخرى",
        "notGroup": "لا يمكن استخدام هذا الأمر إلا في المجموعة!",
        "error": "لقد حدث خطأ، رجاء أعد المحاولة لاحقا",

        "invalid": "مدخل غير صالح",
        "botNotAdmin": "البوت ليس ادمن في هذه المجموعة ، لذلك سيتم تجاهل مكافحة الازعاج ومكافحة الخروج",

        "newSettings": "اعدادات جديدة:\n\n1. [{antiSpam}] مكافحة الازعاج\n2. [{antiOut}] مكافحة الخروج\n3. [{antiChangeGroupName}] مكافحة تغيير اسم المجموعة\n4. [{antiChangeGroupImage}] مكافحة تغيير صورة المجموعة\n5. [{antiChangeNickname}] مكافحة تغيير الكنية\n\n6. [{notifyChange}] اخطار احداث المجموعة\n\n⇒ تفاعل ب 👍 لحفظ الاعدادات الجديدة",

        "success": "تم تغيير الاعدادات بنجاح",
    }
};

async function confirmChange({ api, event, getLang, data, eventData }) {
    if (event.reaction != "👍") return;

    const { newSettings } = eventData;
    if (!newSettings || !data?.thread?.info)
        return api.sendMessage(getLang("error"), event.threadID);

    try {
        await global.controllers.Threads.updateData(event.threadID, { antiSettings: newSettings });
        api.sendMessage(getLang("success"), event.threadID);
    } catch (e) {
        console.error(e || "WTF");
        api.sendMessage(getLang("error"), event.threadID);
    }
}

async function chooseMenu({ api, event, args, getLang, data }) {
    try {
        let chosenIndexes = args.filter(e => !!e && !isNaN(e) && e > 0 && e <= 6);
        if (chosenIndexes.length == 0) return api.sendMessage(getLang("invalid"), event.threadID);

        const _THREAD = data?.thread;
        if (!_THREAD) return api.sendMessage(getLang("error"), event.threadID);

        const _THREAD_DATA = _THREAD.data;
        const _THREAD_DATA_ANTI_SETTINGS = _THREAD_DATA?.antiSettings;

        const newSettings = {
            antiSpam: !!_THREAD_DATA_ANTI_SETTINGS?.antiSpam,
            antiOut: !!_THREAD_DATA_ANTI_SETTINGS?.antiOut,
            antiChangeGroupName: !!_THREAD_DATA_ANTI_SETTINGS?.antiChangeGroupName,
            antiChangeGroupImage: !!_THREAD_DATA_ANTI_SETTINGS?.antiChangeGroupImage,
            antiChangeNickname: !!_THREAD_DATA_ANTI_SETTINGS?.antiChangeNickname,
            notifyChange: !!_THREAD_DATA_ANTI_SETTINGS?.notifyChange,
        };

        let settingsKeys = Object.keys(newSettings);
        for (const _index of chosenIndexes) {
            const _key = settingsKeys[_index - 1];
            newSettings[_key] = !newSettings[_key];
        }

        let isBotAdmin = data?.thread?.info?.adminIDs?.some(e => e.id == global.botID);
        if (!isBotAdmin && (newSettings.antiSpam || newSettings.antiOut)) {
            newSettings.antiOut = false;
            newSettings.antiSpam = false;
            await api.sendMessage(getLang("botNotAdmin"), event.threadID);
        }

        const _newSettings = {};
        for (const _key of settingsKeys) {
            _newSettings[_key] = newSettings[_key] ? "☠" : "❌";
        }

        api.sendMessage(getLang("newSettings", { ..._newSettings }), event.threadID, (_err, info) => {
            global.GoatBot.onReaction.set(info.messageID, {
                callback: confirmChange,
                messageID: info.messageID,
                threadID: event.threadID,
                newSettings,
                participantIDs: event.participantIDs,
                author: event.senderID,
                data,
                getLang,
                type: "reaction"
            });
        });

    } catch (e) {
        console.error(e || "WTFFF");
        api.sendMessage(getLang("error"), event.threadID);
    }
}

module.exports.run = async function({ api, event, args, getLang, data, prefix }) {
    if (!data?.thread?.info)
        return api.sendMessage(getLang("DataNotReady", { prefix }), event.threadID);
    if (!data.thread.info.isGroup)
        return api.sendMessage(getLang("notGroup"), event.threadID);

    const _THREAD_DATA_ANTI_SETTINGS = { ...(data.thread.data?.antiSettings || {}) };
    for (const _key of ["antiSpam", "antiOut", "antiChangeGroupName", "antiChangeGroupImage", "antiChangeNickname", "notifyChange"]) {
        _THREAD_DATA_ANTI_SETTINGS[_key] = _THREAD_DATA_ANTI_SETTINGS[_key] ? "☠" : "❌";
    }

    api.sendMessage(getLang("menu", { ..._THREAD_DATA_ANTI_SETTINGS }), event.threadID, (_err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
            type: "reply",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID,
            callback: chooseMenu,
            args,
            data,
            getLang
        });
    });
};
