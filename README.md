# 🐾 Tienda de Perritos

Proyecto fullstack desarrollado para la asignatura **Desarrollo Cloud Native I**.

La solución integra:

- Microsoft Entra ID
- Microsoft Entra External ID
- RabbitMQ
- Apache Kafka
- MySQL
- Docker Compose
- AWS

---

# 🚀 Tecnologías Utilizadas

## Frontend

- HTML5
- JavaScript
- MSAL.js
- Nginx
- Docker

## Backend

- Node.js
- Express
- MySQL

## Autenticación

- Microsoft Entra ID
- Microsoft Entra External ID
- JWT

## Mensajería

- RabbitMQ
- Apache Kafka
- ZooKeeper
- Kafka UI

## Infraestructura

- Docker Compose
- AWS EC2
- AWS API Gateway

---

# 🏗️ Arquitectura General

La solución está compuesta por:

- Frontend HTML + JavaScript
- Backend Node.js + Express
- Base de datos MySQL
- RabbitMQ para procesamiento asíncrono de pedidos
- Apache Kafka para streaming de eventos
- Kafka UI para monitoreo y administración
- Azure Entra ID y Azure External ID para autenticación

---

# 📨 Arquitectura RabbitMQ

RabbitMQ se utiliza para el procesamiento asíncrono de pedidos.

## Componentes implementados

- pedidos_exchange
- pedidos_queue
- pedidos_dlx
- pedidos_dlq
- ACK
- NACK
- Dead Letter Queue (DLQ)
- Productor RabbitMQ
- Consumidor RabbitMQ

---

# 📡 Arquitectura Kafka

Apache Kafka fue incorporado como plataforma de streaming de eventos.

## Componentes implementados

- 3 nodos ZooKeeper
- 3 brokers Kafka
- Kafka UI
- Productores Kafka
- Consumidores Kafka
- Consumer Groups
- Particiones
- Réplicas

La arquitectura fue implementada mediante Docker Compose para permitir escalabilidad, procesamiento distribuido y tolerancia a fallos.

---

# 📂 Topics Implementados

## producto-stock

Topic utilizado para registrar modificaciones de stock realizadas por administradores.

## pedido-creado

Topic utilizado para registrar pedidos generados por clientes.

### Configuración

- 3 particiones
- 3 réplicas

Esta configuración permite paralelismo, escalabilidad y disponibilidad ante fallos.

---

# ⚡ Casos de Uso Kafka

Los principales eventos implementados son:

- Actualización de stock.
- Creación de pedidos.
- Auditoría de eventos.
- Monitoreo en tiempo real.
- Distribución de eventos hacia futuros consumidores.

Kafka complementa RabbitMQ sin reemplazarlo.

---

# 📦 Clonar el Repositorio

```bash
git clone https://github.com/kfuentealbaandrade/EV2-Cloud-Native.git

cd EV2-Cloud-Native
```

---

# 🐳 Levantar el Proyecto Localmente

## Requisitos

- Docker Desktop
- Docker Compose

## Ejecutar

```bash
docker compose up --build
```

## Accesos

### Frontend

```text
http://localhost
```

### Backend

```text
http://localhost:3001
```

### Kafka UI

```text
http://localhost:8080
```

---

# 🔧 Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto utilizando la siguiente estructura:

```env
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
```

⚠️ No subir el archivo `.env` al repositorio.

Agregar al `.gitignore`:

```gitignore
.env
```

---

# ☁️ Configuración AWS

## EC2

- Instancia Frontend
- Instancia Backend
- Elastic IP

### Puertos utilizados

```text
80
3001
```

## API Gateway

Configurar:

```text
/
/api/{proxy+}
```

### Stage

```text
prod
```

---

# 🔐 Configuración Azure

## Tenant Interno

Utilizado para administradores.

## Tenant Externo

Utilizado para clientes.

Actualizar en `frontend/authConfig.js`:

```javascript
export const msalConfig = {
  auth: {
    clientId: "<CLIENT_ID>",
    authority: "<AUTHORITY>",
    redirectUri: "<REDIRECT_URI>"
  }
};
```

---

# 📊 Administración Kafka

La administración de Kafka se realiza mediante Kafka UI.

Funciones utilizadas:

- Crear topics.
- Eliminar topics.
- Visualizar brokers.
- Visualizar particiones.
- Visualizar réplicas.
- Revisar offsets.
- Revisar lag.
- Revisar consumer groups.

---

# ✅ Pruebas Realizadas

Se validó:

- Creación de eventos de stock.
- Creación de eventos de pedidos.
- Publicación de mensajes Kafka.
- Consumo de mensajes Kafka.
- Visualización de eventos en Kafka UI.
- Operación simultánea entre RabbitMQ y Kafka.

---

# 🏁 Resultado

Se implementó una arquitectura basada en eventos utilizando RabbitMQ y Apache Kafka, incorporando capacidades de streaming, monitoreo y procesamiento distribuido en tiempo real para la aplicación **Tienda de Perritos**.

La solución opera mediante Docker Compose e integra:

- Microsoft Entra ID
- Microsoft Entra External ID
- RabbitMQ
- Apache Kafka
- Kafka UI
- MySQL
- AWS
