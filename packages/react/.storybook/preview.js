/** @type { import('@storybook/react').Preview } */

import '../src/lib/tailwind/theme.css'
import '@mantine/core/styles.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
