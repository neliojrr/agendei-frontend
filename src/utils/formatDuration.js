const formatDuration = (value) => {
  const hours = parseInt(value / 3600);
  const min = (value - (hours * 3600)) / 60;
  if (hours > 0) {
    if (min > 0) {
      return `${hours}h ${min}min`;
    }
    return `${hours}h`;
  }
  return `${min}min`;
};

export default formatDuration;
