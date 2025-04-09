const amqp = require('amqplib');

async function startWorker() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('inventory_updates');

  console.log('📥 Worker is waiting for messages in inventory_updates');

  channel.consume('inventory_updates', (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      console.log('📦 Received Inventory Update Task:', data);

      // Perform your background task here
      // e.g., logging to file, updating analytics DB, sending notifications

      channel.ack(msg); // Acknowledge the message
    }
  });
}

startWorker().catch(console.error);
