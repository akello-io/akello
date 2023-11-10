<div style="margin: 0 auto; text-align: center; padding-bottom: 20px;">
  <img src="https://raw.githubusercontent.com/storybookjs/addon-styling-webpack/3b88daa822e57b7e691cd0b77d70ac5582410f8a/.github/media/styling.svg" alt="addon-styling-webpack Logo" width="150" height="150" align="center">
</div>

# `@storybook/addon-styling-webpack`

Get started in Storybook 7 faster with popular styling tools.

## ✨ Features

- 🤖 Zero-config for popular tools through codemods.
- 🧩 Configuration templates for popular tools
- ⚡️ Options for CSS modules, PostCSS, Sass, Less, and Vanilla-extract

## 🏁 Getting Started

To get started, **install the package** using the Storybook CLI

pnpm:

```zsh
pnpm dlx storybook@latest add @storybook/addon-styling-webpack
```

yarn:

```zsh
yarn dlx storybook@latest add @storybook/addon-styling-webpack
```

npm:

```zsh
npx storybook@latest add @storybook/addon-styling-webpack
```

## 🤝 Contributing

If you'd like to contribute to this addon, **THANK YOU**, I'd love your help 🙏

### 📝 Development scripts

- `pnpm build` build and package your addon code

### 🌲 Branch structure

- **next** - the `next` version on npm, and the development branch where most work occurs
- **main** - the `latest` version on npm and the stable version that most users use

### 🚀 Release process

1. All PRs should target the `next` branch, which depends on the `next` version of Storybook.
2. When merged, a new version of this package will be released on the `next` NPM tag.
3. If the change contains a bugfix that needs to be patched back to the stable version, please note that in PR description.
4. PRs labeled `pick` will get cherry-picked back to the `main` branch and will generate a release on the `latest` npm tag.
