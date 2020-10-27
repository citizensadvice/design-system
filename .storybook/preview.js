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

const setLocaleFromUrl = (Story, context) => {
  const params = new URL(document.location).searchParams;

  const locale = params.get('locale');
  if (locale) {
    context.globals.locale = locale;
  }

  return Story();
};

export const decorators = [setLocaleFromUrl];
