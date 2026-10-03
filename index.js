const express = require('express');
const { generateAnswer } = require('./controllers/openaiController');


// app setup
const app = express();
app.listen(4000, () => console.log('Listening for request on port 4000'));

// middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.static('public'));

app.get("/", function (req, res) {
    res.send("hello world");
})


// routes
app.post('/openai/answer', generateAnswer);