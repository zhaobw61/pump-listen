import moment from 'moment';
console.log(new Date());
const dateTime = moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss');
console.log(dateTime);
