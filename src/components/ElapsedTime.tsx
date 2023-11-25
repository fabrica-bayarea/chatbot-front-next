function ElapsedTime({ time }: { time: number }) {
  const timeDifference = Date.now() - time;
  const timeInSeconds = Math.trunc(timeDifference / 1000);

  let timeString = 'Há ';

  if (timeInSeconds < 60) {
    timeString += `${timeInSeconds}s`;
  } else if (timeInSeconds < 60 * 60) {
    const minutes = Math.trunc(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timeString += `${minutes}m`;
    if (seconds) timeString += ` ${seconds}s`;
  } else if (timeInSeconds < 24 * 60 * 60) {
    const timeInMinutes = Math.trunc(timeInSeconds / 60);
    const hours = Math.trunc(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    timeString += `${hours}h`;
    if (minutes) timeString += ` ${minutes}m`;
  } else {
    const timeInHours = Math.trunc(timeInSeconds / (60 * 60));
    const days = Math.trunc(timeInHours / 24);
    const hours = timeInHours % 24;
    timeString += `${days}d`;
    if (hours) timeString += ` ${hours}h`;
  }

  return <span>{timeString}</span>;
}

export default ElapsedTime;
