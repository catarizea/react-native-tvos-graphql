module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv',
  ],
  plugins: [
    [
      'react-intl',
      {
        messagesDir: '/Users/catalinrizea/Sites/react-native-tvos-graphql/scripts/../src/i18n/translation/',
        extractSourceLocation: true,
      },
    ],
  ],
};
