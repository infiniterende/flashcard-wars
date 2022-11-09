const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Deck = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("decks", Deck)