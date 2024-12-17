const amqp = require('amqplib');

async function testRabbitMQ() {
    try {
        // Connect to RabbitMQ
        const connection = await amqp.connect('amqp://localhost');
        console.log('Connected to RabbitMQ successfully!');
        
        // Create a channel
        const channel = await connection.createChannel();

        // Declare a test queue
        const queue = 'test_queue';
        await channel.assertQueue(queue);
        console.log(`Queue "${queue}" created successfully!`);

        // Send a test message
        const message = 'Hello, RabbitMQ!';
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Message sent: "${message}"`);

        // Close the connection
        setTimeout(() => {
            connection.close();
            console.log('Connection closed.');
        }, 500);
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}

testRabbitMQ();
