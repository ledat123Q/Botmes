module.exports.config = {
  name: "chuilientuc2",
  aliases: ["tdc"],
  version: "1.1.0",
  description: "Chửi liên tục ko ngừng",
  usage: "[tag]",
  cooldown: 3,
  permissions: [0], // ai cũng được, check admin thủ công bên dưới
  credits: "vml"
};

if (!global.chuilientuc) {
  global.chuilientuc = new Map();
}

const DELAY_THREAD = 1000 * 60; // 1 phút
const DELAY = 3000; // 3 giây
const CAU_CHUI = ["cho an cut cay 🤣🤣 {name}",
  "sua de 🤣🤣 {name}",
  "cho bu cut🤣🤣👌{name}",
  "hang hai de :)) {name}",
  "cham do 🤣🤣 {name}",
  "oc dai cay r🤣🤣 {name}",
  "an hai phat bieu le de 🤣🤣 {name}",
  "oc dai :))) {name}",
  "on phai k? {name}",
  "ngu on 🤣🤣👌 {name}",
  "cho an cut 🐶 {name}",
  "dai du :)))) {name}",
  "yeu du ta😏😏 {name}",
  "con cho dan👉🤣 {name}",
  "on du chua =))) {name}",
  "run on da :))) {name}",
  "oc du 🤣🤣 {name}",
  "roi xong 🤢🤢 {name}",
  "co the hang ko a  {name}",
  "em cay doai =))) {name}",
  "cay tuot buoi 👉🤣{name}",
  "ei ei =)) {name}",
  "em ei :3 {name}",
  "chay a {name}",
  "may so ha 🤢🤢 {name}",
  "coi em son kia🤣🤣 👌{name}",
  "lai ba a :))) {name}",
  "sao cham du {name}",
  "eo oyyy:3 {name}",
  "hu hu🤨 {name}",
  "sao uc che da 😏😏 {name}",
  "con nao cun bi chui kia 🤣🤣🐶 {name}",
  "mau de :)) {name}",
  "hang de :))) {name}",
  "sua mau de =)) {name}",
  "can cuu ko :)) {name}",
  "co di :3 {name}",
  "gang len de :))) {name}",
  "sua to len🤣🤣 {name}",
  "pho nong thon 🤢🤢 {name}",
  "oc cac tinh le =)))) {name}",
  "khoe ko 🤣🤣 {name}",
  "kkk {name}",
  "doi a🤣🐶👌 {name}",
  "an chua a 🤣🤣 {name}",
  "chua dk :))) {name}",
  "thay kem coi :)) {name}",
  "du cut kia :))) {name}",
  "eo oyyy:3 {name}",
  "co de 🤣🤣 {name}",
  "thay may do do :))) {name}",
  "con cave 🤣🤣 {name}",
  "manh len:))) {name}",
  "go manh len de:)) {name}",
  "thay ngai ngung z🤣🤘 {name}",
  "tu nhien de {name}",
  "met dk {name}",
  "cam m ngung {name}",
  "di dau dinh :))) {name}",
  "le de:)) {name}",
  "may lag a :)) {name}",
  "m tram cam a :))) {name}",
  "tam li ko vung a :)) {name}",
  "can thuoc a :)) {name}",
  "hap hoi ha🤣🤣 {name}",
  "kho tho dk :)) {name}",
  "can oxi ko :))) {name}",
  "may benh nang lam a :))) {name}",
  "tuot hung cha :))) {name}",
  "tnh ga :))) {name}",
  "sao cham chap v :)) {name}",
  "oc dai 🤣🤣 {name}",
  "lon cu con di do🤣🤣 {name}",
  "luu loat len de 🤣🤣 {name}",
  "khung da :))) {name}",
  "t manh lam phai ko a :))) {name}",
  ":))) nho meu a ae {name}",
  "m ngheo ma {name}",
  "so t lam a:3 {name}",
  "ha cu =))) {name}",
  "thay toi qua:)) {name}",
  "thuong em co gang🤢🤘 {name}",
  "ma ngu🤣🤣 {name}",
  ":)) 🤣🤣 {name}",
  "cay lam a :)) {name}",
  "nhat nhoe v a {name}",
  "ko cam hung de hang a :))) {name}",
  "xao lon a :))) {name}",
  "khoc dk :))) {name}",
  "cave tinh le phat bieu:)) {name}",
  "ra tin hieu de :))) {name}",
  "SOS con dai du 🤣🤣🤢 {name}",
  "o o o :))) {name}",
  "cho an cut :))) {name}",
  "cho du san 👌🐶 {name}",
  "ia ra mau r a :))) {name}",
  "ngheo k co nghi luc a:)) {name}",
  "phan khang de :))) t win a {name}",
  "kkk {name}",
  "m chet r a :))) {name}",
  "m ngheo ma em 😏🤣 {name}",
  "m them cut t ma:)) {name}",
  "di me m ngu ma👉🤣 {name}",
  "m cay tao ma :)) {name}",
  "con oc cut thoi🤢🤢 {name}",
  "con di mat chim🤪🤪 {name}",
  "om han a 🤨 {name}",
  "con di nha nui :))) {name}",
  "bede bong lo =)) {name}",
  "cn di me may {name}",
  "tao tu hinh me m ma :)) {name}",
  "tk phe vat an hai😏🤘 {name}",
  "du don ha con :)) {name}",
  "m sao do {name}",
  "sua ne  {name}",
  "123 sua😏 {name}",
  "le ne  {name}",
  "alo alo hu hu  {name}",
  "th cam thu {name}",
  "m s da  {name}",
  "m so me ha  {name}",
  "len di me ko giet cha ma m dau ma 😏 {name}",
  "hu :)) {name}",
  "bat on ho {name}",
  "s do  {name}",
  "m rot kia th ga🤪 {name}",
  "t cam m choi nhen {name}",
  "choi t giet cha ma m ne:))) {name}",
  "hang xiu le kaka🤢 {name}",
  "th dan  {name}",
  "len me bieu {name}",
  "k len t tuyet chung m nhen cn thu {name}",
  "m thich du ko da🤨 {name}","ko rep = t win nhen  {name}",
  "cam chay nhen {name}",
  "m mau  {name}",
  "len day o o  {name}",
  "th ngu e {name}",
  "s a len day me sut m chet {name}",
  "m khoc a 👉🤣 {name}",
  "sua lien tuc o🤣🤣 {name}",
  "cau cuu lu du a  {name}",
  "suc dai no xem a {name}",
  "dai tham v? {name}",
  "cham v cn culi🤣🤣👌 {name}",
  "hoang loan a {name}",
  "bat on a 🤮🤮 {name}",
  "run a {name}",
  "chay a  {name}",
  "duoi a  {name}",
  "bai chua 👉😏 {name}",
  "sua mau🙄🙄👈 {name}",
  "manh dan len  {name}",
  "nhanh t cho co hoi cuu ma m ne {name}",
  "cam mach me {name}",
  "ao war ho :)) {name}",
  "don ko  {name}",
  "dua ne len san t chap😏👌 {name}",
  "th cho bua m sao v {name}",
  "th dau buoi mat cho😢🫵🏻👈🏻 {name}",
  "cam hoang loan {name}",
  "lai phai win nua a🙄🙄 {name}",
  "kkk {name}"];

