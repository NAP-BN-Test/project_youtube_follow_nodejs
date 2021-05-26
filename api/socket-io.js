module.exports = {
    sockketIO: async(io) => {
        io.on("connection", async function(socket) {
            console.log(123);
            socket.on("withdrawal-notice-score", async function(data) {
                io.sockets.emit("withdrawal-notice-score", 123);
            });
        })
    }
}