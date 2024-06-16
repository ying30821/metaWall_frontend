export const convertDate = (date) => {
  if (!date) return '';

  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  let hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  const period = hours >= 12 ? '下午' : '上午';
  hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${year}/${month}/${day} ${period} ${formattedHours}:${formattedMinutes}`;
};

export const humanizeTime = (time) => {
  const now = new Date();
  const diff = Math.floor((now - new Date(time)) / 1000);
  const units = [
    { label: ' 年', seconds: 31536000 },
    { label: ' 月', seconds: 2592000 },
    { label: ' 天', seconds: 86400 },
    { label: ' 小時', seconds: 3600 },
    { label: ' 分鐘', seconds: 60 },
    { label: ' 秒', seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diff / unit.seconds);
    if (interval >= 1) {
      return interval + unit.label + '前';
    }
  }
  return '剛剛';
};

export const toCurrency = (num) => {
  if (!Number.isInteger(num)) return 0;
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
