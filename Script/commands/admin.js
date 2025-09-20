const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
    name: "admininfo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ULLASH",
    description: "Show Admin Info",
    commandCategory: "info",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    var time = moment().tz("Africa/Algiers").format("DD/MM/YYYY hh:mm:ss A");

    var callback = () => api.sendMessage({
        body: `
┏━━━━━━━━━━━━━━━━━━━━━┓
┃      🌟 معلومات الأدمن 🌟      
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 الاسم        : مݛاسۧۛيݪٰ
┃ 🚹 الجنس       : ذكر
┃ ❤️ الحالة      : أعزب
┃ 🎂 العمر       : 20
┃ 🕌 الدين        : الإسلام
┃ 🏫 التعليم     : ضابط استخباراتي
┃ 🏡 العنوان     : الجزائر-الأغواط
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🕒 تم التحديث في: ${time}
┗━━━━━━━━━━━━━━━━━━━━━┛
        `,
        attachment: fs.createReadStream(__dirname + "/cache/admin.png")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/admin.png"));

    // رابط صورة الأدمن مباشرة
    return request(encodeURI(`https://graph.facebook.com/100000555481981/picture?height=720&width=720`))
        .pipe(fs.createWriteStream(__dirname + '/cache/admin.png'))
        .on('close', () => callback());
};
