export function ms(timeStr: string): number {
  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = millisecondsPerSecond * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;

  const timeParts = timeStr.split(':');
  const hours = parseInt(timeParts[0], 10) || 0;
  const minutes = parseInt(timeParts[1], 10) || 0;
  const seconds = parseInt(timeParts[2], 10) || 0;

  return hours * millisecondsPerHour + minutes * millisecondsPerMinute + seconds * millisecondsPerSecond;
}
