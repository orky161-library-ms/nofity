const AWS = require('aws-sdk');
const amqp = require('amqplib/callback_api');
const {channelConsume} = require("../queues/rabbit/notify");

AWS.config.update({region: process.env.REGION});

function createRabbitConnection (){
    amqp.connect(process.env.RABBIT_URL + "?heartbeat=60", async (err, conn) => {
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(createRabbitConnection, 1500 + (Math.random() * 3000));
        }
        conn.on("error", (err) => {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        conn.on("close", () => {
            console.error("[AMQP] reconnecting");
            return setTimeout(createRabbitConnection, 1500 + (Math.random() * 3000));
        });
        console.log("[AMQP] connected");
        await channelConsume(conn)
    });
}

module.exports = {
    createRabbitConnection
}
