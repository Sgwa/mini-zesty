module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { reanimated: false }],
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
          alias: {
            '@env': './env',
            assets: './assets',
            components: './components',
            hooks: './hooks',
            store: './store',
            styles: './styles',
            templates: './templates',
            utils: './utils',
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
