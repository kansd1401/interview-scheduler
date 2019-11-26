import { configure, addParameters } from '@storybook/react'
import { themes } from '@storybook/theming';

function loadStories() {
  require("../stories");
}

// Option defaults.
addParameters({
  options: {
    theme: themes.dark,
  },
});

configure(loadStories, module);
