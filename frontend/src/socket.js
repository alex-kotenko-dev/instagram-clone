// import { io } from "socket.io-client"

// let socket

// export const connectSocket = (token) => {
//   if (!socket) {
//     socket = io("http://localhost:5000", {
//       auth: { token },
//       reconnection: true,
//     })

//     socket.on("connect", () => {
//       console.log("Connected to socket", socket.id);
//     })

//     socket.on("disconnect", () => {
//       console.log("Disconnected from socket")
//     })
//   }
//   return socket
// }

// export const getSocket = () => socket



import { io } from "socket.io-client"

let socket

export const connectSocket = (token) => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      auth: { token },       
      transports: ["websocket"], 
      reconnection: true,
    })

    socket.on("connect", () => {
      console.log("Connected to socket", socket.id)
    })

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from socket:", reason)
    })

    socket.on("connect_error", (err) => {
      console.error("Socket connect error:", err.message)
    })
  }

  return socket
}

export const getSocket = () => socket