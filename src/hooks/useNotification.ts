import { notificationApi, Notification } from '@/components/ui'

/** Hook for using notifications */
const useNotification = () => {
  const showNotification = (content: Notification) => {
    notificationApi.trigger(content)
  }

  return { showNotification }
}

export { useNotification }
