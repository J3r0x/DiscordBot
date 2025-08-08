module.exports = (queue, song) => {
    queue.textChannel.send(`Added to queue: **${song.name}**`);
};
