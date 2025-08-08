const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const { token } = require('./config.json');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const { SpotifyPlugin } = require('@distube/spotify');
const { YouTubePlugin } = require('@distube/youtube');
const ffmpegPath = require('ffmpeg-static');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

const distube = new DisTube(client, {
    emitNewSongOnly: true,
    ffmpeg: {
        path: ffmpegPath
    },
    plugins: [
        new SpotifyPlugin((() => {
            const opts = {};
            if (process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET) {
                opts.api = {
                    clientId: process.env.SPOTIFY_CLIENT_ID,
                    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
                };
            }
            return opts;
        })()),
        new YouTubePlugin(),
        new YtDlpPlugin()
    ]
});

distube.on('ffmpegDebug', (msg) => console.log('[ffmpeg]', msg));

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!play')) {
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
});

distube.on('playSong', (queue, song) => {
    queue.textChannel.send(`Now playing: **${song.name}**`);
});
distube.on('addSong', (queue, song) => {
    queue.textChannel.send(`Added to queue: **${song.name}**`);
});
distube.on('error', (a, b) => {
    // Handle both signatures gracefully: (queue, error) or (error, queue)
    const isErrorFirst = a instanceof Error;
    const err = isErrorFirst ? a : b;
    const queue = isErrorFirst ? b : a;
    if (queue && queue.textChannel && err) {
        queue.textChannel.send(`Error: ${err.message || err}`);
    } else if (err) {
        console.error('Distube error:', err);
    } else {
        console.error('Distube error: unknown');
    }
});

client.login(token);