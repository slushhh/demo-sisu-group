/**
 * Hook to format timestamp to user
 * friednly format
 */
const useDateTime = () => {
  const formatTimestamp = (timestamp: number | null) => {
    if (!timestamp) return ''

    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(new Date(timestamp))
  }

  return { formatTimestamp }
}

export { useDateTime }
