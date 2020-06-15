import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video';

import { device } from '../../constants/metrics';
import useBackButton from '../../utils/useBackButton';

const style = {
  backgroundColor: '#000000',
  width: device.width,
  height: device.height,
};

const Video = ({
  route: {
    params: { videoUri },
  },
  navigation,
  route,
}) => {
  useBackButton(navigation, route);

  return <VideoPlayer source={{ uri: videoUri }} style={style} />;
};

Video.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Video;
