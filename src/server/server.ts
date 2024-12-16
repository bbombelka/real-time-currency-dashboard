import express, { Request, Response } from "express";
import { createServer } from "http";

import { Server, Socket } from "socket.io";
import auth from "./middleware/auth";
import userChoice from "./maps/UserChoice.map";
import eventEmitter from "./EventEmitter";
import { latestRates } from "./controllers/CurrencyController";

const app = express();
const httpServer = createServer(app);

app.use(express.static("client"));

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req: Request, res: Response) => {
  // res.send("/client");
  // res.sendFile(path.join(__dirname + "client/index.html"));
});

io.use(auth);

io.on("connection", (socket: Socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    userChoice.delete(socket.id);
  });

  socket.on("set-currencies", (currencies) => {
    userChoice.set(socket.id, currencies ?? []);
  });

  eventEmitter.on("rates-change", () => {
    if (!userChoice.size) {
      return;
    }

    const userSelectedCurrencies = userChoice.get(socket.id);
    const currenciesToSend = latestRates.currencies.filter(({ currency }) =>
      userSelectedCurrencies?.includes(currency)
    );

    socket.emit("send-currencies", currenciesToSend);
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// process.on("SIGINT", () => {
//   clearInterval(updateCurrenciesIndex);
//   httpServer.close(() => {
//     process.exit();
//   });
// });
