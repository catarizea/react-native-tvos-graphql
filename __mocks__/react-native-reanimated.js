import { View } from 'react-native';

module.exports = {
  Value: jest.fn(),
  event: jest.fn(),
  add: jest.fn(),
  eq: jest.fn(),
  set: jest.fn(),
  cond: jest.fn(),
  interpolate: jest.fn(),
  View: View,
  Extrapolate: { CLAMP: jest.fn() },
};
