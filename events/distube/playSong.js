const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = (queue, song) => {
    const embed = new EmbedBuilder()
        .setColor(0xFF0099)
        .setTitle('Now Playing')
        .setDescription(`**${song.name}** is now playing!`)
        .addFields(
            { name: 'Duration', value: song.formattedDuration, inline: true },
            { name: 'Requested by', value: song.user.tag, inline: true }
        )
        .setTimestamp()
        .setThumbnail(song.thumbnail);

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('skip')
                .setLabel('⏭️ Skip')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('stop')
                .setLabel('⏹️ Stop')
                .setStyle(ButtonStyle.Danger)
        );

    queue.textChannel.send({ embeds: [embed], components: [row] });
};