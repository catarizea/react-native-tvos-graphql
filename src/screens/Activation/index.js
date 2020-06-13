import React, { useState, useContext, useEffect } from 'react';

import paths from '../../constants/apiPaths';
import deviceInfo from '../../constants/deviceInfo';
import { StoreContext } from '../../store/reducer/StoreProvider';
import { logIn } from '../../store/reducer/actions';
import ActivationScreen from './Activation';

const options = { headers: { uuid: deviceInfo.uuid } };
const { ME, CODE } = paths;

const fetchMe = async () => {
  try {
    const resp = await fetch(ME, options);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const fetchCode = async () => {
  try {
    const resp = await fetch(CODE, options);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const ActivationContainer = () => {
  const [activationCode, setActivationCode] = useState(false);
  const { dispatch } = useContext(StoreContext);

  useEffect(() => {
    let polling;

    const checkAuthenticated = async () => {
      let me = await fetchMe();

      if (!me) {
        const code = await fetchCode();

        if (code) {
          setActivationCode(code);
        }

        polling = setInterval(async () => {
          me = await fetchMe();
          if (me) {
            logIn(dispatch);
          }
        }, 3000);
      } else {
        logIn(dispatch);
      }
    };

    checkAuthenticated();

    return () => {
      clearInterval(polling);
    };
  }, [dispatch]);

  return <ActivationScreen activationCode={activationCode} />;
};

export default ActivationContainer;
