const express = require("express");

const {
    getTopics,
    createTopicHandler,
    deleteTopicHandler
} = require("../controllers/kafkaAdminController");

function createKafkaRoutes() {

    const router = express.Router();

    router.get(
        "/topics",
        getTopics
    );

    router.post(
        "/topics",
        createTopicHandler
    );

    router.delete(
        "/topics/:name",
        deleteTopicHandler
    );

    return router;
}

module.exports = {
    createKafkaRoutes
};