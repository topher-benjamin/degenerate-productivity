import  {formatTime}  from './utils';

test('formatTime should return formatted time', () => {
  const timeLeft = 3600; // 1 hour in seconds
  const expectedTime = '01:00:00';
  expect(formatTime(timeLeft)).toBe(expectedTime);
});

test('formatTime should return formatted time with leading zeros', () => {
  const timeLeft = 65; // 1 minute and 5 seconds
  const expectedTime = '00:01:05';
  expect(formatTime(timeLeft)).toBe(expectedTime);
});

test('formatTime should return formatted time with zero hours', () => {
  const timeLeft = 300; // 5 minutes in seconds
  const expectedTime = '00:05:00';
  expect(formatTime(timeLeft)).toBe(expectedTime);
});