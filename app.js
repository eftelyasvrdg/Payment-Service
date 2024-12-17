const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const makePayment = require('./routes/makePayment');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Swagger setup for testing APIs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/make-payment', makePayment);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
