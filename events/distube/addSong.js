const { EmbedBuilder } = require('discord.js');

module.exports = (queue, song) => {
    const embed = new EmbedBuilder()
        .setColor(0xFF0099)
        .setTitle('Song Added to Queue')
        .setDescription(`**${song.name}** has been added to the queue.`)
        .setTimestamp()

    queue.textChannel.send({ embeds: [embed] });
};
