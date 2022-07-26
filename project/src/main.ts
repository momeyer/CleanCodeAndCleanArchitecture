import Server from "./Server";

const server = new Server();

server.run(3000).catch(console.error);
