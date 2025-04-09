const amqp = require('amqplib');

async function consume() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  const queueName = "inventoryQueue";

  await channel.assertQueue(queueName);

  channel.consume(queueName, (msg) => {
    const { event, data } = JSON.parse(msg.content.toString());
    console.log("Processing event:", event, "with data:", data);
    channel.ack(msg);
  });
}

consume();
