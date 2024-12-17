const amqp = require('amqplib');

async function startPaymentProcessor() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const paymentQueue = 'PaymentQueue';
  const notificationQueue = 'NotificationQueue';

  await channel.assertQueue(paymentQueue, { durable: true });
  await channel.assertQueue(notificationQueue, { durable: true });

  console.log('Waiting for messages in PaymentQueue...');

  channel.consume(paymentQueue, (message) => {
    if (message) {
      const paymentData = JSON.parse(message.content.toString());
      console.log('Processing payment:', paymentData);

      // Simulate sending to notification queue
      const notificationPayload = {
        user: paymentData.user,
        message: 'Your payment has been received',
      };
      channel.sendToQueue(notificationQueue, Buffer.from(JSON.stringify(notificationPayload)));
      console.log('Notification sent to queue:', notificationPayload);

      channel.ack(message);
    }
  });
}

startPaymentProcessor();
