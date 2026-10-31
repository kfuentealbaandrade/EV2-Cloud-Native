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

  try {

    const pedido =
      JSON.parse(
        message.content.toString()
      );

    console.log(
      "Pedido recibido:",
      pedido
    );

    /*
      Error controlado para pruebas DLQ
    */
    if (
      pedido.producto ===
      "FORZAR_ERROR"
    ) {
      throw new Error(
        "Error de prueba"
      );
    }

    channel.ack(message);

  } catch (error) {

    console.error(
      "Error procesando pedido:",
      error.message
    );

    channel.nack(
      message,
      false,
      false
    );
  }
}   
  );

  console.log(
    "Consumidor iniciado"
  );
}

module.exports = {
  startConsumer
};
