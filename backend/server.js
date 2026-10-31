const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const { createProductController } = require("./controllers/productController");
const { createOrderController } = require("./controllers/orderController");
const { createProductRoutes } = require("./routes/products");
const { createOrderRoutes } = require("./routes/orders");
const { connectRabbitMQ } = require("./rabbitmq/rabbitmq");
const { startConsumer } = require("./rabbitmq/consumer");
const {
  createQueueHandler,
  deleteQueueHandler,
  createExchangeHandler,
  createBindingHandler
} = require("./controllers/rabbitAdminController");

const app = express();
const PORT = process.env.PORT || 3001;

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT,
} = process.env;

app.use(cors());
app.use(express.json());

let pool;

async function start() {
  try {
    pool = await mysql.createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      port: MYSQL_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log("Pool de conexiones MySQL inicializado.");
    await connectRabbitMQ();
    await startConsumer();
    const productController = createProductController(pool);
    const orderController = createOrderController(pool);

    // Rutas (la seguridad se aplica dentro de products.js y orders.js)
    
    app.use("/api/productos", createProductRoutes(productController));
    app.use("/api/pedidos", createOrderRoutes(orderController));

    // Administración RabbitMQ

    app.post("/api/rabbitmq/queues", createQueueHandler);
    app.delete("/api/rabbitmq/queues/:name", deleteQueueHandler);
    app.post("/api/rabbitmq/exchanges", createExchangeHandler);
    app.post("/api/rabbitmq/bindings", createBindingHandler);
    
    // Endpoint de salud
    
    app.get("/api/health", (req, res) => {
      res.json({ status: "ok", message: "Backend de tienda de perritos en ejecución." });
    });

    app.listen(PORT, () => {
      console.log(`Servidor backend escuchando en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el backend:", error);
    process.exit(1);
  }
}

start();


