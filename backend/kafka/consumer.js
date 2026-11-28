const kafka = require("./kafka");
const TOPICS = require("./topics");

const stockConsumer = kafka.consumer({
    groupId: "stock-group"
});

// Nuevos Consumer Group independiente escuchando el mismo tópico de stock
const alertasStockConsumer = kafka.consumer({
    groupId: "alertas-stock-group"
});

const disponibilidadConsumer = kafka.consumer({
    groupId: "disponibilidad-stock-group"
});

const pedidosConsumer = kafka.consumer({
    groupId: "pedidos-group"
});

async function startConsumers() {

    // =======================
    // CONSUMIDOR 1: AUDITORÍA STOCK
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
                console.log(`Modificado por: ${payload.usuario}`);
                console.log(`Topic: ${topic}`);
                console.log(`Partición: ${partition}`);
                console.log(`Offset: ${message.offset}`);
                console.log(`Key: ${message.key?.toString()}`);
                console.log(`Producto actualizado: ${payload.nombre}`);
                console.log(`ID Producto: ${payload.productoId}`);
                console.log(`Stock actual: ${payload.stock}`);
                console.log(`Fecha: ${payload.timestamp || payload.fecha}`);
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
    // CONSUMIDOR 2: ALERTAS STOCK BAJO (MISMO TÓPICO, DISTINTO GROUP ID)
    // =======================

    await alertasStockConsumer.connect();

    await alertasStockConsumer.subscribe({
        topic: TOPICS.PRODUCTO_STOCK,
        fromBeginning: true
    });

    await alertasStockConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            try {

                const payload = JSON.parse(
                    message.value.toString()
                );

                if (Number(payload.stock) <= 5) {
                    console.log("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    console.log("[ALERTA-STOCK-BAJO]");
                    console.log(`Group ID: alertas-stock-group`);
                    console.log(`Topic: ${topic} | Partición: ${partition} | Offset: ${message.offset}`);
                    console.log(`ATENCIÓN: El producto "${payload.nombre}" (ID: ${payload.productoId}) tiene stock crítico: ${payload.stock} unidades`);
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");
                }

            } catch (error) {

                console.error(
                    "[ERROR ALERTAS STOCK]",
                    error.message
                );

            }

        }
    });

    // =======================
    // CONSUMIDOR 3: DISPONIBILIDAD EN CATÁLOGO (MISMO TÓPICO, TERCER GROUP ID)
    // =======================

    await disponibilidadConsumer.connect();

    await disponibilidadConsumer.subscribe({
        topic: TOPICS.PRODUCTO_STOCK,
        fromBeginning: true
    });

    await disponibilidadConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const payload = JSON.parse(message.value.toString());
                const stockActual = Number(payload.stock);

                console.log("\n---------------------------------");
                if (stockActual === 0) {
                    console.log(`[CATALOGO-AGOTADO] Producto "${payload.nombre}" (ID: ${payload.productoId}) -> Estado: SIN STOCK`);
                } else {
                    console.log(`[CATALOGO-DISPONIBLE] Producto "${payload.nombre}" (ID: ${payload.productoId}) -> Estado: EN VENTA (${stockActual} unid.)`);
                }
                console.log("---------------------------------\n");
            } catch (error) {
                console.error("[ERROR DISPONIBILIDAD STOCK]", error.message);
            }
        }
    });


    // =======================
    // CONSUMIDOR 4: NOTIFICACIÓN PEDIDOS
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

    console.log("Kafka Consumers conectados (stock-group, alertas-stock-group, pedidos-group)");

}

module.exports = {
    startConsumers
};