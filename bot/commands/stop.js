const distube = require("../distube")

module.exports = async function stopCommand(message) {
    const queue = distube.getQueue(message);
    if (!queue) return message.reply("There is no music currently playing in this channel.");
    if (queue) {
        distube.stop(message);
        message.reply("Music playback stopped.");
    }
}