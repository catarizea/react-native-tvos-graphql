import { useEffect } from 'react';
import { BackHandler, TVMenuControl } from 'react-native';

const useBackButton = navigation => {
  useEffect(() => {
    TVMenuControl.enableTVMenuKey();

    const backButtonHandler = () => {
      navigation.goBack();
      TVMenuControl.disableTVMenuKey();
      return true;
    };

    const back = BackHandler.addEventListener(
      'hardwareBackPress',
      backButtonHandler,
    );

    return () => {
      back.remove();
    };
  }, [navigation]);
};

export default useBackButton;
