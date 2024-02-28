// app.js
require("dotenv").config();
const express = require('express');
const producer = require("./core/kafka/producer");
var bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json({limit: "1mb"}));
app.use(bodyParser.urlencoded({limit: "1mb", extended: true}));

async function initProducer() {
    await producer.init();
    await producer.connect();
}

async function sendMessage(topic, message) {
    try {
        await producer.publish(topic, JSON.stringify(message));
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

app.post('/test', (req, res) => {
    const data = req.body;
    if (!data.message) {
        return;
    }

    sendMessage("hello-kafka", data.message);
    res.send('Message sent to Kafka');
});

// Initialize Kafka producer when the app starts
initProducer();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
