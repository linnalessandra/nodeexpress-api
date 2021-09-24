const fs = require("fs")
const express = require('express');
const server = express();
const port = 5000
const path = require('path')
server.use(express.json());

// GET REQUEST
server.get('/api/catFacts', (req, res) => {

    try {
        res.json(getCats())
    } catch (err) {
        res.json({ status: "Something went wrong..." })
    }
})

// POST REQUEST
server.post('/api/catFacts', (req, res) => {

    try {
        let raw = fs.readFileSync("cats.json")
        let catNames = JSON.parse(raw)
        let cat = catNames.some(c => c.catName === req.body.catName)
        if (req.body && req.body.catName && !cat) {
            catNames.push(req.body)
            console.log(catNames)
            fs.writeFileSync("cats.json", JSON.stringify(catNames))
        }
        res.json(true)

    } catch (err) {
        res.json({ status: "Something went wrong when saving..." })
    }
})


// DELETE REQUEST
server.delete('/api/catFacts/:catName', (req, res) => {

    try {
        let catNames = getCats().filter(c => c.catName != req.params.catName)
        console.log(catNames)
        fs.writeFileSync("cats.json", JSON.stringify(catNames))
        res.json(catNames)
    } catch (err) {
        res.json({ status: "Something went wrong when saving..." })
    }
})

// Returns cats from json-file
function getCats() {
    try {
        return JSON.parse(fs.readFileSync("cats.json"))
    } catch {
        return []
    }
}


server.listen(port, () => console.log(`Servern kör på port ${port}`))
server.use(express.static(path.join(__dirname, 'public')))
