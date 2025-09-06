export const generateRandomPosition = (scale: number): { x: number; y: number } => {
  const centerX = (window.innerWidth / 2) * scale;
  const centerY = (window.innerHeight / 2) * scale;

  const offset = 80;
  const x = centerX + Math.floor(Math.random() * (offset * 2) - offset);
  const y = centerY + Math.floor(Math.random() * (offset * 2) - offset);

  return {
    x,
    y
  };
};

export const getFormattedDateAndTime = (): string => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const am_pm = hours >= 12 ? 'AM' : 'PM';
  hours = hours % 12 || 12;

  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 0-based month
  const day = now.getDate().toString().padStart(2, '0');
  const year = now.getFullYear();

  const createdDate = `${hours}.${minutes} ${am_pm} - ${month}/${day}/${year}`;
  return createdDate;
};
