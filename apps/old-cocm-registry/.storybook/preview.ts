import type { Preview } from "@storybook/react";
import '../src/index.css'



const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;


export const globalTypes = {
  dataThemes: {
    defaultValue: {
      list: [
        { name: "Dark", dataTheme: "dark", color: "#000000" },
        { name: "Light", dataTheme: "light", color: "#ffffff" },
      ],
    },
  },
};
