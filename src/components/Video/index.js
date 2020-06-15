import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TVEventHandler,
  BackHandler,
  TVMenuControl,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import VideoPlayer from 'react-native-video';
import get from 'lodash.get';
import ProgressBar from 'react-native-progress/Bar';

import Icon from '../Icon';
import { device } from '../../constants/metrics';
import secondsToTime from '../../utils/secondsToTime';

class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: false,
      progress: 0,
      duration: 0,
    };

    this.tvEventHandler = null;
    this.backButtonHandler = null;

    this.enableTvHandler = this.enableTvHandler.bind(this);
    this.disableTvHandler = this.disableTvHandler.bind(this);
    this.enableBackButton = this.enableBackButton.bind(this);
    this.disableBackButton = this.disableBackButton.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    this.enableTvHandler();
    this.enableBackButton();
  }

  componentWillUnmount() {
    this.disableTvHandler();
    this.disableBackButton();
  }

  enableTvHandler() {
    this.tvEventHandler = new TVEventHandler();
    this.tvEventHandler.enable(this, function(cmp, evt) {
      if (evt && evt.eventType === 'swipeRight') {
        console.log('moved right');
      } else if (evt && evt.eventType === 'swipeUp') {
        console.log('moved up');
      } else if (evt && evt.eventType === 'swipeLeft') {
        console.log('moved left');
      } else if (evt && evt.eventType === 'swipeDown') {
        console.log('moved down');
      } else if (evt && evt.eventType === 'playPause') {
        cmp.handlePlayPause();
      }
    });
  }

  disableTvHandler() {
    if (this.tvEventHandler) {
      this.tvEventHandler.disable();
      delete this.tvEventHandler;
    }
  }

  enableBackButton() {
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
  }

  disableBackButton() {
    if (this.backButtonEventHandler) {
      this.backButtonEventHandler.remove();
    }
  }

  handleProgress = progress => {
    this.setState({
      progress: progress.currentTime / this.state.duration,
    });
  };

  handleEnd = () => {
    this.setState({ paused: true });
  };

  handleLoad = meta => {
    this.setState({
      duration: meta.duration,
    });
  };

  handlePlayPause() {
    this.setState(state => {
      return {
        paused: !state.paused,
      };
    });
  }

  render() {
    const videoUri = get(this.props, 'route.params.videoUri', null);

    if (!videoUri) {
      return null;
    }

    const height = device.width * 0.5625;

    return (
      <View style={styles.container}>
        <View>
          <VideoPlayer
            paused={this.state.paused}
            source={{ uri: videoUri }}
            style={[styles.player, { height }]}
            onLoad={this.handleLoad}
            onProgress={this.handleProgress}
            onEnd={this.handleEnd}
            ref={ref => {
              this.player = ref;
            }}
            resizeMode={'contain'}
          />
          <View style={styles.controls}>
            <Icon
              name={!this.state.paused ? 'pause' : 'play'}
              size={30}
              color="#FFF"
            />
            <View style={styles.progressBar}>
              <ProgressBar
                progress={this.state.progress}
                color="#FFF"
                unfilledColor="rgba(255,255,255,.5)"
                borderColor="#FFF"
                width={device.width * 0.8}
                height={20}
              />
            </View>

            <Text style={styles.duration}>
              {secondsToTime(
                Math.floor(this.state.progress * this.state.duration),
              )}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

Video.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  player: {
    backgroundColor: '#000000',
    width: '100%',
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: 48,
    left: 0,
    bottom: 30,
    right: 0,
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  progressBar: {
    flex: 9,
    paddingHorizontal: 30,
  },
  mainButton: {
    marginRight: 15,
  },
  duration: {
    color: '#FFF',
    marginLeft: 15,
    fontSize: 40,
    fontWeight: 'bold',
    flex: 1,
  },
});

export default Video;
