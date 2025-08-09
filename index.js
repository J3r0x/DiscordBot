require('dotenv').config();
const { token } = require('./config.json');
const client = require('./bot/client');
const distube = require('./bot/distube');
const { Events } = require('discord.js');
const fs = require('fs');
const path = require('path');

console.log('Loading Discord events...');
// Cargar eventos de Discord
fs.readdirSync('./events').forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    console.log(`Loading Discord event: ${eventName}`);
    
    // Map event names to Discord.js Events
    const eventMap = {
        'ready': Events.ClientReady,
        'messageCreate': Events.MessageCreate,
        'interactionCreate': Events.InteractionCreate
    };
    
    const discordEvent = eventMap[eventName];
    if (discordEvent) {
        client.on(discordEvent, (...args) => event(...args, client));
    } else {
        console.log(`Warning: Unknown event ${eventName}`);
    }
});

console.log('Loading DisTube events...');
// Cargar eventos de DisTube
fs.readdirSync('./events/distube').forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/distube/${file}`);
    const eventName = file.split('.')[0];
    console.log(`Loading DisTube event: ${eventName}`);
    distube.on(eventName, event);
});

console.log('Logging in to Discord...');
client.login(token)
    .then(() => {
        console.log('Discord login successful!');
    })
    .catch(error => {
        console.error('Discord login failed:', error);
        process.exit(1);
    });
