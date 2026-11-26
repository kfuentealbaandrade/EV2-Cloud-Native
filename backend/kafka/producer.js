const kafka = require("./kafka");

const producer = kafka.producer();

async function connectProducer() {
    await producer.connect();
    console.log("Kafka Producer conectado");
}

async function sendMessage(topic, key, payload) {
    await producer.send({
        topic,
        messages: [
            {
                key,
                value: JSON.stringify(payload)
            }
        ]
    });
}

module.exports = {
    connectProducer,
    sendMessage
};