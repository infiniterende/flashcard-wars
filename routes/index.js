const { Router } = require("express")
const router = Router()
const controller = require("../controllers")
const restrict = require("../helpers")

router.get("/", (req, res) => res.send("root"))

// users
router.post("/signup", (req, res) => controller.signUp(req, res))
router.post("/signin", (req, res) => controller.signIn(req, res))
router.get("/verifyuser", (req, res) => controller.verifyUser(req, res))
router.get("/profile", (req, res) => controller.userProfile(req, res))

router.get("/decks/:deckId", (req, res) => controller.getDeck(req, res))

router.get("/allDecks", (req, res) => controller.getAllDecks(req, res))
router.get("/:userId/decks/", (req, res) => controller.getUserDecks(req, res)) //returns array of all decks
router.post("/decks", (req, res) => controller.createDeck(req, res)) //create new deck
router.get("/decks/:deckId", (req, res) => controller.getDeck(req, res)) //get user's deck's flaschards
router.delete("/decks/:id", (req, res) => controller.deleteDeck(req, res))
//delete deck

//flashcards
router.post("/cards/:deckId", (req, res) => controller.createFlashcard(req, res))
router.get("/cards/:cardId", (req, res) => controller.getFlashcard(req, res))
router.put("/cards/:cardId", (req, res) => controller.editFlashcard(req, res))
router.delete("/cards/:cardId", (req, res) =>
  controller.deleteFlashcard(req, res)
)

router.put("/cards/:cardId/updateUserPoints", (req, res) => {
  controller.updateUserPoints(req, res)
}) //works

//leaderboard and ranks
router.get("/leaderboard", (req, res) => controller.getLeaderboard(req, res)) //works

module.exports = router