// producer.js
const { kafka } = require('./client');

class Producer {
    constructor() {
        this.producer = null;
    }

    async init() {
        this.producer = kafka.producer();
        return this.producer;
    }

    async connect() {
        return this.producer.connect();
    }

    async publish(topic, message) {
        try {
            await this.producer.send({
                topic,
                messages: [
                    { value: message }
                ],
            });
        } catch (error) {
            console.error('Error sending message:', error);
            return error;
        }
    }

    async disconnect() {
        return this.producer.disconnect();
    }
}

module.exports = new Producer();
