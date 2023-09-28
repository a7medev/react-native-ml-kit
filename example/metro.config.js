const {getDefaultConfig} = require('expo/metro-config');
const {mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/** @type {import('metro-config').MetroConfig} */
const config = {
  watchFolders: [path.resolve(__dirname, '../')],
  resolver: {
    disableHierarchicalLookup: true,
    nodeModulesPaths: [path.resolve(__dirname, 'node_modules')],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
