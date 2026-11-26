🐾 Tienda de Perritos
Proyecto fullstack desarrollado para la asignatura Desarrollo Cloud Native I. La solución integra autenticación híbrida mediante Microsoft Entra ID, mensajería asíncrona con RabbitMQ, almacenamiento relacional con MySQL y procesamiento de eventos en tiempo real mediante Apache Kafka.
🚀 Tecnologías Utilizadas
Frontend
HTML5
JavaScript
MSAL.js
Nginx
Docker
Backend
Node.js
Express
MySQL
Autenticación
Microsoft Entra ID
Microsoft Entra External ID
JWT
Mensajería
RabbitMQ
Apache Kafka
ZooKeeper
Kafka UI
Infraestructura
Docker Compose
AWS EC2
AWS API Gateway
🏗️ Arquitectura General
La solución está compuesta por:
Frontend HTML + JavaScript.
Backend Node.js + Express.
Base de datos MySQL.
RabbitMQ para procesamiento asíncrono de pedidos.
Apache Kafka para streaming de eventos.
Kafka UI para monitoreo y administración.
Azure Entra ID y Azure External ID para autenticación.
📨 Arquitectura RabbitMQ
RabbitMQ se utiliza para el procesamiento asíncrono de pedidos.
Componentes implementados
pedidos_exchange
pedidos_queue
pedidos_dlx
pedidos_dlq
ACK
NACK
Dead Letter Queue
Productor RabbitMQ
Consumidor RabbitMQ
📡 Arquitectura Kafka
Apache Kafka fue incorporado como plataforma de streaming de eventos.
Componentes implementados
3 nodos ZooKeeper
3 brokers Kafka
Kafka UI
Productores Kafka
Consumidores Kafka
Consumer Groups
Particiones
Réplicas
La arquitectura fue implementada utilizando Docker Compose para permitir escalabilidad, procesamiento distribuido y tolerancia a fallos.
📂 Topics implementados
producto-stock
Topic utilizado para registrar modificaciones de stock realizadas por administradores.
pedido-creado
Topic utilizado para registrar pedidos generados por clientes.
Configuración
3 particiones
3 réplicas
Esta configuración permite paralelismo, escalabilidad y disponibilidad ante fallos de brokers.
⚡ Casos de uso Kafka
Los principales eventos implementados son:
Actualización de stock.
Creación de pedidos.
Auditoría de eventos.
Monitoreo en tiempo real.
Distribución de eventos para futuros consumidores.
Kafka complementa RabbitMQ sin reemplazarlo.
📦 Clonar el repositorio
Shell
git clone https://github.com/<tu_usuario>/<tu_repositorio>.git
 
cd <tu_repositorio>
🐳 Levantar el proyecto localmente
Requisitos:
Docker Desktop
Docker Compose
Ejecutar:
Shell
docker compose up --build
Accesos:
Plain Text
Frontend:
http://localhost:80
 
Backend:
http://localhost:3001
 
Kafka UI:
http://localhost:8080
🔧 Variables de Entorno
Crear un archivo .env en la raíz del proyecto utilizando la siguiente estructura:
Plain Text
env no es totalmente compatible. El resaltado de sintaxis se basa en Plain Text.
# MYSQL
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=tienda_perritos
MYSQL_USER=
MYSQL_PASSWORD=
 
MYSQL_HOST=mysql
MYSQL_PORT=3306
 
# RABBITMQ
RABBITMQ_URL=amqp://rabbitmq:5672
 
# BACKEND
PORT=3001
 
# AZURE ENTRA ID
AAD_TENANT_ID=
AAD_AUDIENCE=
 
# AZURE EXTERNAL ID
AAD_EXTERNAL_TENANT_ID=
AAD_EXTERNAL_AUDIENCE=
AAD_EXTERNAL_AUTHORITY_HOST=
 
# KAFKA
KAFKA_TOPIC_PRODUCTO_STOCK=producto-stock
KAFKA_TOPIC_PEDIDO_CREADO=pedido-creado
⚠️ No subir el archivo .env a GitHub.
Agregar al .gitignore:
.ignore
.env
☁️ Configuración AWS
EC2
Instancia Frontend
Instancia Backend
Elastic IP
Puertos:
Plain Text
80
3001
API Gateway
Configurar:
Plain Text
/
/api/{proxy+}
 
Crear Stage:
Plain Text
prod
🔐 Configuración Azure
Tenant Interno
Administradores.
Tenant Externo
Clientes.
Actualizar en el frontend:
JavaScript
export const msalConfig = {
auth: {
clientId: "<CLIENT_ID>",
authority: "<AUTHORITY>",
redirectUri: "<REDIRECT_URI>"
}
};
📊 Administración Kafka
La administración de Kafka puede realizarse mediante Kafka UI.
Funciones utilizadas:
Creación de topics.
Eliminación de topics.
Visualización de brokers.
Visualización de particiones.
Visualización de réplicas.
Consulta de offsets.
Consulta de lag.
Consulta de consumer groups.
✅ Pruebas realizadas
Se validó:
Creación de eventos de stock.
Creación de eventos de pedidos.
Publicación de mensajes Kafka.
Consumo de mensajes Kafka.
Visualización de eventos desde Kafka UI.
Operación simultánea de RabbitMQ y Kafka.
🏁 Resultado
Se implementó una arquitectura basada en eventos utilizando RabbitMQ y Apache Kafka, incorporando capacidades de streaming, monitoreo y procesamiento distribuido en tiempo real para la aplicación Tienda de Perritos. La solución opera mediante Docker Compose e integra autenticación con Microsoft Entra ID, almacenamiento en MySQL y administración mediante Kafka UI.