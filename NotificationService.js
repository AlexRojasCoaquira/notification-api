require('dotenv').config()
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

const messaging = admin.messaging();

const notificationService = async (token, { title, body, eventId, image, icon, click_action }) => {
  console.log('Enviando notificación a:', token);
  const message = {
    notification: {
      title: title || 'Notificación',
      body: body || 'Tienes un nuevo evento',
      image: image || 'https://example.com/image.png',
      icon: icon || 'https://example.com/image.png',
    },
    data: {
      eventId: eventId || '123456',
      click_action: click_action || '/eventos',
    },
    token,
  };
  console.log('message1', message);
  console.log('messaging', messaging);
  try {
    const response = await messaging.send(message);
    console.log('response', response);
    return response;
  } catch (error) {
    throw new Error('Error enviando notificación: ' + error);
  }
};

const subscribeService = async (token, topic) => {
  try {
    const response = await messaging.subscribeToTopic(token, topic);
    console.log('Suscripción exitosa:', response);
    return response;
  } catch (error) {
    throw new Error('Error al suscribir al tema: ' + error);
  }
};

const sendMessage = async (topic, notification) => {
  try {
    const payload = {
      topic,
      notification,
    };
    const response = await messaging.send(payload);
    console.log('Mensaje enviado con éxito:', response);
  } catch (error) {
    console.error('Error al enviar el mensaje1:', error);
  }
}
// Exporta la función
module.exports = {
  notificationService,
  subscribeService,
  sendMessage
};