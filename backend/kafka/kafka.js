const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "tienda-perritos",
    brokers: [
        "kafka1:29092",
        "kafka2:29093",
        "kafka3:29094"
    ]
});

module.exports = kafka;