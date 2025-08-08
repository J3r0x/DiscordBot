const distube = require("../distube")

module.exports = async function skipCommand(message) {
    const queue = distube.getQueue(message);
    if (!queue) return message.reply("There is no music currently playing in this channel.");
    if (queue) {
        distube.skip(message);
        message.reply("Skipped to the next song.");
    }
}