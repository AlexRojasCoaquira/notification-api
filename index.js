const express = require('express');
const cors = require('cors');
const { sendNotification, subscribeToTopic, sendMessageByTopic } = require('./notificationController');

const app = express();
const port = 3002;
app.use(cors({
  origin: '*', // acepta todos los orígenes
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola mundo desde Express!');
});

app.post('/send-notification', sendNotification);
app.post('/suscribe', subscribeToTopic);
app.post('/send-topic', sendMessageByTopic);

// Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
