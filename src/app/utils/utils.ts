function convertToChatTime(timestamp: number|undefined) {
  if (!timestamp ) {
    return null
  }
    const createdAt = timestamp ? new Date(timestamp) : null;

    const formattedTime = createdAt
  ? `${String(createdAt.getHours()).padStart(2, '0')}:${String(createdAt.getMinutes()).padStart(2, '0')}`
  : null;

  return formattedTime;

}


export {
    convertToChatTime
}