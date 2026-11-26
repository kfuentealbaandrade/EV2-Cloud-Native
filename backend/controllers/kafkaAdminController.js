const {
    connectAdmin,
    disconnectAdmin,
    listTopics,
    createTopic,
    deleteTopic
} = require("../kafka/adminService");

async function getTopics(req, res) {

    try {

        await connectAdmin();

        const topics = await listTopics();

        res.json(topics);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "No se pudieron obtener los topics"
        });

    } finally {

        await disconnectAdmin();

    }
}

async function createTopicHandler(req, res) {
    console.log("BODY RECIBIDO:");
    console.log(req.body);

    try {

        const {
            name,
            partitions,
            replicationFactor
        } = req.body || {};

        if (!name) {

            return res.status(400).json({
                message: "name es obligatorio"
            });

        }

        await connectAdmin();

        await createTopic(
            name,
            partitions || 3,
            replicationFactor || 3
        );

        res.status(201).json({
            message: "Topic creado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "No se pudo crear el topic"
        });

    } finally {

        await disconnectAdmin();

    }
}

async function deleteTopicHandler(req, res) {

    try {

        await connectAdmin();

        await deleteTopic(
            req.params.name
        );

        res.json({
            message: "Topic eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "No se pudo eliminar el topic"
        });

    } finally {

        await disconnectAdmin();

    }
}

module.exports = {
    getTopics,
    createTopicHandler,
    deleteTopicHandler
};