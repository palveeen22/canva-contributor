const express = require("express");
const app = express();
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const authentication = require("./middlewares/authentication");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const activeUsers = {};

io.on("connection", (socket) => {
  console.log(`socket id:${socket.id} has connected`);

  // Simulating user authentication
  const email = authentication;
  // Store the user login information in the activeUsers object
  activeUsers[socket.id] = { email };

  socket.emit("login", { email });

  socket.on("draw", (data) => {
    socket.broadcast.emit("isDraw", data);
  });

  socket.on("down", (data) => {
    Object.keys(activeUsers).forEach((id) => {
      if (id !== socket.id) {
        io.to(id).emit("onDown", data);
      }
    });
  });

  // Emit the logged-in user's email to the client on demand
  socket.on("getEmail", () => {
    const { email } = activeUsers[socket.id];
    socket.emit("loggedInEmail", { email });
  });

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} has disconnected`);

    // Remove the user login information when a user disconnects
    delete activeUsers[socket.id];
  });
});

server.listen(3001, () => {
  console.log("server started");
});
