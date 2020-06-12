import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video-controls';

const style = {
  backgroundColor: '#000000',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

const Video = ({ videoUri, navigator }) => (
  <VideoPlayer
    source={{ uri: videoUri }}
    resizeMode={'contain'}
    repeat={false}
    style={style}
    navigator={navigator}
    disableVolume
    disableBack
    onEnd={() => navigator.pop()}
  />
);

Video.propTypes = {
  videoUri: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
};

export default Video;
