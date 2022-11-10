require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./db')
const routes = require('./routes')

const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000;

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

// mongoose.set('useFindAndModify', false)

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));