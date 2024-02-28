require("dotenv").config();
const consumer = require("./core/kafka/consumer");

async function initConsumer(topicName) {
    await consumer.init(topicName);
    await consumer.connect();
    await consumer.subscribe(topicName);
}

function handleIncomingMessage(message) {
    const msg = message.value.toString('utf-8');
    console.log("Received: ", msg);
}

async function startConsuming() {
    try {
        await consumer.consume(handleIncomingMessage);
    } catch (e) {
        console.log("Error while consuming message: ", e)
    }
}

// Initialize the consumer when the file is run
initConsumer("hello-kafka")
    .then(() => startConsuming())
    .catch((error) => console.error('Error initializing consumer:', error));

