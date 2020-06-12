/* eslint no-console: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import CacheableImage from 'react-native-cacheable-image';
import deviceInfo from '../../constants/deviceInfo';
import theme from '../../theme';
import { OuterBox, InnerBox, PosterText } from './style';

const Poster = React.memo(
  ({
    item,
    first,
    last,
    tvParallaxProps,
    box: { innerWidth, innerHeight, outerWidth, outerHeight },
    navigator,
    navigateToRoute,
  }) => {
    const handlePress = () => {
      navigateToRoute.passProps = { item };
      navigator.push(navigateToRoute);
    };

    const firstMarginLeft = first ? 30 : 0;
    const lastMarginRight = last ? 30 : 0;
    const style = {
      width: innerWidth,
      height: innerHeight,
      shadowOffset: { width: 0, height: 6 },
      shadowColor: 'black',
      shadowOpacity: 0.3,
      shadowRadius: 3,
    };

    return (
      <OuterBox
        outerWidth={outerWidth}
        outerHeight={outerHeight}
        firstMarginLeft={firstMarginLeft}
        lastMarginRight={lastMarginRight}>
        <TouchableHighlight
          activeOpacity={1}
          tvParallaxProperties={tvParallaxProps}
          style={{
            width: innerWidth,
            height: innerHeight + 80,
          }}
          underlayColor={'transparent'}
          onPress={handlePress}>
          <InnerBox innerWidth={innerWidth} innerHeight={innerHeight + 80}>
            <CacheableImage
              source={{ uri: item.poster }}
              resizeMode={'cover'}
              style={style}
              bundleIdentifier={deviceInfo.bundleId}
            />
            <PosterText>{item.title}</PosterText>
          </InnerBox>
        </TouchableHighlight>
      </OuterBox>
    );
  },
);

Poster.propTypes = {
  item: PropTypes.object.isRequired,
  tvParallaxProps: PropTypes.object,
  navigator: PropTypes.object.isRequired,
  box: PropTypes.object,
  first: PropTypes.bool,
  last: PropTypes.bool,
  navigateToRoute: PropTypes.object.isRequired,
};

Poster.defaultProps = {
  tvParallaxProps: {
    enabled: true,
    shiftDistanceX: 1.7,
    shiftDistanceY: 1.7,
    tiltAngle: 0.01,
    magnification: 1.15,
  },
  box: theme.poster.box,
  first: false,
  last: false,
};

export default Poster;
