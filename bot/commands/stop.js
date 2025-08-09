const distube = require("../distube")

module.exports = async function stopCommand(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('You need to be in a voice channel to use this command.');

    const queue = distube.getQueue(message.guildId);
    if (!queue || !queue.songs || queue.songs.length === 0) {
        return message.reply("There is no music currently playing in this server.");
    }

    try {
        distube.stop(message.guildId);
        message.reply("Music playback stopped.");
    } catch (error) {
        console.error('Stop command error:', error);
        message.reply("An error occurred while trying to stop the music.");
    }
}