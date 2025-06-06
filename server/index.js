const Rider = require("./models/Rider"); // after other imports

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  socket.on("send-location", async (data) => {
    try {
      // Save or update rider in DB
      await Rider.findOneAndUpdate(
        { riderId: data.riderId },
        {
          ...data,
          updatedAt: new Date(),
        },
        { upsert: true, new: true }
      );

      // Send to all connected admin clients
      io.emit("receive-location", data);
    } catch (err) {
      console.error("MongoDB update error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});
