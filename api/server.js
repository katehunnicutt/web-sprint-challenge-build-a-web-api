const express = require('express');
const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")
const server = express();

server.use(express.json()) //parse
server.use("/api/actions", actionsRouter)
server.use("/api/projects", projectsRouter)

server.get("/", (req, res) => {
  res.send(`
  <h1> Api Sprint Challenge </h1>
  <p> I'm not crying </p>
  <p> you're crying </p>
  `)
})
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
