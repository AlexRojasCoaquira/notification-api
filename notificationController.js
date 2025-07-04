// import { notificationService } from './NotificationService'
const { notificationService, subscribeService, sendMessage } = require('./NotificationService.js')
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
    if (!token || !topic) {
        return res.status(400).json({ error: 'Token y tema requeridos' })
    }
    try {
        console.log('Suscribiendo token:', token, 'al tema:', topic)
        const response = await subscribeService(token, topic)
        console.log('Suscripción exitosa:', response)
        return res.status(200).json({ message: 'Suscripción exitosa', response })
    } catch (err) {
        console.error('Error al suscribir al tema:', err)
        return res.status(500).json({ error: 'Error al suscribir al tema', details: err })
    }
}

const sendMessageByTopic = async (req, res) => {
    console.log('Enviando mensaje a topic', req.body)
    const { topic, data } = req.body;
    console.log('payload', data)
    const payload = {
        topic,
        data
    }
    try {
        const response = await sendMessage(payload)
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