const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = process.env.PORT || 3000


const quotes = {
    allQuotes: [
        { id: "1", quote: "Love is composed of a single soul inhabiting two bodies.", author: { name: "Aristotle", origin: "Greek" }, topic: "Love" },
        { id: "2", quote: "You can't blame gravity for falling in love.", author: { name: "Albert Einstein", origin: "German" }, topic: "Love" },
        { id: "3", quote: "Love and compassion are necessities, not luxuries. Without them humanity cannot survive.", author: { name: "Dalai Lama", origin: "Tibetan" }, topic: "Love" },
        { id: "4", quote: "Life's most persistent and urgent question is, 'What are you doing for others?'", author: { name: "Martin Luther King, Jr.", origin: "American" }, topic: "Life" },
        { id: "5", quote: "He who has a why to live can bear almost any how.", author: { name: "Friedrich Nietzsche", origin: "German" }, topic: "Life" },
        { id: "6", quote: "Life is really simple, but we insist on making it complicated.", author: { name: "Confucius", origin: "Chinese" }, topic: "Life" },
        { id: "7", quote: "Always be yourself, express yourself, have faith in yourself, do not go out and look for a successful personality and duplicate it.", author: { name: "Bruce Lee", origin: "American" }, topic: "Success" },
        { id: "8", quote: "Strive not to be a success, but rather to be of value.", author: { name: "Albert Einstein", origin: "German" }, topic: "Success" },
        { id: "9", quote: "A man's friendships are one of the best measures of his worth.", author: { name: "Charles Darwin", origin: "English" }, topic: "Friendship" },
        { id: "10", quote: "The most I can do for my friend is simply be his friend.", author: { name: "Henry Thoreau", origin: "American" }, topic: "Friendship" },
        { id: "11", quote: "The only true wisdom is in knowing you know nothing.", author: { name: "Socrates", origin: "Greek" }, topic: "Wisdom" },
        { id: "12", quote: "By three methods we may learn wisdom: First, by reflection, which is noblest; Second, by imitation, which is easiest; and third by experience, which is the bitterest.", author: { name: "Confucius", origin: "Chinese" }, topic: "Wisdom" },
        { id: "13", quote: "The more you like yourself, the less you are like anyone else, which makes you unique.", author: { name: "Walt Disney", origin: "American" }, topic: "Wisdom" },
        { id: "14", quote: "Be slow in choosing a friend, slower in changing.", author: { name: "Benjamin Franklin", origin: "American" }, topic: "Friendship" },
        { id: "15", quote: "Success consists of going from failure to failure without loss of enthusiasm.", author: { name: "Winstonn Churchill", origin: "British" }, topic: "Success" },
        { id: "16", quote: "I've failed over and over and over again in my life and that is why I succeed.", author: { name: "Michael Jordan", origin: "American" }, topic: "Success" },
        { id: "17", quote: "The truth is you don't know what is going to happen tomorrow. Life is a crazy ride, and nothing is guaranteed.", author: { name: "Eminem", origin: "American" }, topic: "Life" },
        { id: "18", quote: "Life isn't about finding yourself. Life is about creating yourself.", author: { name: "George Bernard Shaw", origin: "Irish" }, topic: "Life" },
        { id: "19", quote: "Begin at once to live, and count each separate day as a separate life.", author: { name: "Seneca", origin: "Roman" }, topic: "Life" },
        { id: "20", quote: "Love does not consist in gazing at each other, but in looking outward together in the same direction.", author: { name: "Antoine de Saint-Exupery", origin: "French" }, topic: "Love" },]
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/quotes", (req, res) => {
    res.send(quotes.allQuotes)
})

app.get("/quotes/:id", (req, res) => {
    if (req.params.id > 0 && req.params.id <= quotes.allQuotes.length) {
        return res.send(quotes.allQuotes[req.params.id - 1])
    } else {
        return res.status(404).send("Quote with this ID not found!")
    }
})

app.get("/addQuote", (req, res) => {
    res.sendFile(__dirname + "/public/addQuote.html")
})

app.post("/addQuote", (req, res) => {

    let newQuote = req.body.quote;
    let newAuthorName = req.body.authorName;
    let newAuthorOrigin = req.body.authorOrigin;
    let newTopic = req.body.topic;

    quotes.allQuotes.push(
        {
            id: 0,
            quote: newQuote,
            author: { name: newAuthorName, origin: newAuthorOrigin },
            topic: newTopic
        })

    setNewId();

    res.send("A new quote has been added!")
})

app.get("/deleteQuote/:id", (req, res) => {
    if (req.params.id > 0 && req.params.id <= quotes.allQuotes.length) {
        quotes.allQuotes.splice(req.params.id - 1, 1)
        res.send("Quote deleted successfully!")
    } else {
        return res.status(404).send("Quote not found!")
    }
})

function setNewId() {
    for (i = 0; i < quotes.allQuotes.length; i++) {
        quotes.allQuotes[i].id = i + 1;
    }
}

app.listen(PORT, () => {
    console.log("Listening to " + PORT)
})