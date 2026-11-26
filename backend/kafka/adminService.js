const kafka = require("./kafka");

const admin = kafka.admin();

async function connectAdmin() {
    await admin.connect();
}

async function disconnectAdmin() {
    await admin.disconnect();
}

async function listTopics() {
    return await admin.listTopics();
}

async function createTopic(
    name,
    partitions = 3,
    replicationFactor = 3
) {
    return await admin.createTopics({
        topics: [
            {
                topic: name,
                numPartitions: partitions,
                replicationFactor: replicationFactor
            }
        ]
    });
}

async function deleteTopic(name) {
    return await admin.deleteTopics({
        topics: [name]
    });
}

module.exports = {
    connectAdmin,
    disconnectAdmin,
    listTopics,
    createTopic,
    deleteTopic
};