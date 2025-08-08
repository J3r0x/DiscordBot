require('dotenv').config();
const { token } = require('./config.json');
const client = require('./bot/client');
const distube = require('./bot/distube');
const { Events } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Cargar eventos de Discord
fs.readdirSync('./events').forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(Events[eventName.charAt(0).toUpperCase() + eventName.slice(1)], (...args) => event(...args, client));
});

// Cargar eventos de DisTube
fs.readdirSync('./events/distube').forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/distube/${file}`);
    const eventName = file.split('.')[0];
    distube.on(eventName, event);
});

client.login(token);
