const playCommand = require('../bot/commands/play');

module.exports = async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!play')) {
        playCommand(message);
    }
};