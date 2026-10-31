const { getChannel } =
  require("./rabbitmq");

async function startConsumer() {

  const channel = getChannel();

  if (!channel) {
    throw new Error(
      "RabbitMQ no conectado"
    );
  }

  channel.consume(
    "pedidos_queue",
    (message) => {

      if (!message) return;

      const pedido =
        JSON.parse(
          message.content.toString()
        );

      console.log(
        "Pedido recibido:",
        pedido
      );

      channel.ack(message);
    }
  );

  console.log(
    "Consumidor iniciado"
  );
}

module.exports = {
  startConsumer
};
