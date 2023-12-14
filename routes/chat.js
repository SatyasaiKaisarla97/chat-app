const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/login", (req, res) => {
  res.send(`
      <form action="/chat" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <button type="submit">Login</button>
      </form>
    `);
});

router.post("/chat", (req, res) => {
  const { username } = req.body;
  res.redirect(`/chat?username=${encodeURIComponent(username)}`);
});

router.get("/chat", (req, res) => {
  const username = req.query.username;

  if (!username) {
    res.redirect("/login");
  } else {
    const messages = fs.readFileSync("messages.txt", "utf-8").split("\n");
    const html = `
        <p>${messages}</p>
        <form action="/send" method="post">
          <input type="hidden" name="username" value="${username}">
          <label for="message">Message:</label>
          <input type="text" id="message" name="message" required>
          <button type="submit">Send</button>
        </form>
      `;
    res.send(html);
  }
});

router.post("/send", (req, res) => {
  const { username, message } = req.body;
  const formattedMessage = `${username}: ${message}\n`;
  fs.appendFileSync("messages.txt", formattedMessage);
  res.redirect(`/chat?username=${encodeURIComponent(username)}`);
});

module.exports = router;
