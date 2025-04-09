const amqp = require('amqplib');

let channel;
const queueName = "inventoryQueue";

async function connectQueue() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue(queueName);
}

connectQueue();

exports.publishToQueue = async (event, data) => {
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify({ event, data })));
};
