const distube = require('../distube');

module.exports = async function queueCommand(message){
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('You need to be in a voice channel to use this command.');

    const queue = distube.getQueue(message);
    if (!queue) return message.reply("There is no music currently playing in this channel.");

    const queueList = queue.songs.map((song, index) => {
        return `${index + 1}. ${song.name} - ${song.formattedDuration}`;
    });

    message.reply(`Current queue:\n${queueList.join('\n')}`);
}