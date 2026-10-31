const { getChannel } =
  require("./rabbitmq");

async function createQueue(queueName) {

  const channel = getChannel();

  if (!channel) {
    throw new Error(
      "RabbitMQ no conectado"
    );
  }

  await channel.assertQueue(
    queueName,
    {
      durable: true
    }
  );

  return {
    message:
      `Cola ${queueName} creada`
  };
}

async function deleteQueue(queueName) {

  const channel = getChannel();

  if (!channel) {
    throw new Error(
      "RabbitMQ no conectado"
    );
  }

  await channel.deleteQueue(
    queueName
  );

  return {
    message:
      `Cola ${queueName} eliminada`
  };
}

async function createExchange(
  exchangeName
) {

  const channel = getChannel();

  if (!channel) {
    throw new Error(
      "RabbitMQ no conectado"
    );
  }

  await channel.assertExchange(
    exchangeName,
    "direct",
    {
      durable: true
    }
  );

  return {
    message:
      `Exchange ${exchangeName} creado`
  };
}

async function createBinding(
  queueName,
  exchangeName,
  routingKey
) {

  const channel = getChannel();

  if (!channel) {
    throw new Error(
      "RabbitMQ no conectado"
    );
  }

  await channel.bindQueue(
    queueName,
    exchangeName,
    routingKey
  );

  return {
    message:
      "Binding creado"
  };
}

module.exports = {
  createQueue,
  deleteQueue,
  createExchange,
  createBinding
};
