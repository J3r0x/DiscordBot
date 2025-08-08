const playCommand = require('../bot/commands/play');
const stopCommand = require('../bot/commands/stop');
const skipCommand = require('../bot/commands/skip');
const queueCommand = require('../bot/commands/queue');

module.exports = async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!play') || message.content.startsWith('!p')) {
        playCommand(message);
    }
    if (message.content.startsWith('!stop')) {
        stopCommand(message);
    }
    if (message.content.startsWith('!skip')) {
        skipCommand(message);
    }
    if (message.content.startsWith('!queue')) {
        queueCommand(message);
    }
};