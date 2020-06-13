import React, { useState, useContext, useEffect } from 'react';

import paths from '../../constants/apiPaths';
import { getSome } from '../../utils/apiRequests';
import { StoreContext } from '../../store/reducer/StoreProvider';
import { logIn } from '../../store/reducer/actions';
import ActivationScreen from './Activation';

const { ME, CODE } = paths;

const ActivationContainer = () => {
  const [activationCode, setActivationCode] = useState(false);
  const { dispatch } = useContext(StoreContext);

  useEffect(() => {
    let polling;

    const checkAuthenticated = async () => {
      let me = await getSome(ME);

      if (!me) {
        const code = await getSome(CODE);

        if (code) {
          setActivationCode(code);
        }

        polling = setInterval(async () => {
          me = await getSome(ME);
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
