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
  const message = {
    data: {
      title: title || 'Notificación',
      body: body || 'Tienes un nuevo evento',
      image: image || 'https://example.com/image.png',
      icon: icon || 'https://example.com/image.png',
    },
    token,
  };
  console.log('message1', message);
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
    const response = await messaging.subscribeToTopic([token], topic);
    console.log(`Suscrito al tema ${topic}`, response);
    return response;
  } catch (error) {
    throw new Error('Error al suscribir al tema: ' + error);
  }
};
const unsubscribeService = async (token, topic) => {
  try {
    const response = await messaging.unsubscribeFromTopic([token], topic);
    console.log(`Suscripcion cancelada al tema ${topic}`, response);
    return response;
  } catch (error) {
    throw new Error('Error al suscribir al tema: ' + error);
  }
};

const sendMessage = async (payload) => {
  try {
    const response = await messaging.send(payload);
    console.log('Mensaje enviado con éxito:', response);
    return response;
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
}
// Exporta la función
module.exports = {
  notificationService,
  subscribeService,
  unsubscribeService,
  sendMessage
};