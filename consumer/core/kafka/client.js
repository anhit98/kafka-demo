const { Kafka } = require("kafkajs");
const configKafka = require("../../config/kafka");
const { clientId, kafkaBrokers } = configKafka;
console.log(kafkaBrokers, "vvvvvvvvvvvvvvv");
exports.kafka = new Kafka({
    clientId: clientId,
    brokers: kafkaBrokers,
});