const colors = ['#f00', '#00f', '#0f0', '#ff0'];

export const randomColor = () => {
  const index = parseInt(Math.random() * 10) % colors.length;
  return colors[index];
};

export const generateColors = count => {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(randomColor());
  }
  return array;
};

export const getSequence = (base = []) => {
  return !base.length ? generateColors(4) : [...base, randomColor()];
};
