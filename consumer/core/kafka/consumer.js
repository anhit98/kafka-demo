// consumer.js
const { kafka } = require('./client');

class Consumer {
    constructor() {
        this.consumer = null;
    }

    async init(groupId) {
        this.consumer = kafka.consumer({ groupId });
        return this.consumer;
    }

    async connect() {
        return this.consumer.connect();
    }

    async subscribe(topic) {
        return this.consumer.subscribe({ topic, fromBeginning: true });
    }

    async consume(callback) {
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                callback(message);
            },
        });
    }
}

module.exports = new Consumer();
