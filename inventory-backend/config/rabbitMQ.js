// rabbitMQ.js
const amqp = require('amqplib');

let channel, connection;

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect('amqp://localhost'); // use your RabbitMQ server URL
    channel = await connection.createChannel();
    await channel.assertQueue('inventory_updates');
    console.log('✅ Connected to RabbitMQ');
  } catch (err) {
    console.error('❌ Failed to connect to RabbitMQ', err);
  }
}

function publishToQueue(queueName, data) {
  if (channel) {
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
      persistent: true,
    });
  } else {
    console.error('RabbitMQ channel not available');
  }
}

module.exports = {
  connectRabbitMQ,
  publishToQueue,
};
