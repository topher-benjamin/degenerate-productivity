export const formatTime = (timeLeft) => {
  let date = new Date(null);
  date.setSeconds(timeLeft);
  return  date.toISOString().substring(11, 19);
};
