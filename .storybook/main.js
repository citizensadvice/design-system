module.exports = {
  stories: ['../**/*.stories.@(js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        controls: false,
        actions: false,
      },
    },
    '@storybook/addon-a11y',
  ],
};
