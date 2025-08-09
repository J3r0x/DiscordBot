const distube = require("../bot/distube");

module.exports = async (interaction, client) => {
    if (!interaction.isButton()) return;

    const { customId } = interaction;
    const member = interaction.member;
    const queue = distube.getQueue(interaction.guildId);

    // Check if user is in a voice channel
    if (!member.voice.channel) {
        return await interaction.reply({ 
            content: "You need to be in a voice channel to use music controls!", 
            flags: 64 // MessageFlags.Ephemeral
        });
    }

    // Check if bot is in the same voice channel
    if (queue && queue.voiceChannel && member.voice.channel.id !== queue.voiceChannel.id) {
        return await interaction.reply({ 
            content: "You need to be in the same voice channel as the bot!", 
            flags: 64 // MessageFlags.Ephemeral
        });
    }

    try {
        if (customId === "skip") {
            if (!queue) {
                return await interaction.reply({ 
                    content: "No music is currently playing!", 
                    flags: 64 // MessageFlags.Ephemeral
                });
            }

            // Check if there's a next song to skip to
            if (queue.songs.length <= 1) {
                return await interaction.reply({ 
                    content: "There are no more songs in the queue to skip to!", 
                    flags: 64 // MessageFlags.Ephemeral
                });
            }
            
            try {
                distube.skip(interaction.guildId);
                await interaction.reply({ 
                    content: "⏭️ Skipped the song!", 
                    flags: 64 // MessageFlags.Ephemeral
                });
            } catch (skipError) {
                if (skipError.errorCode === 'NO_UP_NEXT') {
                    await interaction.reply({ 
                        content: "There are no more songs in the queue to skip to!", 
                        flags: 64 // MessageFlags.Ephemeral
                    });
                } else {
                    throw skipError; // Re-throw other errors to be handled by outer catch
                }
            }
        } else if (customId === "stop") {
            if (!queue) {
                return await interaction.reply({ 
                    content: "No music is currently playing!", 
                    flags: 64 // MessageFlags.Ephemeral
                });
            }
            
            distube.stop(interaction.guildId);
            await interaction.reply({ 
                content: "⏹️ Stopped the music!", 
                flags: 64 // MessageFlags.Ephemeral
            });
        }
    } catch (error) {
        console.error('Button interaction error:', error);
        if (!interaction.replied && !interaction.deferred) {
            try {
                await interaction.reply({ 
                    content: "An error occurred while processing the command.", 
                    flags: 64 // MessageFlags.Ephemeral
                });
            } catch (replyError) {
                console.error('Failed to reply to interaction:', replyError);
            }
        }
    }
};
