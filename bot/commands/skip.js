const distube = require("../distube")

module.exports = async function skipCommand(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('You need to be in a voice channel to use this command.');

    const queue = distube.getQueue(message.guildId);
    if (!queue || !queue.songs || queue.songs.length === 0) {
        return message.reply("There is no music currently playing in this server.");
    }

    // Check if there's a next song to skip to
    if (queue.songs.length <= 1) {
        return message.reply("There are no more songs in the queue to skip to.");
    }

    try {
        distube.skip(message.guildId);
        message.reply("Skipped to the next song.");
    } catch (error) {
        console.error('Skip command error:', error);
        if (error.errorCode === 'NO_UP_NEXT') {
            message.reply("There are no more songs in the queue to skip to.");
        } else {
            message.reply("An error occurred while trying to skip the song.");
        }
    }
}