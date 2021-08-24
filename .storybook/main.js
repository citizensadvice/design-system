module.exports = {
  stories: ['../styleguide/**/*.stories.@(js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        controls: false,
        actions: false,
      },
    },
  ],
};
