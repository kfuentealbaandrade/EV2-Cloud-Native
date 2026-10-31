const {
  createQueue,
  deleteQueue,
  createExchange,
  createBinding
} = require("../rabbitmq/rabbitAdminService");

async function createQueueHandler(
  req,
  res
) {
  try {

    const { queueName } =
      req.body;

    if (!queueName) {
      return res
        .status(400)
        .json({
          message:
            "queueName es obligatorio"
        });
    }

    const result =
      await createQueue(
        queueName
      );

    res.json(result);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
}

async function deleteQueueHandler(
  req,
  res
) {
  try {

    const { name } =
      req.params;

    const result =
      await deleteQueue(
        name
      );

    res.json(result);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
}

async function createExchangeHandler(
  req,
  res
) {
  try {

    const { exchangeName } =
      req.body;

    if (!exchangeName) {
      return res
        .status(400)
        .json({
          message:
            "exchangeName es obligatorio"
        });
    }

    const result =
      await createExchange(
        exchangeName
      );

    res.json(result);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
}

async function createBindingHandler(
  req,
  res
) {
  try {

    const {
      queueName,
      exchangeName,
      routingKey
    } = req.body;

    if (
      !queueName ||
      !exchangeName ||
      !routingKey
    ) {
      return res
        .status(400)
        .json({
          message:
            "Parámetros incompletos"
        });
    }

    const result =
      await createBinding(
        queueName,
        exchangeName,
        routingKey
      );

    res.json(result);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
}

module.exports = {
  createQueueHandler,
  deleteQueueHandler,
  createExchangeHandler,
  createBindingHandler
};
