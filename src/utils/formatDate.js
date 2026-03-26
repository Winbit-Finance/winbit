const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const formatDate = (dateString, opts = { time: true }) => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return '';
  }

  const time = opts?.time !== false;
  const hourSuffix = Boolean(opts?.hourSuffix);

  const formatterOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    ...(time
      ? {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }
      : {}),
    ...(opts?.timeZone ? { timeZone: opts.timeZone } : {}),
  };

  const formatter = new Intl.DateTimeFormat('en-US', formatterOptions);

  const parts = {};
  for (const { type, value } of formatter.formatToParts(date)) {
    parts[type] = value;
  }

  const day = parts.day;
  const month = MONTHS_SHORT[parseInt(parts.month, 10) - 1];
  const year = parts.year;

  if (!time) {
    return `${day} ${month} ${year}`;
  }

  const hour = parts.hour;
  const minute = parts.minute;

  return `${day} ${month} ${year} - ${hour}:${minute}${hourSuffix ? ' h' : ''}`;
};
