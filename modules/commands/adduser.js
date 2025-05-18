module.exports.config = {
    name: "adduser",
    aliases: ["add"],
    description: "Add user to group",
    usage: "[uid/profileUrl]",
    cooldown: 3,
    permissions: [2],
    credits: "XaviaTeam"
};

module.exports.langData = {
    "en_US": {
        "missingInput": "You have not entered the ID or link profile of the person to add to the group.",
        "botNotAdmin": "The bot needs to be granted group administration rights to perform this command.",
        "invalidInput": "ID or link profile is invalid.",
        "botAdd": "The bot cannot add itself to the group.",
        "selfAdd": "You cannot use this command to add yourself to the group.",
        "success": "Added successfully.",
        "error": "An error has occurred, please try again later."
    },
    "vi_VN": {
        "missingInput": "Bạn chưa nhập ID hoặc link profile của người cần thêm vào nhóm.",
        "botNotAdmin": "Bot cần được cấp quyền quản trị nhóm để thực hiện lệnh này.",
        "invalidInput": "ID hoặc link profile không hợp lệ.",
        "botAdd": "Bot không thể tự thêm chính nó vào nhóm.",
        "selfAdd": "Bạn không thể dùng lệnh này để tự thêm chính mình vào nhóm.",
        "success": "Đã thêm thành công.",
        "error": "Đã có lỗi xảy ra, vui lòng thử lại sau."
    },
    "ar_SY": {
        "missingInput": "لم تقم بإدخال المعرف أو رابط الملف الشخصي الخاص بالشخص المراد إضافته إلى المجموعة..",
        "botNotAdmin": "يحتاج البوت إلى ان يكون ادمن في المجموعة لتنفيذ هذا الأمر.",
        "invalidInput": "المعرف أو رابط الملف الشخصي غير صالح.",
        "botAdd": "لا يستطيع البوت إضافة نفسه إلى المجموعة.",
        "selfAdd": "لا يمكنك استخدام هذا الأمر لإضافة نفسك إلى المجموعة.",
        "success": "اضيف بنجاح.",
        "error": "حصل خطأ. الرجاء المحاوله مرة اخرى."
    }
};

function adduser(api, userID, threadID) {
    return new Promise((resolve, reject) => {
        api.addUserToGroup(userID, threadID, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

module.exports.run = async function ({ api, event, args, getLang, Users, Threads }) {
    const { threadID, senderID, messageID } = event;

    if (!event.isGroup) return;

    const input = args[0]?.toLowerCase();
    if (!input) return api.sendMessage(getLang("missingInput"), threadID, messageID);

    try {
        const threadInfo = await Threads.getInfo(threadID);
        const isBotAdmin = threadInfo.adminIDs.some(e => e.id == api.getCurrentUserID());

        if (!isBotAdmin) return api.sendMessage(getLang("botNotAdmin"), threadID, messageID);

        let uid = !isNaN(input) ? input :
            input.match(/(?:(?:http|https):\/\/)?(?:www.|m.)?(?:facebook|fb).com\/(?!home.php)(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\.-]+)/)?.[1];

        if (!uid) return api.sendMessage(getLang("invalidInput"), threadID, messageID);

        if (isNaN(uid)) {
            const userData = await Users.getUID(uid);
            if (!userData) return api.sendMessage(getLang("invalidInput"), threadID, messageID);
            uid = userData;
        }

        if (uid == api.getCurrentUserID()) return api.sendMessage(getLang("botAdd"), threadID, messageID);
        if (uid == senderID) return api.sendMessage(getLang("selfAdd"), threadID, messageID);

        await adduser(api, uid, threadID);
        return api.sendMessage(getLang("success"), threadID, messageID);

    } catch (e) {
        console.error(e);
        return api.sendMessage(getLang("error"), threadID, messageID);
    }
};
