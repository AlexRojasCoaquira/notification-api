// import { notificationService } from './NotificationService'
const { notificationService, subscribeService, sendMessage, unsubscribeService } = require('./NotificationService.js')
const sendNotification = async (req, res) => {
  const { token, title, body, eventId, image, icon, click_action } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'Token FCM requerido' })
  }

  try {
    console.log('Enviando notificación a token:', token)
    const response = await notificationService(token, {
      title,
      body,
      eventId,
      image,
      icon,
      click_action
    })
    console.log('Notificación enviada con éxito:', response)
    return res.status(200).json({ message: 'Notificación enviada' })
  } catch (err) {
    return res.status(500).json({ error: 'Error al enviar notificación', details: err })
  }
}

const subscribeToTopic = async (req, res) => {
  const { token, topic } = req.body;
  const { suscribe = '1' } = req.query;
    if (!token || !topic) {
        return res.status(400).json({ error: 'Token y tema requeridos' })
    }
    try {
      let response = null;
      let message = `Suscripción exitosa al topic ${topic}`
      if (suscribe === '1') {
        response = await subscribeService(token, topic)
        console.log('Suscripción exitosa:', response)
      } else {
        response = await unsubscribeService(token, topic)
        console.log('Suscripción cancelada:', response)
        message = 'Suscripción cancelada'
      }
      return res.status(200).json({ message, response })
    } catch (err) {
        console.error('Error al suscribir al tema:', err)
        return res.status(500).json({ error: 'Error al suscribir al tema', details: err })
    }
}

const sendMessageByTopic = async (req, res) => {
    console.log('Enviando mensaje a topic', req.body)
    const { topic, data, token } = req.body;
    console.log('payload', data)
    const payload = {
        topic,
        data
    }
    if(token) {
      payload.token = token
      delete payload.topic
    }
    try {
      const response = await sendMessage(payload)
      console.log('response', response)
      return res.status(200).json({ message: 'Mensaje enviado con éxito', response })
    } catch (error) {
        console.error('Error al enviar el mensaje:', error)
        return res.status(500).json({ error: 'Error al enviar el mensaje', details: error })
    }
}


module.exports = {
    sendNotification,
    subscribeToTopic,
    sendMessageByTopic
 };