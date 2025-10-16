// server.js — CRT Signals Backend
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { generateMockSignals } from "./crt_engine.js";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

let lastSignals = [];

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.emit("crt_signal", { type: "INFO", message: "Connected to CRT backend" });

  // send mock price updates
  const interval = setInterval(() => {
    const signals = generateMockSignals();
    lastSignals = signals;
    signals.forEach(sig => socket.emit("crt_signal", sig));
  }, 4000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

app.get("/", (req, res) => {
  res.send("CRT Signals Backend Running ✅");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`CRT backend live on port ${PORT}`));
