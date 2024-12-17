
# Payment Processing Service with RabbitMQ 

## Overview  
This project uses Node.js for the REST APIs and RabbitMQ as the message queue to construct a **three-step payment processing structure**.   It shows how scalable and effective services may be achieved through the use of asynchronous message-based communication.

The process:  
- **Make Payment** → Sends payment data to the **Payment Queue**.  
- **Process Payment** → Reads from the Payment Queue → Sends data to the **Notification Queue**.  
- **Notification Service** → Reads from the Notification Queue → Sends confirmation messages.

---

## Technologies Used  
- **Backend**: Node.js (Express)  
- **Queueing Service**: RabbitMQ (amqplib library)  
- **API Documentation**: Swagger UI Express  
- **Code Editor**: Visual Studio Code  

---

## Project Structure  
```
payment-service/
├── package.json             # Dependencies and metadata
├── index.js                 # Main entry point for the API server
├── paymentQueue.js          # Handles Payment Queue operations
├── notificationQueue.js     # Handles Notification Queue operations
├── swagger/
│   └── swagger.json         # Swagger API documentation configuration
└── services/
    ├── paymentService.js    # Payment processing logic
    └── notificationService.js # Notification handling logic
```

---

## Key Features  
### 1. Payment Processing  
- REST API endpoint to submit payments.  
- Payment data is pushed to the **Payment Queue**.  

### 2. Message Queue Workflow  
- **Payment Processor** reads messages from the Payment Queue and pushes data to the Notification Queue.  
- **Notification Service** handles sending confirmation messages.  

### 3. Swagger API Documentation  
- Swagger UI integrated for easy testing and validation of APIs.  

---

## Installation  

### Prerequisites  
- **RabbitMQ** must be installed and running.  
  Verify RabbitMQ by accessing: `http://localhost:15672`  
  - Default Credentials:  
    - **Username**: guest  
    - **Password**: guest  

---

## API Endpoints  

| **Method** | **Route**        | **Description**            |
|------------|------------------|----------------------------|
| POST       | /api/payments    | Send payment to queue      |

**Example Request:**  
```json
{
  "userId": "12345",
  "amount": 230.0,
  "currency": "Germany"
}
```

---

## Learning Outcomes  

### Queueing with RabbitMQ  
- Learned to integrate RabbitMQ to handle asynchronous message communication.  
- Understood message flow between **Payment Queue** and **Notification Queue** and why RabbitMQ can be usefull.

### REST API Development  
- Built clean REST APIs using **Express** and tested them with **Swagger**.  

### Debugging RabbitMQ Issues  
- **Issue**: `Input/output error` during RabbitMQ startup.  
- **Solution**: Started RabbitMQ manually.

---
### Architectural Design Decisions  
- Chose not to use a database to simplify the flow.  
- Payment and notification data flow seamlessly through RabbitMQ.  

---

## Challenges  
1. **RabbitMQ Integration**  
   - Setting up and debugging RabbitMQ for the first time was challenging.  

2. **Manual Debugging**  
   - Identified service startup issues using real-time logs.  

---

## Conclusion  
I was able to obtain practical experience with message queues, REST API programming, and **RabbitMQ** thanks to this project. I learnt how to debug real-world integration challenges and successfully constructed an end-to-end payment processing pipeline. The effectiveness of API testing has been significantly improved via Swagger integration.

---
