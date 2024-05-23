export const convertDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const formatDate =
    year + '/' + month + '/' + day + ' ' + hours + ':' + minutes;
  return formatDate;
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
