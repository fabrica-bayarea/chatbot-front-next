function elapsedTime(date: string) {
  const timestamp = new Date(date).getTime();
  const diff = Date.now() - timestamp;
  const diffInSeconds = Math.trunc(diff / 1000);
  let timeString = 'Há ';

  if (diffInSeconds < 60) {
    timeString += 'menos de 1 minuto';
  } else if (diffInSeconds < 60 * 60) {
    const minutes = Math.trunc(diffInSeconds / 60);
    timeString += `${minutes}m`;
  } else if (diffInSeconds < 24 * 60 * 60) {
    const diffInMinutes = Math.trunc(diffInSeconds / 60);
    const hours = Math.trunc(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    timeString += `${hours}h`;
    if (minutes) timeString += ` ${minutes}m`;
  } else {
    const diffInHours = Math.trunc(diffInSeconds / (60 * 60));
    const days = Math.trunc(diffInHours / 24);
    const hours = diffInHours % 24;
    timeString += `${days}d`;
    if (hours) timeString += ` ${hours}h`;
  }

  return timeString;
}

export default elapsedTime;
