const express = require('express');
const amqp = require('amqplib');

const router = express.Router();

// Route: POST /make-payment
router.post('/', async (req, res) => {
  const { user, paymentType, cardNo } = req.body;

  if (!user || !paymentType || !cardNo) {
    return res.status(400).send('Missing required fields');
  }

  const paymentPayload = { user, paymentType, cardNo };

  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'PaymentQueue';
    await channel.assertQueue(queue, { durable: true });

    // Send message to queue
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(paymentPayload)));
    console.log('Payment sent to queue:', paymentPayload);

    await channel.close();
    await connection.close();

    res.status(200).send('Payment sent successfully');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Failed to send payment');
  }
});

module.exports = router;
