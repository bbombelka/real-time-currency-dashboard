import { Socket } from "socket.io";

export default function auth(socket: Socket, next: () => void) {
  const token = socket.handshake.auth.token;

  console.log("Current token is " + socket.handshake.auth.token);

  if (!token) {
    socket.data.error = "Authentication error: Token is required";
    return socket.disconnect();
  }

  if (token === "valid_token") {
    return next();
  } else {
    socket.data.error = "Authentication error: Invalid token";
    return socket.disconnect();
  }
}
