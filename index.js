const { Client, Events, GatewayIntentBits, messageLink } = require('discord.js');
const {token} = require('./config.json');
const {Distube} = require('distube');
const {YtDlpPlugin} = require('@distube/yt-dlp')
const { joinVoiceChannel } = require('@discordjs/voice');



const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    if (message.content === '!join') {
        const voiceChannel  = message.member.voice.channel;
        if(!message.member.voice.channel) return message.reply('You need to be in a voice channel to use this command.');
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator
        
        });
        message.reply('Joined your voice channel!');
    }
});

client.login(token);