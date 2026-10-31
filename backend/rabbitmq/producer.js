const {
  getChannel,
  EXCHANGE,
  ROUTING_KEY
} = require("./rabbitmq");

async function publishOrder(order) {

  const channel = getChannel();

  if (!channel) {
    throw new Error(
      "RabbitMQ no está conectado"
    );
  }

  channel.publish(
    EXCHANGE,
    ROUTING_KEY,
    Buffer.from(
      JSON.stringify(order)
    ),
    {
      persistent: true
    }
  );

  console.log(
    "Pedido enviado:",
    order
  );
}

module.exports = {
  publishOrder
};
