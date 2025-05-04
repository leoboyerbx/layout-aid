# Vite Plugin Layout Aid

A versatile Vite/Nuxt plugin that adds visual layout aid for integrating web pages.

> During build, this module will be an empty string, making it dev-only.
## Compatibility

- **Vite** via [`vite-plugin-layoutaid`](./packages/vite)
- **Nuxt** via [`@layoutaid/nuxt`](./packages/nuxt)

## Features

- Every *layoutaid* is togglable with a hotkey.
- An option to enable the plugin in prod is available.
- Available *layoutaids*:

### Outline

Shows an outline around each element. Enable/disable with hotkey: `ctrl` + `o`

![Outline demo](./.github/assets/outline.png)

### Columns

Shows column guides. Enable/disable with hotkey: `ctrl` + `g`

![Columns demo](./.github/assets/columns.png)

# Development

The code is structured in monorepo.

We use [pnpm changesets](https://pnpm.io/fr/using-changesets) to release versions.

## Create a new release:

- Init the changeset with `pnpm changeset`. Follow the prompts.
- If needed, add details to the release in the generated md file.
- Update the versions with `pnpm changeset version`
- Run `pnpm install` to rebuild the lockfile.
- Run `pnpm run release` to run the custom release script (only UNIX systems for now)

