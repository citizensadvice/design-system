export const parameters = {
  options: {
    layout: 'padded',
    isToolshown: true,
    showPanel: true,
    panelPosition: 'bottom',
    storySort: {
      method: 'alphabetical',
      order: [
        'Welcome',
        ['Getting started'],
        'Foundations',
        ['Grid'],
        'Components',
      ],
    },
  },
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'I18n locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', title: 'English' },
        { value: 'cy', right: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', title: 'Cymraeg' },
      ],
    },
  },
};

const withLocaleClassname = (Story, { globals }) => {
  return `<div class="cads-lang-${globals.locale || 'en'}">${Story()}</div>`;
};

export const decorators = [withLocaleClassname];
