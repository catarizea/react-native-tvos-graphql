import moment from 'moment';

export default time => moment.utc(time * 1000).format('mm:ss');
