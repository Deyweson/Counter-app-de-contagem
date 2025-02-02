const formatTime = (time: number) => {
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = time % 60;

  if (h <= 0 && m <= 0) {
    return `${s}s`;
  }
  else if (h <= 0) {
    return `${m}m ${s}s`;
  }
  return `${h}h ${m}m ${s}s`;
}

export default formatTime