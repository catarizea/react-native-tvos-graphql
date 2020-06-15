import styled from 'styled-components/native';
import VideoPlayer from 'react-native-video';
import { Animated } from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const Player = styled(VideoPlayer)`
  background-color: #000000;
  width: 100%;
  height: 100%;
`;

export const Controls = styled(Animated.View)`
  background-color: rgba(0, 0, 0, 0.5);
  height: 60;
  left: 0;
  right: 0;
  flex: 1;
  position: absolute;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-left: 50;
`;

export const ProgressBarContainer = styled.View`
  flex: 9;
  padding-left: 30;
  padding-right: 30;
`;

export const Duration = styled.Text`
  color: #ffffff;
  font-size: 35;
  font-weight: bold;
  flex: 1;
  text-align: center;
`;
