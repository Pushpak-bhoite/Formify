const express = require('express')
const port = 3000
const user = require("./routes/user.js");
const form = require("./routes/form.route.js");
const db = require("./config/db.js");
const cors = require('cors')

const app = express()
db()
app.use(cors('*'))

app.use(express.json());

app.get('/auth', (req, res) => {
    res.send('Hello World!')
})


// …
app.use("/auth", user);
app.use("/", form);

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})