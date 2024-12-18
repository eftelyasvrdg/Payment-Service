const amqp = require('amqplib');

async function testRabbitMQ() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        console.log('Connected to RabbitMQ successfully!');
        
        const channel = await connection.createChannel();

        const queue = 'test_queue';
        await channel.assertQueue(queue);
        console.log(`Queue "${queue}" created successfully!`);

        const message = 'Hello, RabbitMQ!';
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Message sent: "${message}"`);

        setTimeout(() => {
            connection.close();
            console.log('Connection closed.');
        }, 500);
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}

testRabbitMQ();
