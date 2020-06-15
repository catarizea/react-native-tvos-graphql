import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TVEventHandler,
  BackHandler,
  TVMenuControl,
  View,
  Animated,
} from 'react-native';
import get from 'lodash.get';
import ProgressBar from 'react-native-progress/Bar';

import Icon from '../Icon';
import { device } from '../../constants/metrics';
import secondsToTime from '../../utils/secondsToTime';

import {
  Container,
  Player,
  Controls,
  ProgressBarContainer,
  Duration,
} from './styles';

const videoControlsPosition = {
  maxY: device.height + 40,
  minY: device.height - 100,
};

const springOptions = {
  speed: 100,
  bounciness: 7,
};

const seekStep = 10;

class Video extends Component {
  state = {
    paused: false,
    progress: 0,
    duration: 0,
    currentTime: 0,
    animation: new Animated.Value(videoControlsPosition.maxY),
  };

  tvEventHandler = null;
  backButtonHandler = null;
  toHideTimeout = null;

  componentDidMount() {
    this.enableTvHandler();
    this.enableBackButton();
  }

  componentWillUnmount() {
    this.disableTvHandler();
    this.disableBackButton();
  }

  enableTvHandler = () => {
    this.tvEventHandler = new TVEventHandler();
    this.tvEventHandler.enable(this, function(cmp, evt) {
      if (evt && evt.eventType === 'swipeRight') {
        cmp.handleMove('right');
      } else if (evt && evt.eventType === 'swipeUp') {
        cmp.handleSwipeUp();
      } else if (evt && evt.eventType === 'swipeLeft') {
        cmp.handleMove('left');
      } else if (evt && evt.eventType === 'swipeDown') {
        cmp.handleSwipeDown();
      } else if (
        evt &&
        (evt.eventType === 'playPause' || evt.eventType === 'select')
      ) {
        cmp.handlePlayPause();
      }
    });
  };

  disableTvHandler = () => {
    if (this.tvEventHandler) {
      this.tvEventHandler.disable();
      delete this.tvEventHandler;
    }
  };

  enableBackButton = () => {
    const { navigation } = this.props;

    TVMenuControl.enableTVMenuKey();

    const backButtonHandler = () => {
      navigation.goBack();
      TVMenuControl.disableTVMenuKey();
      return true;
    };

    this.backButtonEventHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backButtonHandler,
    );
  };

  disableBackButton = () => {
    if (this.backButtonEventHandler) {
      this.backButtonEventHandler.remove();
    }
  };

  handleProgress = progress => {
    this.setState({
      currentTime: progress.currentTime,
      progress: progress.currentTime / this.state.duration,
    });
  };

  handleEnd = () => {
    this.setState({ paused: true }, () => {
      this.player.seek(0);
    });
  };

  handleLoad = meta => {
    this.setState({
      duration: meta.duration,
    });
  };

  handlePlayPause = () => {
    this.setState({ paused: !this.state.paused }, () => {
      if (this.state.paused) {
        this.showControls();
      }

      if (!this.state.paused) {
        this.automatedHideControls();
      }
    });
  };

  showControls = () => {
    Animated.spring(this.state.animation, {
      toValue: videoControlsPosition.minY,
      ...springOptions,
    }).start();

    if (!this.state.paused) {
      this.automatedHideControls();
    }
  };

  hideControls = () => {
    Animated.spring(this.state.animation, {
      toValue: videoControlsPosition.maxY,
      ...springOptions,
    }).start();
  };

  handleSwipeUp = () => {
    this.showControls();
  };

  handleSwipeDown = () => {
    if (!this.state.paused) {
      this.hideControls();
    }
  };

  automatedHideControls = () => {
    if (this.toHideTimeout) {
      clearTimeout(this.toHideTimeout);
    }

    this.toHideTimeout = setTimeout(() => {
      this.hideControls();
      this.toHideTimeout = null;
    }, 6000);
  };

  handleMove = direction => {
    if (this.state.paused) {
      const sign = direction === 'left' ? -1 : 1;

      let seekTime = Math.max(
        Math.min(this.state.currentTime + sign * seekStep, this.state.duration),
        0,
      );

      this.player.seek(seekTime);
    }
  };

  handleSeek = ({ seekTime }) => {
    this.setState(
      {
        currentTime: seekTime,
        progress: seekTime / this.state.duration,
        paused: true,
      },
      () => {
        if (this.toHideTimeout) {
          clearTimeout(this.toHideTimeout);
          this.toHideTimeout = null;
        }
      },
    );
  };

  render() {
    const videoUri = get(this.props, 'route.params.videoUri', null);

    if (!videoUri) {
      return null;
    }

    const animationStyles = {
      transform: [{ translateY: this.state.animation }],
    };

    return (
      <Container>
        <View>
          <Player
            paused={this.state.paused}
            source={{ uri: videoUri }}
            onLoad={this.handleLoad}
            onProgress={this.handleProgress}
            onEnd={this.handleEnd}
            onSeek={this.handleSeek}
            ref={ref => {
              this.player = ref;
            }}
            resizeMode={'contain'}
          />
          <Controls style={animationStyles}>
            <Icon
              name={!this.state.paused ? 'pause' : 'play'}
              size={30}
              color="#FFF"
            />
            <ProgressBarContainer>
              <ProgressBar
                progress={this.state.progress}
                color="#FFF"
                unfilledColor="rgba(255,255,255,.3)"
                borderColor="#FFF"
                width={device.width * 0.84}
                height={20}
              />
            </ProgressBarContainer>

            <Duration>
              {secondsToTime(
                Math.floor(this.state.progress * this.state.duration),
              )}
            </Duration>
          </Controls>
        </View>
      </Container>
    );
  }
}

Video.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Video;
