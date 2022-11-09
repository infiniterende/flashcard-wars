const db = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// const Category = require("../models/category")
const User = require("../models/user")
const Deck = require("../models/deck")
const Flashcard = require("../models/flashcard")
const Mongoose = require("mongoose")
const ObjectId = require("mongodb").ObjectID
const flashcard = require("../models/flashcard")

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

db.on("error", console.error.bind(console, "MongoDB connection error:"))

const SALT_ROUNDS = 11
const TOKEN_KEY = process.env.TOKEN_KEY

// Helper functions
// given a req, determine the user_ID from the token. this lets us know which user based on their token has tried to access a route
const userOfRequest = (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const legit = jwt.verify(token, TOKEN_KEY)

    if (legit) {
      return legit
    }
    return false
  } catch (error) {
    console.log(error)
    return false
  }
}

// USERS - Auth
const signUp = async (req, res) => {
  try {
    console.log(req.body)
    const { username, name, password, admin_key } = req.body
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await new User({
      username,
      name,
      password_digest,
    })
    await user.save()

    const payload = {
      id: user._id,
      username: user.username,
      name: user.name,
    }

    const token = jwt.sign(payload, TOKEN_KEY)
    return res.status(201).json({ user: payload, token })
  } catch (error) {
    console.log("Error in signUp")
    return res.status(400).json({ error: error.message })
  }
}

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        username: user.username,
        name: user.name,
      }
      const token = jwt.sign(payload, TOKEN_KEY)
      return res.status(201).json({ user: payload, token })
    } else {
      res.status(401).send("Invalid Credentials")
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//verify user
const verifyUser = async (req, res) => {
  try {
    // can only verify with JWT
    const legit = await userOfRequest(req)

    if (legit) {
      const user = await User.findById(legit.id)

      const profile = {
        id: user._id,
        username: user.username,
        name: user.name,
      }

      return res.status(200).json({ user: profile })
    }
    return res.status(401).send("Not Authorized")
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getAllDecks = async (req, res) => {
  try {
    // const legit = await userOfRequest(req)
    // if (legit) {
      const decks = await Deck.find()
      return res.status(200).json(decks)
    // }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const getUserDecks = async (req, res) => {
  try {
    const legit = await userOfRequest(req)
    const { userId } = req.params
    if (legit) {
      const decks = await Deck.find({
        creator: userId,
      })
      return res.status(200).json(decks)
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getDeck = async (req, res) => {
  try {
    const legit = await userOfRequest(req)
    const { deckId } = req.params
    if (legit) {
      const flashcards = await Flashcard.find({ deck: deckId })
      return res.status(200).json(flashcards)
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}


const getFlashcard = async (req, res) => {
  try {
    const legit = await userOfRequest(req)
    const { cardId } = req.params
    if (legit) {
      const flashcard = await Flashcard.findById(cardId)
      return res.status(200).json(flashcard)
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const createFlashcard = async (req, res) => {
  try {
    const legit = await userOfRequest(req)
    const deckId = req.params.deckId // route contains deckId, flashcard must be part of an already existing deck
    if (legit) {
      const flashcardData = req.body
      flashcardData.creator = legit.id
      flashcardData.deck = deckId
      const flashcard = await new Flashcard(flashcardData)
      await flashcard.save()
      return res.status(200).json(flashcard)
    }
    return res.status(401).send("Not Authorized")
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const editFlashcard = async (req, res) => {
  try {
    // needs to be logged in and must match the creator
    const legit = await userOfRequest(req)

    if (legit) {
      const flashcard = await Flashcard.findById(req.params.cardId) //flashcardid in route

      if (legit.id !== flashcard.creator.toString()) {
        return res.status(401).send("Not Authorized")
      }

      const flashcardData = req.body

      await Flashcard.findByIdAndUpdate(
        req.params.cardId,
        flashcardData,
        { new: true },
        (error, flashcard) => {
          if (error) {
            return res.status(500).json({ error: error.message })
          }
          if (!flashcard) {
            return res.status(404).json({ message: "flashcard not found!" })
          }
          return res.status(200).json(flashcard)
        }
      )
    } else {
      return res.status(401).send("Not Authorized")
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const deleteFlashcard = async (req, res) => {
  try {
    // needs to be logged in to create and will be the creator
    const legit = await userOfRequest(req)

    if (legit) {
      const flashcard = await Flashcard.findById(req.params.cardId)

      if (!flashcard) {
        return res.status(401).send("No flashcard Found")
      }

      // only the creator may delete the flashcard
      if (legit.id !== flashcard.creator.toString()) {
        return res.status(401).send("Not Authorized")
      }

      const deletion = await Flashcard.findByIdAndDelete(req.params.cardId)

      return res.status(200).json(deletion)
    }
    return res.status(401).send("Not Authorized")
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const createDeck = async (req, res) => {
  try {
    const legit = await userOfRequest(req)
    if (legit) {
      const deckData = req.body
      deckData.creator = legit.id
      const category = await Category.find({ name: deckData.category })
      const updatedDeckData = {
        name: deckData.name,
        description: deckData.description,
        creator: legit.id,
      }
      const deck = await new Deck(updatedDeckData)
      await deck.save()
      return res.status(200).json(deck)
    }
    return res.status(401).send("Not authorized")
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}


const deleteDeck = async (req, res) => {
  try {
    const legit = await userOfRequest(req)
    const { id } = req.params
    if (legit) {
      const deck = await Deck.findById(id)
      // remove all flashcards in deck
      await deck.flashcards.forEach((flashcard) =>
        deleteFlashcardsFromDeck(flashcard)
      )
      // remove deck from categories' decks array
      await deleteDeckFromCategory(deck.category, id)

      const deletedDeck = await Deck.findByIdAndDelete(id)
      return res.status(200).json(deletedDeck)
    }
    return res.status(401).send("Not authorized")
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const updateRank = async (id, rank) => {
  await User.findByIdAndUpdate(id, { rank: rank }, { new: true })
}

const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1, username: 1 })
    const leaderBoard = users.map((user, index) => {
      updateRank(user["_id"], index + 1)
      return {
        id: user["_id"],
        rank: index + 1,
        username: user.username,
        points: user.points,
      }
    })
    return res.status(200).json(leaderBoard)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const userProfile = async (req, res) => {
  try {
    const legit = await userOfRequest(req)
    if (legit) {
      const user = await User.findById(legit.id).populate("decks")
      const userDecks = await Deck.find({creator: legit.id})
      const profile = {
        id: user._id,
        username: user.username,
        name: user.name,
        points: user.points,
        rank: user.rank,
        decks: userDecks
      }
      return res.status(200).json({ user: profile })
    }
    return res.status(401).send("Not Authorized")
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const updateUserPoints = async (req, res) => {
  //req takes in flashcard id
  try {
    const { cardId } = req.params
    const { points } = req.body
    const legit = await userOfRequest(req)
    if (legit) {
      const user = await User.findById(legit.id)

      const card = await Flashcard.findById(cardId)

      const cardPoints = parseInt(card.difficulty) * parseInt(points)
      const updatedUser = await User.findByIdAndUpdate(
        legit.id,
        { $set: { points: parseInt(user.points) + cardPoints } },
        { new: true },
        (error, event) => {
          if (error) {
            return res.status(404).json(error)
          }
          if (!event) {
            return res.status(404).send("not found")
          }
        }
      ).clone()
      return res.status(200).json(updatedUser)
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  signUp,
  signIn,
  verifyUser,
  getDeck,
  getAllDecks,
  getUserDecks,
  getFlashcard,
  getLeaderboard,
  createFlashcard,
  createDeck,
  userProfile,
  editFlashcard,
  deleteFlashcard,
  deleteDeck,
  updateUserPoints,
}