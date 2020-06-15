import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video-controls';

import useBackButton from '../../utils/useBackButton';

const style = {
  backgroundColor: '#000000',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 1000,
};

const Video = ({
  route: {
    params: { videoUri },
  },
  navigation,
}) => {
  useBackButton(navigation);

  return (
    <VideoPlayer
      source={{ uri: videoUri }}
      resizeMode={'contain'}
      repeat={false}
      style={style}
      navigator={navigation}
      disableVolume
      disableBack
      onEnd={() => navigation.goBack()}
    />
  );
};

Video.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Video;
