
const kafka = require("./kafka");
const TOPICS = require("./topics");

const stockConsumer = kafka.consumer({
    groupId: "stock-group"
});

const pedidosConsumer = kafka.consumer({
    groupId: "pedidos-group"
});

async function startConsumers() {

    // =======================
    // CONSUMIDOR STOCK
    // =======================

    await stockConsumer.connect();

    await stockConsumer.subscribe({
        topic: TOPICS.PRODUCTO_STOCK,
        fromBeginning: true
    });

    await stockConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            try {

                const payload = JSON.parse(
                    message.value.toString()
                );

                console.log("\n=================================");
                console.log("[AUDITORIA-STOCK]");
                console.log(`Topic: ${topic}`);
                console.log(`Partición: ${partition}`);
                console.log(`Offset: ${message.offset}`);
                console.log(`Key: ${message.key?.toString()}`);

                console.log(
                    `Producto actualizado: ${payload.nombre}`
                );

                console.log(
                    `ID Producto: ${payload.productoId}`
                );

                console.log(
                    `Stock actual: ${payload.stock}`
                );

                console.log(
                    `Fecha: ${payload.fecha}`
                );

                console.log("=================================\n");

            } catch (error) {

                console.error(
                    "[ERROR AUDITORIA STOCK]",
                    error.message
                );

            }

        }
    });

    // =======================
    // CONSUMIDOR PEDIDOS
    // =======================

    await pedidosConsumer.connect();

    await pedidosConsumer.subscribe({
        topic: TOPICS.PEDIDO_CREADO,
        fromBeginning: true
    });

    await pedidosConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            try {

                const payload = JSON.parse(
                    message.value.toString()
                );

                console.log("\n=================================");
                console.log("[NOTIFICACION-PEDIDOS]");
                console.log(`Topic: ${topic}`);
                console.log(`Partición: ${partition}`);
                console.log(`Offset: ${message.offset}`);
                console.log(`Key: ${message.key?.toString()}`);

                console.log(
                    `Pedido #${payload.pedidoId}`
                );

                console.log(
                    `Cliente: ${payload.clienteId}`
                );

                console.log(
                    `Producto: ${payload.producto}`
                );

                console.log(
                    `Cantidad: ${payload.cantidad}`
                );

                console.log(
                    `Fecha: ${payload.fecha}`
                );

                console.log("=================================\n");

            } catch (error) {

                console.error(
                    "[ERROR NOTIFICACION PEDIDOS]",
                    error.message
                );

            }

        }
    });

    console.log("Kafka Consumers conectados");

}

module.exports = {
    startConsumers
};