// onCall
module.exports.run = async function ({ api, event, args }) {
  const { threadID, senderID, mentions, messageReply } = event;

  // Check quyền admin nhóm
  const threadInfo = await api.getThreadInfo(threadID);
  const adminIDs = threadInfo.adminIDs.map(e => e.id);
  if (!adminIDs.includes(senderID)) {
    return api.sendMessage("Lệnh này chỉ cho admin nhóm dùng thôi nha!", threadID);
  }

  const mentionId = Object.keys(mentions)[0];
  const mentionName = mentions[mentionId];

  const isCallingStop = args[0]?.toLowerCase() === "stop";

  if (!mentionId && !isCallingStop) {
    return api.sendMessage("Vui lòng tag người cần chửi", threadID);
  }

  if (isCallingStop) {
    if (!global.chuilientuc.has(threadID)) {
      return api.sendMessage("Bot không đang chửi ai cả", threadID);
    }
    global.chuilientuc.delete(threadID);
    return api.sendMessage("vml tha cho mày đó akakak", threadID);
  }

  const _d = global.chuilientuc.get(threadID);
  if (_d) {
    const now = Date.now();
    const time = _d.time;
    const diff = now - time;

    if (diff < DELAY_THREAD) {
      const timeLeft = (DELAY_THREAD - diff) / 1000;
      return api.sendMessage(`Vui lòng đợi ${Math.ceil(timeLeft)}s để tiếp tục chửi`, threadID);
    }
  }

  global.chuilientuc.set(threadID, { time: Date.now() });

  while (true) {
    for (let i = 0; i < CAU_CHUI.length; i++) {
      if (!global.chuilientuc.has(threadID)) return;

      const cauChui = CAU_CHUI[i];
      const msg = cauChui.includes("{name}")
        ? {
            body: cauChui.replace("{name}", mentionName),
            mentions: [{ tag: mentionName, id: mentionId }]
          }
        : { body: cauChui };

      await api.sendMessage(msg, threadID);
      await new Promise(resolve => setTimeout(resolve, DELAY));
    }
  }
};
