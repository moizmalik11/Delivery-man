const Rider = require("./models/Rider"); // after other imports

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  socket.on("send-location", async (data) => {
    try {
      // Save or update rider in DB
      await Rider.findOneAndUpdate(
        { riderId: data.riderId },
        {
          riderId: data.riderId,
          name: data.name,
          location: {
            type: "Point",
            coordinates: [data.longitude, data.latitude],
          },
          avatarUrl: data.avatarUrl || null, // Optional field
          status: data.status || "idle", // Default to 'idle' if not provided
          // Add any other fields you want to store
          // For example, you can add a timestamp or other metadata
          // updatedAt: new Date(), // Optional, if you want to track when the data was last updated

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
  socket.on("get-riders", async () => {
    try {
      const riders = await Rider.find({});
      socket.emit("riders-list", riders);
    } catch (err) {
      console.error("MongoDB fetch error:", err);
      socket.emit("error", "Failed to fetch riders");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});
