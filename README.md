# React Starter

**Website:** https://najwer23.github.io/react-starter

## Prerequisites

This project uses [mise](https://mise.jdx.dev) to manage Node.js and Yarn versions (see `mise.toml`).

Install mise:

```sh
# macOS (Homebrew)
brew install mise
```

Enable mise in Zsh by adding this line to `~/.zshrc`:

```sh
eval "$(mise activate zsh)"
```

Reload your shell configuration:

```sh
source ~/.zshrc
```

## Getting Started

```sh
mise trust      # trust mise.toml (first time only)
mise install    # install Node.js and Yarn
mise setup      # install dependencies
```

Verify the setup:

```sh
mise current    # should list node and yarn
which yarn      # should point into ~/.local/share/mise/installs/...
mise doctor     # reports problems with the setup
```

## Development

```sh
mise start
```

## Production build

```sh
mise build
```

## Preview production build

```sh
mise preview
```

## Deploy to gh-pages

```sh
mise deploy
```

## Other tasks

| Task          | Description                             |
| ------------- | --------------------------------------- |
| `mise test`   | Run tests with Vitest                   |
| `mise bench`  | Run benchmarks                          |
| `mise format` | Format and lint with Biome              |
| `mise sort`   | Sort package.json keys                  |
| `mise god`    | Update dependencies, install, and start |
| `mise tasks`  | List all available tasks                |

## Yarn scripts

Once mise is activated, the same scripts are available through Yarn:

```sh
yarn install
yarn start
yarn test
yarn build
yarn preview
yarn deploy
```

## Updating

Update dependencies to the latest versions:

```sh
npx npm-check-updates -u && yarn install
ncu -u && yarn install
```

Update tool versions by editing `mise.toml`, then run `mise install`. To see the newest available Yarn version:

```sh
mise latest yarn
```

Update Yarn itself:

```sh
yarn set version latest
```

## Icons

[Icon Sizes](https://appiconmaker.co/Home/Index/1809c59a-947c-4ec8-8f3c-52dae76de012)

## Let's connect!

- **Portfolio:** https://najwer23.github.io
- **Résumé:** https://najwer23.github.io/resume
- **X:** https://twitter.com/najwer23
- **LinkedIn:** https://www.linkedin.com/in/najwer23
- **LeetCode:** https://leetcode.com/najwer23
- **NPM:** https://www.npmjs.com/~najwer23