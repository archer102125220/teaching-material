import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import isToday from 'dayjs/plugin/isToday.js';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-tw';

export default defineNuxtPlugin(() => {
  dayjs.extend(relativeTime);
  dayjs.extend(isBetween);
  dayjs.extend(isToday);
  dayjs.extend(timezone);
  dayjs.extend(utc);
  return {
    provide: {
      dayjs
    }
  };
});
