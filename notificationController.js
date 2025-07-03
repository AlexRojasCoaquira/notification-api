// import { notificationService } from './NotificationService'
const { notificationService } = require('./NotificationService.js')
const sendNotification = async (req, res) => {
  const { token, title, body, eventId, image, click_action } = req.body;
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
module.exports = { sendNotification };