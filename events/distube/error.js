module.exports = (a, b) => {
    const isErrorFirst = a instanceof Error;
    const err = isErrorFirst ? a : b;
    const queue = isErrorFirst ? b : a;
    if (queue && queue.textChannel && err) {
        queue.textChannel.send(`Error: ${err.message || err}`);
    } else if (err) {
        console.error('Distube error:', err);
    } else {
        console.error('Distube error: unknown');
    }
};