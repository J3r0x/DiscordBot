module.exports = (queue, song) => {
    queue.textChannel.send(`Now playing: **${song.name}**`);
};