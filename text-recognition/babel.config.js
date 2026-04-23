// babel.config.js
// Nécessaire pour que babel-jest (utilisé par Jest sous le capot)
// sache transpiler le code React Native.
//
// metro-react-native-babel-preset est le successeur de babel-preset-react-native
// depuis RN 0.57. Il est livré avec react-native lui-même en 0.72.

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
};
