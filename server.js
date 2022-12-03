require('dotenv').config()

const express = require('express')
const http = require('http')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./db')
const routes = require('./routes')

const mongoose = require('mongoose')

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3000;

const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http:localhost:3000"
  }
});


app.use(express.urlencoded({extended:true}))

var corsOption = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: ["x-auth-token"],
  }
  
app.use(cors(corsOption))

app.use(morgan('dev'))

app.use(express.json())

app.use('/api', routes)


db.on("error", console.error.bind(console, "MongoDB connection error:"));

const path = require('path');

const dirPath = path.join(__dirname, '/frontend/public')
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


io.on('connection', (socket) => {
  console.log('a user connected');
  let users = []
  let userScores = {}
  let answers = []
  let answerStack = []
  // socket.emit("connect")
  // socket.on("disconnect", () => {
  //   console.log("Disconnected: " + socket.userId);
  // });
  let cardScores = []
  let userScoreMap = new Map()
  const getCardWinner = (cardScore) => {
    console.log("cardscore", cardScore)
    if(userScoreMap.has(cardScore["user"]["id"])) {
      userScoreMap[cardScore["user"]["id"]] += cardScore["score"]
    } else {
      userScoreMap[cardScore["user"]["id"]] = cardScore["score"]
    }
    
    let maxScore = 0
    let user;
    let cards = new Map()
    let winners = new Map()
    cardScores.push(cardScore)
    for(let cardScore of cardScores) {
      if (cards.has(cardScore["card"])) {
        cards[cardScore["card"]].push([cardScore["score"], cardScore["user"]])
      } else {
        cards[cardScore["card"]] = [[cardScore["score"], cardScore["user"]]]
      }
    }
    console.log("cards", cards)
    for(let card in cards) {
      console.log('card', card)
      for(let scoreUser of cards[card]) {
        if (maxScore < scoreUser[0]) {
          maxScore = scoreUser[0]
          user = scoreUser[1]
          console.log("user", user)
        }
      }
      winners[card] = user
    }
    console.log('score map', userScoreMap)
    return winners[cardScore["card"]]
  }

  const getGameWinner = () => {
    let maxScore = 0;
    let winner;
    for(let user in userScoreMap) {
      if (maxScore < userScoreMap.user) {
        maxScore = userScoreMap.user
        winner = user;
      }
    }
    return [maxScore, winner];
  }
  socket.on('setup', (user) => {
    // const {user} = data;
    users.push(user)
    console.log(user, 'connected')
    console.log('join', user)
    socket.emit("connected")
    let randomUser = users[0]
  socket.emit("pick user", randomUser)
  })
  let randomUser = users[0]
  socket.emit("pick user", randomUser)
    socket.on("get score", (cardScore) => {
      console.log("server get winner")
      let cardWinner = getCardWinner(cardScore)
      console.log("winner", cardWinner)
      socket.emit("get winner", cardWinner)
    })



  socket.emit('show users', users)
  let gameWinner = getGameWinner()
  socket.emit("game winner", gameWinner)
});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));