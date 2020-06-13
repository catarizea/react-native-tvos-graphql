import get from 'lodash.get';

import deviceInfo from '../constants/deviceInfo';
const options = { headers: { uuid: deviceInfo.uuid } };

export const getSome = async path => {
  try {
    const resp = await fetch(path, options);
    const status = get(resp, 'status', null);
    if (status && `${status}`.indexOf(40) !== -1) {
      console.log(resp);
      return null;
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};