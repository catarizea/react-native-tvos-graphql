import DeviceInfo from 'react-native-device-info';

export default {
  uuid: DeviceInfo.getUniqueId(),
  model: DeviceInfo.getModel(),
  name: DeviceInfo.getDeviceName(),
  bundleId: DeviceInfo.getBundleId(),
  version: DeviceInfo.getVersion(),
  build: DeviceInfo.getBuildNumber(),
  systemName: DeviceInfo.getSystemName(),
  systemVersion: DeviceInfo.getSystemVersion(),
  isEmulator: DeviceInfo.isEmulator(),
};
