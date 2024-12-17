const amqp = require('amqplib');

async function startNotificationService() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const notificationQueue = 'NotificationQueue';

  await channel.assertQueue(notificationQueue, { durable: true });
  console.log('Waiting for messages in NotificationQueue...');

  channel.consume(notificationQueue, (message) => {
    if (message) {
      const notification = JSON.parse(message.content.toString());
      console.log(`Email sent to ${notification.user}: ${notification.message}`);

      channel.ack(message);
    }
  });
}

startNotificationService();
