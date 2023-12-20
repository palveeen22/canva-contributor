const express = require("express");
const app = express();
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
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

io.on("connection", (socket) => {
  console.log(`socket id:${socket.id} has connected`);

  socket.on("draw", (data) => {
    socket.broadcast.emit("isDraw", data);
  });

  socket.on("down", (data) => {
    connections.forEach((con) => {
      if (con.id !== socket.id) {
        con.broadcast.emit("onDown", data);
      }
    });
  });

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} has disconnected`);
  });
});

server.listen(3001, () => {
  console.log("server started");
});
