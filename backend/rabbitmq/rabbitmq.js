// backend/rabbitmq/rabbitmq.js

const amqp = require("amqplib");

let connection;
let channel;

const EXCHANGE = "pedidos_exchange";
const QUEUE = "pedidos_queue";
const ROUTING_KEY = "pedido.creado";
const DLX = "pedidos_dlx";
const DLQ = "pedidos_dlq";
const DLX_ROUTING_KEY = "pedido.error";

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect(
      process.env.RABBITMQ_URL || "amqp://rabbitmq:5672"
    );

    channel = await connection.createChannel();

    await channel.assertExchange(
      EXCHANGE,
      "direct",
      {
        durable: true
      }
    );
    await channel.assertExchange(
      DLX,
      "direct",
      {
        durable: true
      }
    );

    await channel.assertQueue(
      QUEUE,
      {
        durable: true,
        deadLetterExchange: DLX,
        deadLetterRoutingKey: DLX_ROUTING_KEY
      }
    );

    await channel.assertQueue(
      DLQ,
      {
        durable: true
      }
    );
    
    await channel.bindQueue(
      QUEUE,
      EXCHANGE,
      ROUTING_KEY
    );

    await channel.bindQueue(
      DLQ,
      DLX,
      DLX_ROUTING_KEY
    );

    console.log("RabbitMQ conectado");
  } catch (error) {
    console.error(
      "Error conectando RabbitMQ:",
      error
    );
  }
}

function getChannel() {
  return channel;
}

 module.exports = {
  connectRabbitMQ,
  getChannel,
  EXCHANGE,
  ROUTING_KEY,
  DLX,
  DLQ,
  DLX_ROUTING_KEY
}; 
