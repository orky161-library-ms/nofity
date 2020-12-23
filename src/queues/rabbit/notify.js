const {closeOnErr, processMsg} = require("./utils")
const {sendEmail} = require("../../ses/index")

async function channelConsume(conn){
    conn.createChannel(function(err, ch) {
        if (closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);
        });
        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });

        ch.prefetch(10);
        sendEmailQueue(conn, ch)
    });
}

function sendEmailQueue (conn, ch){
    ch.assertQueue(process.env.NOTIFY_QUEUE, { durable: true }, function(err, _ok) {
        if (closeOnErr(err)) return;
        ch.consume(process.env.NOTIFY_QUEUE, processMsg(conn, ch, sendEmailWorker), { noAck: false });
        console.log("Worker is started");
    });

}

function sendEmailWorker(msg, cb) {
    sendEmail(JSON.parse(msg.content.toString()))
    cb(true);
}

module.exports ={
    channelConsume
}
