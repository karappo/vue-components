module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          'html-loader',
          'markdown-loader',
        ],
      },
      {
        test: /\.vue$/,
        loader: 'storybook-addon-vue-info/loader',
        enforce: 'post'
      }
    ]
  }
};
