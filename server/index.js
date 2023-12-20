const express = require("express");
const app = express();
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const authentication = require("./middlewares/authentication");
const verifyToken = require("./helpers/jwt");

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
  const userId = authentication(); // Implement your actual authentication logic here
  const token = verifyToken; // Implement your token generation logic here

  // Store the user login information in the activeUsers object
  activeUsers[socket.id] = { userId, token };

  socket.emit("login", { userId, token });

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

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} has disconnected`);

    // Remove the user login information when a user disconnects
    delete activeUsers[socket.id];
  });
});

server.listen(3001, () => {
  console.log("server started");
});
