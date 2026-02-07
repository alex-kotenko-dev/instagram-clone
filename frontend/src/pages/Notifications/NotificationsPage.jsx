import React from 'react'
import Notifications from '../../components/Notifications/Notifications'

const NotificationsPage = ({closePanel}) => {
  return (
    <div>
      <h2>Notifications</h2>
      <Notifications closePanel={closePanel}/>
    </div>
  )
}

export default NotificationsPage
