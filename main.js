const getUrlParams = () => {
  const params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (_, key, value) => {
    params[key] = decodeURIComponent(value);
  });

  return params;
};

const params = getUrlParams();
document.getElementById('title').innerHTML =
  params?.title?.replaceAll('_', ' ') ?? '목표 달성일';

const endDate = new Date(params.date?.split('-'));
if (endDate) {
  document.getElementById('endDate').innerHTML = `${endDate.toLocaleDateString(
    'ko-KR'
  )} (${endDate.toLocaleDateString('en-US', { weekday: 'short' })})`;
}

let dday = setInterval(() => {
  const startDate = new Date();
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);

  const diff = endDate - startDate;

  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById('count').innerHTML = getDday(days);
}, 60);

const getDday = (days) => {
  if (days === 0) {
    return 'D-Day';
  } else if (days < 0) {
    return `D+${-1 * days}`;
  } else {
    return `D-${days}`;
  }
};
