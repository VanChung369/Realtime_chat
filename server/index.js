const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const userrouter = require("./routes/userrouter");
const messagesrouter = require("./routes/messagesrouter");
const socket = require("socket.io");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/user", userrouter);
app.use("/api/messages", messagesrouter);
const server = app.listen(port, () =>
  console.log(`Server is listening on port ${port}...`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
