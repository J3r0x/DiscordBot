const distube = require('../distube');

module.exports = async function playCommand(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('You need to be in a voice channel to use this command.');

    const args = message.content.split(' ').slice(1).join(' ');
    if (!args) return message.reply('You need to provide a song name or link to play.');
    if (args.includes('playlist?list=')) {
        const playlistId = args.split('playlist?list=')[1];
        distube.play(voiceChannel, playlistId, {
            member: message.member,
            textChannel: message.channel,
            message
        });
    } else if(args.includes('open.spotify.com/playlist') || args.includes('https://open.spotify.com/playlist')) {
        const playlistId = args.split('playlist/')[1];
        distube.play(voiceChannel, playlistId, {
            member: message.member,
            textChannel: message.channel,
            message
        });
        }
    }