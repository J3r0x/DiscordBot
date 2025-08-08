const distube = require('../distube');

module.exports = async function playCommand(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('You need to be in a voice channel to use this command.');

    const args = message.content.split(' ').slice(1).join(' ');
    if (!args) return message.reply('You need to provide a song name or link to play.');

    distube.play(voiceChannel, args, {
        member: message.member,
        textChannel: message.channel,
        message
    });
}