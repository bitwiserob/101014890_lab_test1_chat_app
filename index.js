const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://admin:1234@101014890.ceawi2z.mongodb.net/?retryWrites=true&w=majority";
const User = require("./models/User");
const GroupMessage = require("./models/GroupMessage");
const PrivateMessage = require("./models/PrivateMessage");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

users = [];
rooms = [];
messages = [];

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    const user = new User({ username, password: hash });
    user.save((error) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(200).json({ message: "Signup successful!" });
    });
  });
});

app.get("/signup", (req, res) => {
  res.send(`
    <form action="/signup" method="post">
      <input type="text" name="username" placeholder="Username">
      <br>
      <input type="text" name="firstname" placeholder="First name">
      <br>
      <input type="text" name="lastname" placeholder="last name">
      <br>
      <input type="password" name="password" placeholder="Password">
      <br>
      <button type="submit">Sign Up</button>
    </form>
  `);
});

app.post("/signup", (req, res) => {
  console.log(JSON.stringify(req.body));
  const { username, password, firstname, lastname } = req.body;

  const user = new User({ username, firstname, lastname, password });

  user.save((err) => {
    if (err) {
      console.error("Failed to save user to the database:", err);
      return res.status(500).send("Failed to save user to the database");
    }
    console.log("User saved successfully");
    res.send("User saved successfully");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (data) => {
    io.emit("chat message", data);
    console.log(JSON.stringify(data.msg));
    var newMessage = new GroupMessage({
      sender: data.username,
      message: data.msg,
      room: "room1",
    });
    console.log(newMessage);
    newMessage.save((err) => {
      if (err) {
        console.error("Failed to save message to the database:", err);
        return socket.emit("error", "Failed to save message to the database");
      }
      console.log("Message saved successfully");
    });
  });
});

http.listen(3000, () => {
  console.log(`listening on 3000`);
});
