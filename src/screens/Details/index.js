/* eslint react/jsx-closing-tag-location: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { injectIntl } from 'react-intl';
import CacheableImage from 'react-native-cacheable-image';
import moment from 'moment';
import truncate from 'lodash.truncate';
import deviceInfo from '../../constants/deviceInfo';
import { device } from '../../constants/metrics';
import PreloaderScreen from '../../components/PreloaderScreen';
import Button from '../../components/Button';
import {
  HorizontalContainer,
  ImageOuterContainer,
  ImageInnerContainer,
  TextOuterContainer,
  TextInnerContainer,
  Title,
  Plot,
  InfoLabel,
  InfoText,
  InfoLabelContainer,
} from './style';
import theme from '../../theme';
import messages from '../messages';
import useBackButton from '../../utils/useBackButton';

const Details = props => {
  const {
    intl: { formatMessage },
  } = props;
  const {
    route: {
      params: { item },
    },
    box,
    navigation,
    route,
  } = props;

  useBackButton(navigation, route);

  const scale = [6, 4];
  const ratio = scale[0] / (scale[0] + scale[1]);
  const innerRatio = 0.85;

  const handlePlay = () => {
    if (item && item.trailer) {
      navigation.navigate('Video', { videoUri: item.trailer });
    }
  };

  let content = <PreloaderScreen />;

  if (item) {
    const width = Math.floor(device.width * ratio * innerRatio);
    const height = Math.floor(device.height * innerRatio);

    const coverImage = (
      <ImageInnerContainer>
        <CacheableImage
          source={{ uri: item.cover }}
          resizeMode={'cover'}
          style={{
            width,
            height,
          }}
          bundleIdentifier={deviceInfo.bundleId}
        />
      </ImageInnerContainer>
    );

    let textContent;
    if (item) {
      textContent = (
        <TextInnerContainer height={Math.floor(device.height * innerRatio)}>
          <Title>{item.title}</Title>
          <Plot>
            {truncate(item.plot, {
              length: theme.details.truncateAt,
              separator: ' ',
            })}
          </Plot>
          <InfoLabelContainer style={styles.infoLabelContainer}>
            <InfoLabel>{formatMessage(messages.cast)}</InfoLabel>
          </InfoLabelContainer>
          <InfoLabelContainer>
            <Plot style={styles.plot}>
              {truncate(item.actors, {
                length: theme.details.truncateAt,
                separator: ' ',
              })}
            </Plot>
          </InfoLabelContainer>
          <InfoLabelContainer>
            <InfoLabel>{formatMessage(messages.released)}</InfoLabel>
            <InfoText>{moment(item.released).format('LL')}</InfoText>
          </InfoLabelContainer>
          <InfoLabelContainer>
            <InfoLabel>{formatMessage(messages.genre)}</InfoLabel>
            <InfoText>{item.genre}</InfoText>
          </InfoLabelContainer>
          <InfoLabelContainer>
            <InfoLabel>{formatMessage(messages.rated)}</InfoLabel>
            <InfoText>{item.rated}</InfoText>
            <InfoLabel style={styles.infoLabel}>
              {formatMessage(messages.runtime)}
            </InfoLabel>
            <InfoText>
              {formatMessage(messages.runtimeMins, {
                minutes: item.runtime,
              })}
            </InfoText>
          </InfoLabelContainer>
          <InfoLabelContainer style={styles.infoLabelContainerA}>
            <InfoLabel>{formatMessage(messages.country)}</InfoLabel>
            <InfoText>{item.country}</InfoText>
          </InfoLabelContainer>
          <Button
            item={{ title: formatMessage(messages.play) }}
            box={box}
            icon={{ name: 'play', size: 30, color: theme.category.h1 }}
            handlePress={() => handlePlay()}
            hasTVPreferredFocus
          />
        </TextInnerContainer>
      );
    }

    content = (
      <HorizontalContainer>
        <ImageOuterContainer
          flex={scale[0]}
          style={item ? { shadowOffset: { width: 0, height: 6 } } : {}}>
          {coverImage}
        </ImageOuterContainer>
        <TextOuterContainer flex={scale[1]}>{textContent}</TextOuterContainer>
      </HorizontalContainer>
    );
  }

  return content;
};

Details.propTypes = {
  intl: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  box: PropTypes.object,
  navigation: PropTypes.object.isRequired,
};

Details.defaultProps = {
  box: theme.details.box,
};

const styles = StyleSheet.create({
  infoLabelContainer: { marginTop: 20 },
  plot: { marginBottom: 20 },
  infoLabel: { marginLeft: 20 },
  infoLabelContainerA: { marginBottom: 20 },
});

export default injectIntl(Details);
